import "../Assets/Styles/SCSS/home.scss";
import "../Assets/Styles/SCSS/header.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";

export default function Header() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Fullstack Software Developer";
  const typingSpeed = 100; // milliseconds

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId = null;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        timeoutId = setTimeout(() => {
          currentIndex = 0;
        }, 1000);
      }
    }, typingSpeed);

    return () => {
      clearInterval(timer);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header
      id="home-header"
      className="container-md"
      style={{ backgroundColor: "none" }}
    >
      <Container className="my-5">
        <Row>
          <Col sm={12} md={6}>
            <p className="sub-title m-0 fs-2">I'm a <span className="crossed" style={{ marginLeft: 10 + "px" }}>Coder</span></p>
            <h1 className="title m-0 p-0">
              {displayText}
              <span className="typing-cursor">|</span>
            </h1>
            <a
              href="#contact-form"
              className="btn btn-custom mt-5 fs-5 fw-bold"
            >
              Contact Me
            </a>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
