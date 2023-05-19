import "../Assets/Styles/SCSS/home.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header() {
  return (
    <header className="container-md" style={{ backgroundColor: "none" }}>
      <Container className="my-5">
        <Row>
          <Col sm={12} md={6}>
            <p className="sub-title m-0 fs-2">I'm a</p>
            <h1 className="title m-0 p-0" style={{}}>
              Fullstack Software Developer
            </h1>
            <a href="/" className="btn btn-custom mt-5 fs-5 fw-bold">
              Previous Projects
            </a>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
