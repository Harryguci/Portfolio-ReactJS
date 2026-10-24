using Portfolio.Api.Models;

namespace Portfolio.Api.Dtos;

public record BlogCommentDto(
    Guid Id,
    string AuthorName,
    string Body,
    DateTime CreatedAt
);

public record CreateBlogCommentRequest(
    string AuthorName,
    string Body
);

public static class CommentMapping
{
    public static BlogCommentDto ToDto(BlogComment comment) => new(
        comment.Id,
        comment.AuthorName,
        comment.Body,
        comment.CreatedAt
    );
}
