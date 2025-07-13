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
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);
  const projectPagedLimit = 4;
  const [allProject, setAllProject] = useState(false);

  useEffect(() => {
    setContent(`My name is Chu Quang Huy, and I am a Full-Stack Software Developer based in Hanoi, Vietnam, with over one year of hands-on experience. I specialize in .NET and React.js, and have solid experience working with both SQL (MySQL, SQL Server) and NoSQL (MongoDB) databases.
    I have a strong foundation in software design principles such as DDD, SOLID, and Distributed Systems, along with experience in AI model training and working within Agile Scrum environments. I'm also proficient with modern CSS frameworks like Bootstrap, Tailwind CSS, SCSS, and commonly used React libraries.

    I bring a responsible work ethic, a growth mindset, and an open, collaborative attitude to every team I join.`);

    setProjects([
      {
        h2: "Paperless Meeting Management",
        type: "left",
        content: `The “Paperless Meeting Management” application is a comprehensive digital solution designed to modernize and streamline the organization and administration of meetings within government agencies and enterprises. The system digitizes all aspects of a meeting, including participant management, meeting content, and related documents. It supports the entire meeting lifecycle—from planning and approval, sending invitations, confirming attendance, conducting the meeting (online or in-person), to post-meeting summaries and follow-ups.

        The application is cross-platform, enabling seamless access on both desktop and mobile devices, which ensures users can manage and participate in meetings anytime, anywhere. Technologically, the system is built using .NET Core 8.0 and the ABP Framework for the backend, ReactJS for the frontend, and MariaDB for data storage. Additionally, it leverages Docker for containerized deployment and Azure cloud infrastructure to ensure high scalability, security, and availability.

        By replacing traditional paper-based processes, the application significantly reduces administrative workload, enhances collaboration, improves information transparency, and supports a modern, efficient working environment. This solution represents a vital step towards digital transformation and sustainable, paperless governance.`,
        className: "my-5",
        imgUrl: "./meeting_project.png",
        buttons: [
          {
            name: "Source (Update later)",
            type: "button",
            attr: [],
            href: "#",
            disabled: true,
          },
        ],
      },
      {
        // title: "PROJECT 3",
        h2: "Effort Tracking Application",
        type: "left",
        content: `A Management applications can track and calculate the effort of work items. Help to managers business team. In the first version, it focus to manager development team, works with Azure Devops.`,
        className: "my-5",
        imgUrl: "./effort-tracking.png",
        buttons: [
          {
            name: `Read More <small style="opacity: 0.5">(Update later)</small>`,
            type: "button",
            attr: [],
            href: "#",
            disabled: true,
          },
        ],
      },
      {
        // title: "PROJECT 1",
        h2: "Chating Realtime Website",
        type: "right",
        content: `- The premier real-time chatting platform where you can connect with friends, family, and colleagues instantly.
        - Using NEXT.JS - a ReactJs framework to build the user-friendly interface.
        - Using Websocket with .NET 8.0 to build the BackEnd layer: Authentication, Author,  handle request, valid data, handle conflic, send & receive messages in real-time.`,
        className: "my-5",
        imgUrl: "./chating-app.png",
        buttons: [
          {
            name: "Source Client",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/Chatting-Realtime-Client",
          },
          {
            name: "Source Server",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/Chatting-Realtime-Server",
          },
        ],
      },
      {
        // title: "PROJECT 2",
        h2: "Showroom management website",
        type: "left",
        content: `The website is a website application. The website provides features
         to manage about Employees, Customers, Products, Services, Reports and financial statistics...
         The object of use are manager, sales employee, customers. Ensure that the website 
         is authorized and authenticated, protected information.`,
        className: "my-5",
        imgUrl: "./ShowroomManagement.png",
        buttons: [
          {
            name: "Read More",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/Showroom-ASPNET-Core-MVC",
          },
        ],
      },
      {
        // title: "PROJECT 3",
        h2: "Environment Social Website",
        type: "left",
        content: `The website about environmental protection allows users to buy, 
        sell and exchange environmentally friendly products. Users can post articles
         as a social network to provide information and call on the community to protect
          the environment.        `,
        className: "my-5",
        imgUrl: "./environment-website1.png",
        buttons: [
          {
            name: "Read More",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/Environment-website",
          },
        ],
      },
      {
        // title: "PROJECT 4",
        h2: "Travel Maps",
        type: "right",
        content: `Discover Travel Maps: Your interactive travel journal! 
        Share your wanderlust adventures with an interactive map and captivating
         pictures. Inspire others to explore the world as you document your journeys.
          Join us and let your memories take flight! User can add some pictures in your location on maps
          and views all pictures was uploaded.`,
        className: "my-5",
        imgUrl: "./travel-maps-website.png",
        buttons: [
          {
            name: "Client",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/client-maps-travel-website",
          },
          {
            name: "Server",
            type: "link",
            attr: [],
            href: "https://github.com/Harryguci/server-maps-travel-website",
          },
          {
            name: "Demo",
            type: "link",
            attr: [],
            href: "https://maps-travel-website.vercel.app/",
          },
        ],
      },
      {
        // title: "PROJECT 5",
        h2: "File Sharing Website",
        type: "left",
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
        // title: "PROJECT 5",
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
        title: "PROJECT 6",
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
