import Header from "../components/Header";
import ProjectSection from "../components/ProjectSection";
import Services from "../components/Services";
import Experience from "../components/Experience";
import "../Assets/Styles/SCSS/_base.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const content = `“I graduated with my degree in Economics two months ago. 
  I chose that field of study because I’ve always been interested in finance and money, 
  and a couple of family members told me it leads to great career options, too.”`;
  const listProjectNames = [
    "Mobile App",
    "Website",
    "Desktop",
    "Other Projects",
  ];

  let currentProject = "Mobile App";

  return (
    <>
      <Header className="container-fluid container-md"></Header>
      <ProjectSection
        title="ABOUT ME"
        h2=""
        type="left"
        content={content}
        className="my-5"
        imgUrl="/avatar.jpg"
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
          marginTop: 150 + "px",
          marginBottom: 150 + "px",
        }}
      >
        <Row>
          <h2
            className="text-center fs-1 my-5 text-uppercase"
            style={{ letterSpacing: 10 + "px" }}
          >
            Portfolio
          </h2>
        </Row>
        <Row className="" style={{ justifyContent: "center" }}>
          {listProjectNames.map((name) => {
            let className = "text-center fs-4 link-custom";
            if (name === currentProject) className += " active";

            return (
              <Col sm={6} md={3} xl={2}>
                <a href="/" className={className}>
                  {name}
                </a>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div style={{ margin: "150px auto" }}>
        <ProjectSection
          title="PROJECT 1"
          h2="File Sharing Website"
          type="right"
          content={content}
          className="my-5"
          imgUrl="/nodejs.jpg"
          buttons={[
            {
              name: "Read More",
              type: "link",
              attr: ['href="/projects/1"'],
            },
          ]}
        />
      </div>
      <div style={{ margin: "150px auto" }}>
        <ProjectSection
          title="PROJECT 2"
          h2="Todo List Website"
          type="left"
          content={content}
          className="my-5"
          imgUrl="/nodejs.jpg"
          buttons={[
            {
              name: "Read More",
              type: "link",
              attr: ['href="/projects/1"'],
            },
          ]}
        />
      </div>

      <Container>
        <Row className="">
          <Col className="d-flex" style={{ justifyContent: "center" }}>
            <div>
              <a
                href="/projects"
                className="btn-custom my-2 d-block fs-4 fw-bold px-5 py-3"
                style={{ width: "fit-content" }}
              >
                View All
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <Services />
      <Experience />
    </>
  );
}

export default Home;
