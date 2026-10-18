import { useMemo } from "react";
import DOMPurify from "dompurify";

const PURIFY_CONFIG = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ["target", "rel"],
  ALLOWED_URI_REGEXP:
    /^(?:(?:https?|mailto|tel):|data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,|\/|#)/i,
};

export default function RichTextContent({ content }) {
  const html = useMemo(() => {
    if (!content) return "";
    // Legacy markdown seed posts: render as plain paragraphs if no HTML tags
    if (!/<[a-z][\s\S]*>/i.test(content)) {
      const escaped = content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return DOMPurify.sanitize(
        escaped
          .split(/\n{2,}/)
          .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
          .join(""),
        PURIFY_CONFIG,
      );
    }
    return DOMPurify.sanitize(content, PURIFY_CONFIG);
  }, [content]);

  return (
    <div
      className="blog-richtext"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
