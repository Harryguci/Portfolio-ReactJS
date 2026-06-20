import { useState } from "react";
import Row from "react-bootstrap/Row";
import ReactMarkdown from "react-markdown";

export function truncateMarkdown(text, maxLength) {
  if (text.length <= maxLength) return text;

  let truncateAt = maxLength;
  const lastNewline = text.lastIndexOf("\n", maxLength);
  const lastSpace = text.lastIndexOf(" ", maxLength);

  if (lastNewline > maxLength * 0.7) {
    truncateAt = lastNewline;
  } else if (lastSpace > maxLength * 0.7) {
    truncateAt = lastSpace;
  }

  let truncated = text.substring(0, truncateAt).trim();

  truncated = truncated.replace(/\*\*[^*]*$/, "");
  truncated = truncated.replace(/\*[^*\s]*$/, "");
  truncated = truncated.replace(/`[^`]*$/, "");
  truncated = truncated.replace(/\[[^\]]*$/, "");

  if (truncated.length < maxLength * 0.5) {
    truncated = text.substring(0, truncateAt).trim();
  }

  return truncated + "...";
}

export default function ProjectDetailContent({
  title,
  h2,
  content,
  buttons = [],
  compact = false,
  showTitle = true,
  truncateAt = 250,
}) {
  const [isShowAll, setShowAll] = useState(false);

  const contentStyle = {
    lineHeight: compact ? "1.6rem" : "2rem",
    letterSpacing: "1px",
  };

  const markdownStyle = {
    ...contentStyle,
    color: "inherit",
  };

  const shouldTruncate = !compact && content.length > truncateAt;
  const displayContent =
    shouldTruncate && !isShowAll
      ? truncateMarkdown(content, truncateAt)
      : content;

  const normalizedButtons = buttons.map((button) => ({
    name: button.name,
    type: button.type,
    attr: button.attr,
    href: button.href,
    disabled: button.disabled,
  }));

  return (
    <div className="project-detail-content">
      {showTitle && title && <h2 className="title-thin fs-1">{title}</h2>}
      {showTitle && h2 && <h2 className="title-bold fs-1 mb-3">{h2}</h2>}

      <div style={markdownStyle} className="project-content-markdown">
        <ReactMarkdown>{displayContent}</ReactMarkdown>
        {shouldTruncate && (
          <button
            className="d-inline markdown-toggle-btn"
            style={{
              background: "none",
              color: "blue",
              border: "none",
              cursor: "pointer",
              padding: "0 4px",
              textDecoration: "underline",
            }}
            onClick={() => setShowAll(!isShowAll)}
          >
            {isShowAll ? "hide" : "show more"}
          </button>
        )}
      </div>

      {normalizedButtons.length > 0 && (
        <Row
          style={{
            gap: "1rem",
            marginLeft: "5px",
            rowGap: "1rem",
          }}
        >
          {normalizedButtons.map((btn, index) => {
            if (btn.type === "button") {
              return (
                <button
                  key={index + 1}
                  className={
                    "btn-custom d-block" + (btn.disabled ? " btn-disabled" : "")
                  }
                  style={{ width: "fit-content" }}
                  rel="noreferrer"
                  disabled={btn.disabled}
                  {...(btn.attr ?? [])}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: btn.name }}
                  ></span>
                </button>
              );
            }
            return (
              <a
                key={index + 1}
                className="btn-custom d-block"
                style={{ width: "fit-content" }}
                target="_blank"
                href={btn.href}
                rel="noreferrer"
              >
                <span dangerouslySetInnerHTML={{ __html: btn.name }}></span>
              </a>
            );
          })}
        </Row>
      )}
    </div>
  );
}
