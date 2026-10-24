namespace Portfolio.Api.Models;

public class BlogComment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BlogPostId { get; set; }
    public BlogPost BlogPost { get; set; } = null!;
    public string AuthorName { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
