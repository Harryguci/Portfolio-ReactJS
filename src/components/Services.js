import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Assets/Styles/SCSS/_base.scss";
const services = [
  {
    name: "Graphics Design",
    description: `Proficient in Adobe Photoshop, Adobe Illustrator and Lightroom,
       etc. Experience working in the field of education.`,
    url: "./adobeLogo.jpg",
  },
  {
    name: "Website Development",
    description:
      `Knowledge in OOP, Data structure, Website. Proficient in HTML, CSS (SCSS), 
      Javascript (ES6). Can use basic of NodeJs(Express) and React.`,
    url: "./logo512.png",
  },
  {
    name: "Game Development",
    description: `Knowledge in OOP, Data structure, Physics. Proficient in Java 17, 
      Game structure. Can use libraries for develop games and desktop app: SDL, Swing, Awt`,
    url: "./Java_programming_language_logo.svg.png",
  },
  {
    name: "Network and Hardware",
    description: `I possess extensive experience in Network and Hardware, with a strong
     understanding of network architecture, protocols, and components. In hardware, I 
     excel in assembling, upgrading, repairing computer systems, resolving hardware 
     issues, and staying up-to-date with the latest technologies.`,
    url: "./NodeJS.png",
  },
];
export default function Services() {
  return (
    <>
      <Container
        id="services"
        className="my-2 my-md-5 services-container"
        style={{ color: "white" }}
      >
        <Row>
          <h2
            className="text-center my-5 fs-1 fw-bold"
            style={{ letterSpacing: 2 + "px" }}
          >
            Services
          </h2>
        </Row>
        <Row
          className=""
          style={{
            justifyContent: "center",
            margin: "auto 0.5rem",
            rowGap: "2rem",
          }}
        >
          {services.map((service) => (
            <Col sm={12} md={6} key={service.name}>
              <div className="service-box p-md-5 p-3">
                <div
                  className="d-flex gap-md-4 gap-2"
                  style={{ alignItem: "center" }}
                >
                  <img
                    src={service.url}
                    alt="Harryguci"
                    style={{ maxHeight: 100 + "px" }}
                  />
                  <h2 style={{ margin: "auto 0" }}>{service.name}</h2>
                </div>
                <p className="mt-2 opacity-75">{service.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
