import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Assets/Styles/SCSS/_base.scss";

export default function Services() {
  const services = [
    {
      name: "Graphics Design",
      description: `Proficient in Adobe Photoshop, Adobe Illustrator and Lightroom,
         etc. Experience working in the field of education.`,
      url: "./adobe logo.jpg",
    },
    {
      name: "Website Development",
      description:
        "Knowles in OOP, Data structure, Website. Proficient in HTML, CSS (SCSS), Javascript (ES6). Can use NodeJs(Express) and React.",
      url: "./logo512.png",
    },
    {
      name: "Game Development",
      description:
        "Knowles in OOP, Data structure, Website. Proficient in HTML, CSS (SCSS), Javascript (ES6). Can use NodeJs(Express) and React.",
      url: "./Java_programming_language_logo.svg.png",
    },
    {
      name: "Network and Hardware",
      description:
        "Knowles in OOP, Data structure, Website. Proficient in HTML, CSS (SCSS), Javascript (ES6). Can use NodeJs(Express) and React.",
      url: "./png-transparent-node-js-javascript-database-mongodb-native-miscellaneous-text-trademark.png",
    },
  ];

  return (
    <>
      <Container className="my-5 services-container" style={{ color: "white" }}>
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
            <Col sm={12} md={6}>
              <div className="service-box p-md-5 p-2">
                <div className="d-flex gap-md-4 gap-2" style={{ alignItem: "center" }}>
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
