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
      name: "Node.Js",
      url: "https://www.secret-source.eu/wp-content/uploads/2017/11/node-js-logo.jpg",
    },
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
      url: "https://www.flexmind.co/wp-content/uploads/2020/04/logo-git-icon-e1586889963495.png",
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
      name: "AI Training",
      url: "https://i.morioh.com/201031/b496ea4d.webp",
    },
    {
      name: "Design Pattern",
      url: "https://static.vecteezy.com/system/resources/previews/004/578/736/original/enterprise-development-configuration-management-free-vector.jpg",
    },
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
                  src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/294274381_568029448094771_1507721242405144141_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Xzn-dfQ-u8gQ7kNvwFx11vE&_nc_oc=AdnZwXLSfarNlHb6FTDFxyLrNYF8ruA7hAuMmuM5d5bCeRJQBUMi5GCdoCgMJBC03QE&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=xZYIjSKhQLTbe8zB70kgCg&oh=00_AfLxcUs1O2v1KqhU2TB-xdNqe4HEt1JVoF7nch9bkA8yJg&oe=6842379E"
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
              <p className="text-left mt-1 mt-md-3">
                <span className="fs-1">CAIT - UTC University</span>
                <br />
                <span className="fs-6 opacity-50">
                  Center for Applied Information Technology
                </span>
                <br />
                <span className="fs-4">
                  Time: <strong>06/2022 - 01/2023</strong>
                </span>
                <br />
                <span className="fs-4">
                  Position: <strong>IT Support</strong>
                </span>
              </p>
            </div>
          </Col>
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
              <p className="text-left mt-1 mt-md-3">
                <span className="fs-1">QC Technology Solution</span>
                <br />
                <span className="fs-6 opacity-50">
                  Software Development Company
                </span>
                <br />
                <span className="fs-4">
                  Time: <strong>03/2021 - Present</strong>
                </span>
                <br />
                <span className="fs-4">
                  Position: <strong>Fresher Full-Stack Developer</strong>
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
