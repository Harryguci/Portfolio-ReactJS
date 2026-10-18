using Portfolio.Api.Models;

namespace Portfolio.Api.Dtos;

public record BlogListItemDto(
    Guid Id,
    string Slug,
    string Title,
    string? Excerpt,
    string? CoverImageUrl,
    string? Tags,
    string Status,
    DateTime? PublishedAt,
    DateTime UpdatedAt
);

public record BlogDetailDto(
    Guid Id,
    string Slug,
    string Title,
    string? Excerpt,
    string Content,
    string? CoverImageUrl,
    string? Tags,
    string Status,
    DateTime? PublishedAt,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public record CreateBlogRequest(
    string Title,
    string? Slug,
    string? Excerpt,
    string Content,
    string? CoverImageUrl,
    string? Tags,
    string Status
);

public record UpdateBlogRequest(
    string Title,
    string? Slug,
    string? Excerpt,
    string Content,
    string? CoverImageUrl,
    string? Tags,
    string Status
);

public record LoginRequest(string Username, string Password);

public record LoginResponse(string Token, DateTime ExpiresAt);

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);

public static class BlogMapping
{
    public static BlogListItemDto ToListItem(BlogPost post) => new(
        post.Id,
        post.Slug,
        post.Title,
        post.Excerpt,
        post.CoverImageUrl,
        post.Tags,
        post.Status.ToString(),
        post.PublishedAt,
        post.UpdatedAt
    );

    public static BlogDetailDto ToDetail(BlogPost post) => new(
        post.Id,
        post.Slug,
        post.Title,
        post.Excerpt,
        post.Content,
        post.CoverImageUrl,
        post.Tags,
        post.Status.ToString(),
        post.PublishedAt,
        post.CreatedAt,
        post.UpdatedAt
    );
}
