import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Assets/Styles/SCSS/_base.scss";
const services = [
  {
    name: "Software Development",
    description: `I possess extensive experience in Software Development, with a strong
     understanding of software architecture. Can build software on any platform: Desktop, Web, Mobile, etc.`,
    url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b0ef1f96575065.5eb190924cc53.jpg",
  },
  {
    name: "Website Development",
    description: `Knowledge in OOP, Data structure, Website. Proficient in HTML/CSS (SCSS), 
      Typescript/Javascript (ES6). Proficient in .NET and React. Can provide a landing page or a full website with a beautiful design and a responsive interface.`,
    url: "./logo512.png",
  },
  {
    name: "Game Development",
    description: `Knowledge in OOP, Data structure, Physics. Proficient in Java 17, 
      Game structure. Can use libraries for develop games and desktop app: SDL, Swing, Awt`,
    url: "./Java_programming_language_logo.svg.png",
  },
  {
    name: "Graphics Design",
    description: `Proficient in Adobe Photoshop, Adobe Illustrator and Lightroom,
       etc. Experience working in the field of education.`,
    url: "./adobeLogo.jpg",
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
                    style={{ maxHeight: 100 + "px", borderRadius: "5px" }}
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
