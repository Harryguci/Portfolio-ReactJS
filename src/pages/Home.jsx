import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectSection from "../components/ProjectSection";
import Services from "../components/Services";
import Experience from "../components/Experience";
import "../Assets/Styles/SCSS/_base.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScrollButton from "../components/ScrollButton";
import contentData from "../data/content.json";
import projectsData from "../data/projects.json";

function Home() {
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);
  const projectPagedLimit = 4;
  const [allProject, setAllProject] = useState(false);

  useEffect(() => {
    setContent(contentData.aboutMe);
    setProjects(projectsData);
  }, []);

  const handleViewAllProject = (event) => {
    setAllProject((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Header id="header" className="container-fluid container-md"></Header>
      <ProjectSection
        title="ABOUT ME"
        h2=""
        id="about"
        type="left"
        content={content}
        className="my-5"
        imgUrl="./IMG_2790.JPG"
        buttons={[
          {
            name: "Read More",
            type: "link",
            attr: ['href="/"'],
          },
          {
            name: "Download Resume",
            type: "link",
            attr: ['href="/download-resume"'],
          },
        ]}
      />
      <Container
        className=""
        style={{
          color: "white",
          marginTop: 5 + "rem",
          marginBottom: 0 + "rem",
        }}
      >
        <Row>
          <h2
            className="text-center fs-4 fs-1 my-4 text-uppercase"
            style={{ letterSpacing: 10 + "px" }}
          >
            Portfolio
          </h2>
        </Row>
      </Container>

      {projects
        .slice(0, !allProject ? projectPagedLimit : 100)
        .map((project, index) => (
          <div key={index + 1} style={{ margin: "150px auto auto auto" }}>
            <ProjectSection
              title={"PROJECT " + (index + 1)}
              h2={project.h2}
              type={project.type}
              content={project.content}
              className={project.className}
              imgUrl={project.imgUrl}
              buttons={project.buttons}
            />
          </div>
        ))}
      <Container className="" style={{ margin: "5rem auto 2rem auto" }}>
        <Row className="">
          <Col className="d-flex" style={{ justifyContent: "center" }}>
            <div>
              <button
                className="btn-custom d-block fs-4 fw-bold px-5 py-3"
                style={{ width: "fit-content" }}
                onClick={handleViewAllProject}
              >
                {!allProject ? "View All" : "Hide"}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <Services />
      <Experience />
      <ScrollButton />
    </React.Fragment>
  );
}

export default Home;
