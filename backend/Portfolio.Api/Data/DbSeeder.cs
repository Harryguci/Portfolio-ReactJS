using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext db, string? connectionString)
    {
        EnsureDataDirectory(connectionString);
        await db.Database.EnsureCreatedAsync();
        // EnsureCreated does not add new tables to an existing DB
        await EnsureBlogCommentsTableAsync(db);

        if (await db.BlogPosts.AnyAsync())
        {
            return;
        }

        var now = DateTime.UtcNow;
        db.BlogPosts.Add(new BlogPost
        {
            Slug = "welcome-to-my-blog",
            Title = "Welcome to my blog",
            Excerpt = "First post on the portfolio — notes on building with React, .NET, and Docker.",
            Content = """
            <h2>Welcome</h2>
            <p>This is the first post on my portfolio blog.</p>
            <h3>Stack</h3>
            <ul>
              <li>React + Vite frontend</li>
              <li>ASP.NET Core API</li>
              <li>SQLite for content storage</li>
              <li>Docker on an Ubuntu VPS</li>
            </ul>
            <p>Thanks for reading — more posts coming soon.</p>
            """,
            Tags = "portfolio,dotnet,react",
            Status = BlogPostStatus.Published,
            PublishedAt = now,
            CreatedAt = now,
            UpdatedAt = now
        });

        await db.SaveChangesAsync();
    }

    private static async Task EnsureBlogCommentsTableAsync(AppDbContext db)
    {
        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "BlogComments" (
                "Id" TEXT NOT NULL CONSTRAINT "PK_BlogComments" PRIMARY KEY,
                "BlogPostId" TEXT NOT NULL,
                "AuthorName" TEXT NOT NULL,
                "Body" TEXT NOT NULL,
                "CreatedAt" TEXT NOT NULL,
                CONSTRAINT "FK_BlogComments_BlogPosts_BlogPostId"
                    FOREIGN KEY ("BlogPostId") REFERENCES "BlogPosts" ("Id") ON DELETE CASCADE
            );
            """);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE INDEX IF NOT EXISTS "IX_BlogComments_BlogPostId"
                ON "BlogComments" ("BlogPostId");
            """);
    }

    private static void EnsureDataDirectory(string? connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString)) return;

        const string marker = "Data Source=";
        var index = connectionString.IndexOf(marker, StringComparison.OrdinalIgnoreCase);
        if (index < 0) return;

        var path = connectionString[(index + marker.Length)..].Trim().Trim('"');
        var directory = Path.GetDirectoryName(path);
        if (!string.IsNullOrWhiteSpace(directory))
        {
            Directory.CreateDirectory(directory);
        }
    }
}
