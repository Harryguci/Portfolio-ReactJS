using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<BlogComment> BlogComments => Set<BlogComment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.Property(x => x.Slug).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Title).HasMaxLength(300).IsRequired();
            entity.Property(x => x.Excerpt).HasMaxLength(1000);
            entity.Property(x => x.CoverImageUrl).HasMaxLength(1000);
            entity.Property(x => x.Tags).HasMaxLength(500);
            entity.Property(x => x.Content).IsRequired();
            entity.HasMany(x => x.Comments)
                .WithOne(x => x.BlogPost)
                .HasForeignKey(x => x.BlogPostId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<BlogComment>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.BlogPostId);
            entity.Property(x => x.AuthorName).HasMaxLength(100).IsRequired();
            entity.Property(x => x.Body).HasMaxLength(2000).IsRequired();
        });
    }
}
