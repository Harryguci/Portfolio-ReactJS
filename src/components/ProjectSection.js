import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  let buttons = [];
  if (props.buttons) {
    buttons = props.buttons.map((button) => {
      return {
        name: button.name,
        type: button.type,
        attr: button.attr,
        href: button.href,
      };
    });
  }

  const rowStyle = {
    gap: 7 + "%",
    rowGap: 3 + "rem",
    flexDirection: type === "right" ? "row-reverse" : "row",
  };

  const [isShowAll, setShowAll] = useState(false);
  let tContent = content;

  let contentElem = (
    <p style={{ lineHeight: "2rem", letterSpacing: "1px" }}>{tContent}</p>
  );

  if (content.length > 250) {
    if (isShowAll) {
      contentElem = (
        <p style={{ lineHeight: "2rem", letterSpacing: "1px" }}>
          {content}
          <button
            className="d-inline"
            style={{
              background: "none",
              color: "blue",
              border: "none",
            }}
            onClick={() => {
              setShowAll(!isShowAll);
            }}
          >
            hide
          </button>
        </p>
      );
    } else {
      tContent = tContent.substr(0,250) + "...";
      contentElem = (
        <p style={{ lineHeight: "2rem", letterSpacing: "1px" }}>
          {tContent}
          <button
            className="d-inline"
            style={{
              background: "none",
              color: "blue",
              border: "none",
            }}
            onClick={() => {
              setShowAll(!isShowAll);
            }}
          >
            show more
          </button>
        </p>
      );
    }
  }

  return (
    <Container id={id} className={className}>
      <Row className="" style={rowStyle}>
        <Col sm={12} md={5} style={{ order: 0 }}>
          <Thumbnail url={imgUrl} type={type} />
        </Col>
        <Col
          sm={12}
          md={5}
          className="px-3 mt-3"
          style={{ order: 1, flex: "1 0 auto" }}
        >
          <div className="mt-3 mt-md-5">
            <h2 className="title-thin fs-1">{title}</h2>
            <h2 className="title-bold fs-1 mb-3">{h2}</h2>
            {contentElem}
            <Row
              className="mt-5"
              style={{
                gap: 1 + "rem",
                marginLeft: 5 + "px",
                rowGap: 1 + "rem",
              }}
              b
            >
              {buttons.map((btn, index) => (
                <a
                  key={index + 1}
                  className="btn-custom d-block"
                  style={{ width: "fit-content" }}
                  target={"_blank"}
                  href={btn.href}
                  rel="noreferrer"
                >
                  {btn.name}
                </a>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
