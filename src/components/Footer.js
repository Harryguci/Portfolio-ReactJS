import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Assets/Styles/SCSS/_base.scss";
import MessageForm from "./MessageForm";

export default function Footer() {
  return (
    <>
      <Container
        fluid
        style={{ color: "white" }}
        className="position-relative footer-container mt-5"
      >
        <div
          className="position-absolute circle bg-blue-gradient"
          style={{
            "z-index": 0,
            width: 30 + "vw",
            height: 30 + "vw",
            top: 0,
            left: 0,
            opacity: 0.5,
            transform: "translate(-50%, -30%)",
          }}
        ></div>
        <div
          className="position-absolute circle bg-blue-gradient"
          style={{
            "z-index": 0,
            width: 30 + "vw",
            height: 30 + "vw",
            top: 0,
            right: 0,
            opacity: 0.5,
            transform: "translate(50%, -30%)",
          }}
        ></div>
        <Row>
          <h2
            className="text-center fs-1 fw-bold mb-3"
            style={{ letterSpacing: 5 + "px" }}
          >
            CONTACT
          </h2>
        </Row>
        <Row>
          <Col md={6} sm={12}>
            <div>Drop me a Message</div>
          </Col>
          <Col md={6} sm={12}>
            <div className="m-5">
              <MessageForm className={["card-custom"]} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
