import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Experience() {
  const [list] = useState([
    {
      name: "HTML",
      url: "https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png",
    },
    {
      name: "CSS3(SCSS)",
      url: "./scss.png",
    },
    {
      name: ".NET",
      url: "https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2019/11/msft.net_large_purple-1.png",
    },
    {
      name: "Javascript",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
    },
    {
      name: "Typescript",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    },
    { name: "REACT.JS", url: "./logo512.png" },
    {
      name: "Git",
      url: "https://www.flexmind.co/wp-content/uploads/2020/04/logo-git-icon-e1586889963495.png",
    },
    {
      name: "MongoDB",
      url: "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Picture.png",
    },
    {
      name: "SQL Server",
      url: "./SQL-server.jpg",
    },
    {
      name: "MySQL",
      url: "./MySql.jpg",
    },
    {
      name: "MariaDB",
      url: "https://tse3.mm.bing.net/th/id/OIP.OTVdttLMJrP9U-Vp1hEzlwAAAA?rs=1&pid=ImgDetMain",
    },
    {
      name: "Deploy",
      url: "./cloud-server-icon-vector-15548468.jpg",
    },
    {
      name: "Docker",
      url: "https://tse2.mm.bing.net/th/id/OIP.svA18pveVjdiWvAwjI-tlgHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Azure",
      url: "https://swimburger.net/media/0zcpmk1b/azure.jpg",
    },
    {
      name: "Python",
      url: "https://alhazen.academy/wp-content/uploads/2024/07/apa-sih-python-itu.jpg",
    },
    {
      name: "Next.js",
      url: "https://tse1.mm.bing.net/th/id/OIP.F4ZMUhYoJeGVHf9ur-4C7gHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Agile Scrum",
      url: "https://as1.ftcdn.net/v2/jpg/03/35/87/38/1000_F_335873870_9lGF7CqjQinw5AdAxIDobvNTwgcZrzOq.jpg",
    },
    {
      name: "Design Pattern",
      url: "https://static.vecteezy.com/system/resources/previews/004/578/736/original/enterprise-development-configuration-management-free-vector.jpg",
    },
    {
      name: "AI Model Training",
      url: "https://cdn.analyticsvidhya.com/wp-content/uploads/2025/05/4-4.webp",
    },
    {
      name: "AI Integration",
      url: "https://www.xevensolutions.com/wp-content/uploads/2024/06/what-are-the-AI-models.jpg",
    }
  ]);

  return (
    <>
      <Container
        id="experience"
        className="experience-container mb-3"
        style={{ color: "white" }}
      >
        <Row>
          <h2
            className="text-center fs-1 fw-bold mt-5 mb-4 my-md-5"
            style={{ letterSpacing: 2 + "px" }}
          >
            Experience
          </h2>
        </Row>
        <Row className="mb-5">
          {/* <Col className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex mx-auto justify-content-center"
              style={{
                flexDirection: "column",
                rowGap: 1 + "rem",
              }}
            >
              <div className="mx-auto">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/LogoUTC.jpg/1200px-LogoUTC.jpg"
                  className="rounded-circle"
                  alt="UTC University"
                  style={{
                    overflow: "hidden",
                    aspectRatio: "1/1",
                    width: "10rem",
                    height: "10rem",
                  }}
                />
              </div>
              <p className="text-left mt-1 mt-md-3">
                <span className="fs-1">CAIT - UTC University</span>
                <br />
                <span className="fs-6 opacity-50">
                  Center for Applied Information Technology
                </span>
                <br />
                <span className="fs-4">
                  <img
                    src="./schedule_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="time"
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <strong style={{ marginLeft: "0.5rem" }}>06/2022 - 01/2023</strong>
                </span>
                <br />
                <span className="fs-4">
                  <img
                    src="./person_pin_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="time"
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <strong style={{ marginLeft: "0.5rem" }}>IT Support</strong>
                </span>
              </p>
            </div>
          </Col> */}
          <Col className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex mx-auto justify-content-center"
              style={{
                flexDirection: "column",
                rowGap: 1 + "rem",
              }}
            >
              <div className="mx-auto">
                <img
                  src="/1727497380757.jpg"
                  className="rounded-circle"
                  alt="QC Technology Solution"
                  style={{
                    overflow: "hidden",
                    aspectRatio: "1/1",
                    width: "10rem",
                    height: "10rem",
                  }}
                />
              </div>
              <p className="text-left mt-1 mt-md-3" style={{ lineHeight: 1.7 }}>
                <span className="fs-1">QC Technology Solution</span>
                <br />
                <span className="fs-6 opacity-50">
                  Software Development Company
                </span>
                <br />
                <span className="fs-4">
                  <img
                    src="./schedule_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="time"
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <strong style={{ marginLeft: "0.5rem" }}>03/2024 - Present</strong>
                </span>
                <br />
                <span className="fs-4">
                  <img
                    src="./person_pin_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="time"
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <strong style={{ marginLeft: "0.5rem" }}>Full-Stack Developer</strong>
                </span>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2
            className="text-center fs-1 fw-bold mt-5 mb-4 my-md-5"
            style={{ letterSpacing: 2 + "px" }}
          >
            Skills
          </h2>
        </Row>
        <Row style={{ rowGap: 1 + "rem" }}>
          {list.map((item, index) => (
            <Col col={3} className="" key={index + 1}>
              <div key={item.name}>
                <div className="logo mx-auto" style={{ width: "max-content" }}>
                  <img
                    src={item.url}
                    alt="Harryguci"
                    className="rounded-2"
                    style={{
                      aspectRatio: "1/1",
                    }}
                  />
                </div>
                <p className="text-center fs-4 mt-1 mt-md-3">{item.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
