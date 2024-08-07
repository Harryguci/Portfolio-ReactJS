import React, { useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Experience() {
  const list = useRef([
    {
      name: "HTML",
      url: "https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png",
    },
    {
      name: "CSS3(SCSS)",
      url: "./scss.png",
    },
    {
      name: "Javascript",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
    },
    { name: "REACT.JS", url: "./logo512.png" },
    {
      name: "Node.Js",
      url: "https://www.secret-source.eu/wp-content/uploads/2017/11/node-js-logo.jpg",
    },
    { name: "Java", url: "./Java_programming_language_logo.svg.png" },
    {
      name: "C/C++",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
    },
    {
      name: "SQL Server",
      url: "./SQL-server.jpg",
    },
    {
      name: "MongoDB",
      url: "https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Picture.png",
    },
    {
      name: "Git & Github",
      url: "https://www.flexmind.co/wp-content/uploads/2020/04/logo-git-icon-e1586889963495.png"
    },
    {
      name: "ASP .NET",
      url: "https://devblogs.microsoft.com/dotnet/wp-content/uploads/sites/10/2019/11/msft.net_large_purple-1.png"
    },
    {
      name: "MySQL",
      url: "./MySql.jpg"
    },
    {
      name: "Deploy",
      url: "./cloud-server-icon-vector-15548468.jpg"
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
        <Row style={{ rowGap: 1 + "rem" }}>
          {list.current.map((item, index) => (
            <Col col={3} className="" key={index + 1}>
              <div key={item.name}>
                <div className="logo mx-auto" style={{ width: "max-content" }}>
                  <img src={item.url} alt="Harryguci" className="rounded-2" />
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
