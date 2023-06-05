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

function Home() {
  const [currentProject] = useState("Mobile App");
  const [listProjectNames, setListProjectNames] = useState([]);
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    setListProjectNames(["Mobile App", "Website", "Desktop", "Other Projects"]);
    setContent(`Hello, everyone! My name is QUANG HUY, and I am thrilled
    to introduce myself as an intern website developer. 
    I have been studying Information & Technology at the University of Transport & Communications since Oct 2021.
    I am passionate about crafting digital experiences that
     are visually appealing, user-friendly, and highly functional.
      With a strong foundation in web development languages 
      such as HTML, CSS, and JavaScript (ES6 and Jquery).
      Currently I am learning about NodeJs, ReactJs and some things about Javascript.`);
    setProjects([
      {
        title: "PROJECT 1",
        h2: "File Sharing Website",
        type: "right",
        content: `HARG website, the premier platform for sharing 
          and downloading learning documents. Upload and access a wide range
           of educational resources including textbooks, research papers, 
           lecture notes, and study guides. With an intuitive interface and 
           powerful search functionality, finding the materials you need has 
           never been easier.`,
        className: "my-5",
        imgUrl: "/Screenshot-8.png",
        buttons: [
          {
            name: "Read More",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/File-Sharing-Application",
          },
        ],
      },
      {
        title: "PROJECT 2",
        h2: "Todo List Website",
        type: "left",
        content: `TodoList website, your ultimate Todo List Website! Stay 
          organized and productive with TodoList, a user-friendly platform 
          designed to help you manage your tasks effortlessly.  With TodoList, 
          you can create personalized to-do lists, set due dates, and prioritize 
          your tasks with ease. Stay on top of your commitments by organizing your 
          tasks into categories and subtasks, ensuring nothing falls through the cracks. 
          The intuitive interface makes adding, editing, and checking off tasks a breeze. 
          Receive timely reminders and notifications, so you never miss an important 
          deadline again.`,
        className: "my-3 my-md-5",
        imgUrl: "/nodejs.jpg",
        buttons: [
          {
            name: "Read More",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/To-do-list-application",
          },
        ],
      },
      {
        title: "PROJECT 3",
        h2: "Bomber Game",
        type: "right",
        content: `Experience explosive fun with the Java-based Bomber game! 
          Engage in thrilling gameplay as you strategically navigate through 
          maze-like levels, planting bombs to destroy obstacles and outsmart 
          your opponents. Unleash your inner strategist and embark on an 
          adrenaline-fueled adventure. Play the Bomber game today and ignite 
          your gaming experience!`,
        className: "my-5",
        imgUrl: "./javaGame.png",
        buttons: [
          {
            name: "Read More",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/Bomber-Game",
          },
        ],
      },
      {
        title: "PROJECT 4",
        h2: "Hotel Management Website",
        type: "left",
        content: `Our sleek and intuitive hotel management website interface! 
          Designed with HTML, CSS, and Javascript (jQuery), our interface offers 
          a seamless experience for both hotel administrators and guests.
          Effortlessly navigate through our user-friendly interface to access a 
          range of powerful features. Hotel administrators can efficiently manage 
          reservations, check-ins, and check-outs, ensuring a smooth and organized 
          operation. With real-time updates and comprehensive data analytics, make 
          informed decisions to optimize occupancy and revenue.`,
        className: "my-5",
        imgUrl: "./hotel-web.png",
        buttons: [
          {
            name: "Read More",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/Hotel-management-website",
          },
        ],
      },
    ]);
  }, []);
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
        imgUrl="/avatar2.jpg"
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
        <Row className="" style={{ justifyContent: "center" }}>
          {listProjectNames.map((name) => {
            let className = "text-center fs-5 link-custom";
            if (name === currentProject) className += " active";

            return (
              <Col
                key={name}
                md={3}
                xl={2}
                className=""
                style={{ justifyContent: "center" }}
              >
                <a href="/" className={className}>
                  {name}
                </a>
              </Col>
            );
          })}
        </Row>
      </Container>

      {projects.map((project, index) => (
        <div key={index + 1} style={{ margin: "150px auto auto auto" }}>
          <ProjectSection
            title={project.title}
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
              <a
                href="https://github.com/Harryguci"
                className="btn-custom d-block fs-4 fw-bold px-5 py-3"
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
      <ScrollButton />
    </React.Fragment>
  );
}

export default Home;
