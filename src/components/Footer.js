import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Assets/Styles/SCSS/_base.scss";
import MessageForm from "./MessageForm";

export default function Footer() {
  const listInformation = [
    { url: "./logo512.png", description: "+84967259370" },
    { url: "./logo512.png", description: "huyquang0028@gmail.com" },
    { url: "./logo512.png", description: "Nghia Do, Hanoi, Vietnam" },
  ];
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
            <div>
              <h2 className="">Drop me a Message</h2>
              <p className="mt-3 mb-5">Some content in here...</p>
              {listInformation.map((item) => (
                <Row className="my-3 gap-5">
                  <Col sm={1}>
                    <img
                      src={item.url}
                      alt="harryguci"
                      className="bg-blue-gradient rounded-3 overflow-hidden p-2"
                      width="70px"
                      height="70px"
                    />
                  </Col>
                  <Col className="d-flex align-items-center">
                    <p className="m-0 p-0">{item.description}</p>
                  </Col>
                </Row>
              ))}
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="m-5">
              <MessageForm className={["card-custom"]} />
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={1}>
            <div>
              <img src="./logo512.png" alt="harryguci" width="50px" />
            </div>
          </Col>
          <Col sm={8}>
            <div className="d-flex align-items-center justify-content-center">
              <p className="opacity-50">2023 - Harryguci, All rights reserved</p>
            </div>
          </Col>
          <Col sm={3}>
            <Row className="justify-content-end align-items-center opacity-50">
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a href="/" className="text-white" style={{}}>
                  FB
                </a>
              </div>
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a href="/" className="text-white" style={{}}>
                  IG
                </a>
              </div>
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a href="/" className="text-white" style={{}}>
                  BE
                </a>
              </div>
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a href="/" className="text-white" style={{}}>
                  LI
                </a>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
