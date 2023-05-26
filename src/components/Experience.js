import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Experience() {
  const list = [
    {
      name: "AWS",
      url: "https://media.gettyimages.com/id/1239031090/fr/photo/amazon-aws-logo-exhibited-at-amazon-stand-during-the-mobile-world-congress-the-biggest-trade.jpg?s=612x612&w=gi&k=20&c=k93wf6_zqZbuDnaI-ncEOuuKA7DThCijZowtpX2dSro=",
    },
    {
      name: "CSS3(SCSS)",
      url: "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png",
    },
    { name: "REACT.JS", url: "./logo512.png" },
    {
      name: "HTML",
      url: "https://www.w3.org/html/logo/downloads/HTML5_Badge_256.png",
    },
    { name: "Java", url: "./Java_programming_language_logo.svg.png" },
    {
      name: "Javascript",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
    },
    {
      name: "Node.Js",
      url: "https://www.secret-source.eu/wp-content/uploads/2017/11/node-js-logo.jpg",
    },
    {
      name: "C/C++",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
    },
  ];

  return (
    <>
      <Container className="experience-container" style={{ color: "white" }}>
        <Row>
          <h2
            className="text-center fs-1 fw-bold my-5"
            style={{ letterSpacing: 2 + "px" }}
          >
            Experience
          </h2>
        </Row>
        <Row>
          {list.map((item) => (
            <Col col={3} className="my-3">
              <div>
                <div className="logo d-flex justify-content-center">
                  <img
                    src={item.url}
                    alt="Harryguci"
                    className="rounded-2"
                  />
                </div>
                <p className="text-center fs-4 mt-3">{item.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
