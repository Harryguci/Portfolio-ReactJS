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
          id="contact-form"
          style={{
            zIndex: 0,
            width: 30 + "vw",
            height: 30 + "vw",
            minWidth: "200px",
            minHeight: "200px",
            top: 0,
            left: 0,
            opacity: 0.5,
            transform: "translate(-50%, -30%)",
          }}
        ></div>
        <div
          className="position-absolute circle bg-blue-gradient"
          style={{
            zIndex: 0,
            width: 30 + "vw",
            height: 30 + "vw",
            top: 0,
            right: 0,
            minWidth: "200px",
            minHeight: "200px",
            opacity: 0.5,
            transform: "translate(50%, -30%)",
          }}
        ></div>
        <Row className="position-relative" style={{ zIndex: 1 }}>
          <h2
            className="text-center fs-1 fw-bold mb-5"
            style={{ letterSpacing: 5 + "px" }}
          >
            CONTACT
          </h2>
        </Row>
        <Row className="position-relative" style={{ zIndex: 1, gap: "50px 0" }}>
          <Col sm={12} md={6}>
            <div>
              <h2 className="fs-2">Drop me a Message</h2>
              <p className="mt-3 mb-5">Some content in here...</p>
              {listInformation.map((item, index) => (
                <Row
                  className="my-3"
                  key={index}
                  style={{
                    gap: 10 + "px",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  <Col>
                    <div className="thumb" style={{maxHeight: 100 + "px"}}>
                      <img
                        src={item.url}
                        alt="harryguci"
                        className="d-block 
                        bg-blue-gradient 
                        rounded-3 
                        overflow-hidden 
                        p-2"
                        style={{
                          width: "70px",
                          height: "auto",
                          maxWidth: "15vw",
                        }}
                      />
                    </div>
                  </Col>
                  <p className="d-block p-0 my-auto">{item.description}</p>
                </Row>
              ))}
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="m-xl-5">
              <MessageForm className={["card-custom"]} />
            </div>
          </Col>
        </Row>
        <hr style={{ margin: "2rem 0" }} />
        <Row style={{ gap: "20px 0" }}>
          <Col md={1}>
            <div
              className="d-flex justify-content-center"
              style={{ objectFit: "cover" }}
            >
              <img
                src="./logo512.png"
                alt="harryguci"
                style={{
                  width: 50 + "px",
                  height: "max-content",
                  maxWidth: "15vw",
                }}
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="d-flex align-items-center justify-content-center">
              <p className="opacity-50 text-center">
                2023 - Harryguci, All rights reserved
              </p>
            </div>
          </Col>
          <Col md={3}>
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
