import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactMarkdown from "react-markdown";
import Thumbnail from "./Thumbnail";
import "../Assets/Styles/SCSS/_base.scss";
import "../Assets/Styles/SCSS/ProjectSection.scss";

export default function ProjectSection(props) {
  const title = props.title;
  const h2 = props.h2;
  const id = props.id;
  const content = props.content;
  const type = props.type ? props.type.toString() : "right";
  const className = props.className + " project-section";
  const imgUrl = props.imgUrl;

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  let buttons = [];
  if (props.buttons) {
    buttons = props.buttons.map((button) => {
      return {
        name: button.name,
        type: button.type,
        attr: button.attr,
        href: button.href,
        disabled: button.disabled,
      };
    });
  }

  const rowStyle = {
    gap: 7 + "%",
    rowGap: 3 + "rem",
    flexDirection: type === "right" ? "row-reverse" : "row",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [isShowAll, setShowAll] = useState(false);
  
  // Helper function to truncate markdown content intelligently
  const truncateMarkdown = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    
    // Find the last space or newline before maxLength to avoid breaking words
    let truncateAt = maxLength;
    const lastNewline = text.lastIndexOf('\n', maxLength);
    const lastSpace = text.lastIndexOf(' ', maxLength);
    
    // Prefer breaking at newline, then space (at least 70% of maxLength to avoid too short truncation)
    if (lastNewline > maxLength * 0.7) {
      truncateAt = lastNewline;
    } else if (lastSpace > maxLength * 0.7) {
      truncateAt = lastSpace;
    }
    
    let truncated = text.substring(0, truncateAt).trim();
    
    // Try to clean up incomplete markdown syntax at the end
    // Remove trailing incomplete markdown patterns
    truncated = truncated.replace(/\*\*[^*]*$/, '');  // Incomplete bold **
    truncated = truncated.replace(/\*[^*\s]*$/, '');   // Incomplete italic * (but keep if followed by space)
    truncated = truncated.replace(/`[^`]*$/, '');       // Incomplete code `
    truncated = truncated.replace(/\[[^\]]*$/, '');     // Incomplete link [
    
    // Ensure we still have reasonable length after cleanup
    if (truncated.length < maxLength * 0.5) {
      // If cleanup removed too much, use original truncation
      truncated = text.substring(0, truncateAt).trim();
    }
    
    return truncated + "...";
  };

  const contentStyle = {
    lineHeight: "2rem",
    letterSpacing: "1px",
  };

  const markdownStyle = {
    ...contentStyle,
    color: "inherit",
  };

  let contentElem;
  const shouldTruncate = content.length > 250;

  if (shouldTruncate && !isShowAll) {
    const truncatedContent = truncateMarkdown(content, 250);
    contentElem = (
      <div style={markdownStyle} className="project-content-markdown">
        <ReactMarkdown>{truncatedContent}</ReactMarkdown>
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
          onClick={() => {
            setShowAll(!isShowAll);
          }}
        >
          show more
        </button>
      </div>
    );
  } else {
    contentElem = (
      <div style={markdownStyle} className="project-content-markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
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
            onClick={() => {
              setShowAll(!isShowAll);
            }}
          >
            hide
          </button>
        )}
      </div>
    );
  }

  return (
    <Container
      id={id}
      ref={sectionRef}
      className={`${className} ${isVisible ? 'animate-in' : ''}`}
    >
      <Row className="" style={rowStyle}>
        <Col
          sm={12}
          md={5}
          className={`d-flex position-relative justify-content-center align-content-center project-image ${type === 'left' ? 'slide-from-left' : 'slide-from-right'}`}
          style={{ order: 0 }}
        >
          <Thumbnail url={imgUrl} type={type} />
        </Col>
        <Col
          sm={12}
          md={5}
          className={`px-3 mt-3 project-content ${type === 'left' ? 'slide-from-right' : 'slide-from-left'}`}
          style={{ order: 1, flex: "1 0 auto" }}
        >
          <div className="">
            <h2 className="title-thin fs-1">{title}</h2>
            <h2 className="title-bold fs-1 mb-3">{h2}</h2>
            {contentElem}
            <Row
              style={{
                gap: 1 + "rem",
                marginLeft: 5 + "px",
                rowGap: 1 + "rem",
              }}
            >
              {buttons.map((btn, index) => {
                if (btn.type === "button") {
                  return (
                    <button
                      key={index + 1}
                      className={
                        "btn-custom d-block" +
                        (btn.disabled ? " btn-disabled" : "")
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
                    target={"_blank"}
                    href={btn.href}
                    rel="noreferrer"
                  >
                    <span dangerouslySetInnerHTML={{ __html: btn.name }}></span>
                  </a>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
