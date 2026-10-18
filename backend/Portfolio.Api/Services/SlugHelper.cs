using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace Portfolio.Api.Services;

public static partial class SlugHelper
{
    public static string Generate(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return $"post-{Guid.NewGuid():N}"[..16];
        }

        var normalized = title.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(normalized.Length);

        foreach (var ch in normalized)
        {
            var category = CharUnicodeInfo.GetUnicodeCategory(ch);
            if (category == UnicodeCategory.NonSpacingMark)
            {
                continue;
            }

            sb.Append(char.ToLowerInvariant(ch));
        }

        var slug = NonSlugChars().Replace(sb.ToString().Normalize(NormalizationForm.FormC), "-");
        slug = MultiDash().Replace(slug, "-").Trim('-');

        return string.IsNullOrWhiteSpace(slug) ? $"post-{Guid.NewGuid():N}"[..16] : slug;
    }

    [GeneratedRegex(@"[^a-z0-9\s-]")]
    private static partial Regex NonSlugChars();

    [GeneratedRegex(@"[\s-]+")]
    private static partial Regex MultiDash();
}
