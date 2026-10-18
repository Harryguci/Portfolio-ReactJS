using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Portfolio.Api.Data;
using Portfolio.Api.Dtos;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Allow rich-text posts with compressed inline images (base64)
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 25 * 1024 * 1024;
});

var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? "Data Source=portfolio.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});

builder.Services.AddSingleton<TokenService>();

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? "dev-only-change-me-portfolio-jwt-key-32chars!";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "portfolio-api";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "portfolio-cms";

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
        policy.WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:4173",
                "http://127.0.0.1:4173")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddOpenApi();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbSeeder.SeedAsync(db, connectionString);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("DevCors");
}

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapPost("/api/auth/login", (LoginRequest request, IConfiguration config, TokenService tokens) =>
{
    var username = config["Admin:Username"] ?? "admin";
    var password = config["Admin:Password"] ?? "changeme";

    if (!string.Equals(request.Username, username, StringComparison.Ordinal)
        || !string.Equals(request.Password, password, StringComparison.Ordinal))
    {
        return Results.Unauthorized();
    }

    var (token, expiresAt) = tokens.CreateToken(username);
    return Results.Ok(new LoginResponse(token, expiresAt));
});

app.MapGet("/api/blogs", async (
    AppDbContext db,
    string? q,
    int page = 1,
    int pageSize = 10) =>
{
    page = Math.Max(page, 1);
    pageSize = Math.Clamp(pageSize, 1, 50);

    var query = db.BlogPosts
        .AsNoTracking()
        .Where(p => p.Status == BlogPostStatus.Published);

    if (!string.IsNullOrWhiteSpace(q))
    {
        var term = q.Trim().ToLowerInvariant();
        query = query.Where(p =>
            p.Title.ToLower().Contains(term)
            || (p.Excerpt != null && p.Excerpt.ToLower().Contains(term))
            || (p.Tags != null && p.Tags.ToLower().Contains(term)));
    }

    var total = await query.CountAsync();
    var posts = await query
        .OrderByDescending(p => p.PublishedAt ?? p.CreatedAt)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    var items = posts.Select(BlogMapping.ToListItem).ToList();

    return Results.Ok(new PagedResult<BlogListItemDto>(items, total, page, pageSize));
});

app.MapGet("/api/blogs/{slug}", async (string slug, AppDbContext db) =>
{
    var post = await db.BlogPosts
        .AsNoTracking()
        .FirstOrDefaultAsync(p =>
            p.Slug == slug && p.Status == BlogPostStatus.Published);

    return post is null
        ? Results.NotFound()
        : Results.Ok(BlogMapping.ToDetail(post));
});

var cms = app.MapGroup("/api/cms/blogs").RequireAuthorization();

cms.MapGet("", async (
    AppDbContext db,
    string? q,
    string? status,
    int page = 1,
    int pageSize = 20) =>
{
    page = Math.Max(page, 1);
    pageSize = Math.Clamp(pageSize, 1, 100);

    var query = db.BlogPosts.AsNoTracking().AsQueryable();

    if (!string.IsNullOrWhiteSpace(status)
        && Enum.TryParse<BlogPostStatus>(status, true, out var parsedStatus))
    {
        query = query.Where(p => p.Status == parsedStatus);
    }

    if (!string.IsNullOrWhiteSpace(q))
    {
        var term = q.Trim().ToLowerInvariant();
        query = query.Where(p =>
            p.Title.ToLower().Contains(term)
            || p.Slug.ToLower().Contains(term));
    }

    var total = await query.CountAsync();
    var posts = await query
        .OrderByDescending(p => p.UpdatedAt)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
    var items = posts.Select(BlogMapping.ToListItem).ToList();

    return Results.Ok(new PagedResult<BlogListItemDto>(items, total, page, pageSize));
});

cms.MapGet("/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var post = await db.BlogPosts.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
    return post is null ? Results.NotFound() : Results.Ok(BlogMapping.ToDetail(post));
});

cms.MapPost("", async (CreateBlogRequest request, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Content))
    {
        return Results.BadRequest(new { message = "Title and content are required." });
    }

    if (!Enum.TryParse<BlogPostStatus>(request.Status, true, out var status))
    {
        status = BlogPostStatus.Draft;
    }

    var slugBase = string.IsNullOrWhiteSpace(request.Slug)
        ? SlugHelper.Generate(request.Title)
        : SoftSlug(request.Slug);

    var slug = await EnsureUniqueSlugAsync(db, slugBase);
    var now = DateTime.UtcNow;

    var post = new BlogPost
    {
        Title = request.Title.Trim(),
        Slug = slug,
        Excerpt = NormalizeOptional(request.Excerpt),
        Content = request.Content,
        CoverImageUrl = NormalizeOptional(request.CoverImageUrl),
        Tags = NormalizeOptional(request.Tags),
        Status = status,
        PublishedAt = status == BlogPostStatus.Published ? now : null,
        CreatedAt = now,
        UpdatedAt = now
    };

    db.BlogPosts.Add(post);
    await db.SaveChangesAsync();

    return Results.Created($"/api/cms/blogs/{post.Id}", BlogMapping.ToDetail(post));
});

cms.MapPut("/{id:guid}", async (Guid id, UpdateBlogRequest request, AppDbContext db) =>
{
    var post = await db.BlogPosts.FirstOrDefaultAsync(p => p.Id == id);
    if (post is null)
    {
        return Results.NotFound();
    }

    if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.Content))
    {
        return Results.BadRequest(new { message = "Title and content are required." });
    }

    if (!Enum.TryParse<BlogPostStatus>(request.Status, true, out var status))
    {
        status = post.Status;
    }

    var slugBase = string.IsNullOrWhiteSpace(request.Slug)
        ? SlugHelper.Generate(request.Title)
        : SoftSlug(request.Slug);

    if (!string.Equals(post.Slug, slugBase, StringComparison.OrdinalIgnoreCase))
    {
        post.Slug = await EnsureUniqueSlugAsync(db, slugBase, post.Id);
    }

    var wasPublished = post.Status == BlogPostStatus.Published;
    post.Title = request.Title.Trim();
    post.Excerpt = NormalizeOptional(request.Excerpt);
    post.Content = request.Content;
    post.CoverImageUrl = NormalizeOptional(request.CoverImageUrl);
    post.Tags = NormalizeOptional(request.Tags);
    post.Status = status;
    post.UpdatedAt = DateTime.UtcNow;

    if (status == BlogPostStatus.Published && !wasPublished)
    {
        post.PublishedAt = DateTime.UtcNow;
    }
    else if (status == BlogPostStatus.Draft)
    {
        // keep PublishedAt history for drafts that were previously published
    }

    await db.SaveChangesAsync();
    return Results.Ok(BlogMapping.ToDetail(post));
});

cms.MapDelete("/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var post = await db.BlogPosts.FirstOrDefaultAsync(p => p.Id == id);
    if (post is null)
    {
        return Results.NotFound();
    }

    db.BlogPosts.Remove(post);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

static string SoftSlug(string input) => SlugHelper.Generate(input);

static string? NormalizeOptional(string? value) =>
    string.IsNullOrWhiteSpace(value) ? null : value.Trim();

static async Task<string> EnsureUniqueSlugAsync(
    AppDbContext db,
    string baseSlug,
    Guid? excludeId = null)
{
    var slug = baseSlug;
    var suffix = 2;

    while (await db.BlogPosts.AnyAsync(p =>
               p.Slug == slug && (!excludeId.HasValue || p.Id != excludeId.Value)))
    {
        slug = $"{baseSlug}-{suffix}";
        suffix++;
    }

    return slug;
}

public partial class Program;
