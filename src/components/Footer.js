import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Assets/Styles/SCSS/_base.scss";
import MessageForm from "./MessageForm";
import React, { useState, useEffect } from "react";

import {
  FaPhone,
  FaEnvelope,
  FaLocationArrow,
  FaFacebookF,
  FaInstagram,
  FaBehance,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  const [listInformation, setListInformation] = useState([]);
  useEffect(() => {
    console.log("Re-render Footer");
    setListInformation([
      {
        description: "+84967259370",
        icon: <FaPhone />,
      },
      {
        description: "huyquang0028@gmail.com",
        icon: <FaEnvelope />,
      },
      {
        description: "Nghia Do, Hanoi, Vietnam",
        icon: <FaLocationArrow />,
      },
      {
        description: "fb.com/chu.huy.336333/",
        icon: <FaFacebookF />,
        href: "https://www.facebook.com/chu.huy.336333/",
      },
      {
        description: "instagram.com/q_huy.28",
        icon: <FaInstagram />,
        href: "https://instagram.com/q_huy.28",
      },
      {
        description: "github.com/Harryguci",
        icon: <FaGithub />,
        href: "https://github.com/Harryguci",
      },
    ]);
  }, []);

  return (
    <React.Fragment>
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
            <div className="px-3 px-md-0">
              <h2 className="fs-2">Drop me a Message</h2>
              <p className="mt-3 opacity-75" style={{ maxWidth: "400px" }}>
                I'm ready for a job as an intern software developer. If you want
                to contact me for work, please email me. I am happy that you
                were here.
                <br />
              </p>
              <p className="mb-5 fw-bold">Have a nice day!</p>
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
                    <div className="thumb" style={{ maxHeight: 100 + "px" }}>
                      {item.icon}
                    </div>
                  </Col>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="d-block p-0 my-auto"
                      style={{ color: "rgb(150, 150, 255)" }}
                    >
                      {item.description}
                    </a>
                  ) : (
                    <p className="d-block p-0 my-auto">{item.description}</p>
                  )}
                </Row>
              ))}
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="m-xl-5 px-1 px-md-0">
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
                src="./harryguci-logo-white.png"
                alt="harryguci"
                style={{
                  width: 30 + "px",
                  height: "auto",
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
            <Row className="justify-content-center align-items-center opacity-75">
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a
                  target="_blank"
                  href="https://www.facebook.com/chu.huy.336333/"
                  className="text-white"
                  rel="noreferrer"
                >
                  <FaFacebookF />
                </a>
              </div>
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a
                  target="_blank"
                  href="https://instagram.com/q_huy.28"
                  className="text-white"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a
                  target="_blank"
                  href="https://www.behance.net/chuhuy1"
                  className="text-white"
                  rel="noreferrer"
                >
                  <FaBehance />
                </a>
              </div>
              <div className="d-block" style={{ width: 50 + "px" }}>
                <a
                  target="_blank"
                  href="https://github.com/Harryguci"
                  className="text-white"
                  rel="noreferrer"
                >
                  <FaGithub />
                </a>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
