import { useMemo } from "react";
import DOMPurify from "dompurify";
import Markdown from "react-markdown";

const PURIFY_CONFIG = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ["target", "rel"],
  ALLOWED_URI_REGEXP:
    /^(?:(?:https?|mailto|tel):|data:image\/(?:png|jpe?g|gif|webp|svg\+xml);base64,|\/|#)/i,
};

const HAS_HTML_TAG = /<[a-z][\s\S]*>/i;

export default function RichTextContent({ content }) {
  const isHtml = useMemo(
    () => Boolean(content) && HAS_HTML_TAG.test(content),
    [content],
  );

  const sanitizedHtml = useMemo(() => {
    if (!content || !isHtml) return "";
    return DOMPurify.sanitize(content, PURIFY_CONFIG);
  }, [content, isHtml]);

  if (!content) return null;

  // TipTap / CMS posts store HTML
  if (isHtml) {
    return (
      <div
        className="blog-richtext"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  }

  // Legacy seed posts and plain markdown
  return (
    <div className="blog-richtext blog-markdown">
      <Markdown>{content}</Markdown>
    </div>
  );
}
