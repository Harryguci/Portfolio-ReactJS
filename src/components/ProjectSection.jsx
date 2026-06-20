import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Thumbnail from "./Thumbnail";
import ProjectDetailContent from "./ProjectDetailContent";
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
  const buttons = props.buttons ?? [];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <Container
      id={id}
      ref={sectionRef}
      className={`${className} ${isVisible ? "animate-in" : ""}`}
    >
      <Row className="" style={rowStyle}>
        <Col
          sm={12}
          md={5}
          className={`d-flex position-relative justify-content-center align-content-center project-image ${type === "left" ? "slide-from-left" : "slide-from-right"}`}
          style={{ order: 0 }}
        >
          <Thumbnail url={imgUrl} type={type} />
        </Col>
        <Col
          sm={12}
          md={5}
          className={`px-3 mt-3 project-content ${type === "left" ? "slide-from-right" : "slide-from-left"}`}
          style={{ order: 1, flex: "1 0 auto" }}
        >
          <ProjectDetailContent
            title={title}
            h2={h2}
            content={content}
            buttons={buttons}
          />
        </Col>
      </Row>
    </Container>
  );
}
