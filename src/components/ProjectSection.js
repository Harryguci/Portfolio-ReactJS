import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Thumbnail from "./Thumbnail";
import "../Assets/Styles/SCSS/_base.scss";
import "../Assets/Styles/SCSS/ProjectSection.scss";

export default function ProjectSection(props) {
  const title = props.title;
  const h2 = props.h2;
  const content = props.content;
  const type = props.type ? props.type : "right";
  const className = props.className + " project-section";
  const imgUrl = props.imgUrl;

  const handleOrder = (index) => {
    console.log(type);
    if (type === "left" && index === 0) return 0;
    else if (type === "left" && index === 1) return 1;
    else if (type === "right" && index === 0) return 1;
    else return 0;
  };
  let buttons = [];

  if (props.buttons) {
    buttons = props.buttons.map((button) => {
      return {
        name: button.name,
        type: button.type,
        attr: button.attr,
      };
    });
  }

  return (
    <Container className={className}>
      <Row className="flex-nowrap" style={{ gap: 4 + "rem" }}>
        <Col sm={12} md={6} style={{ order: handleOrder(0) }}>
          <Thumbnail url={imgUrl} type={type} />
        </Col>
        <Col sm={12} md={6} className="px-0" style={{ order: handleOrder(1) }}>
          <div className="mt-5">
            <h2 className="title-thin fs-1">{title}</h2>
            <h2 className="title-bold fs-1 mb-3">{h2}</h2>
            <p style={{ lineHeight: "2rem", letterSpacing: "1px" }}>
              {content}
            </p>
            <Row className="mx-1" style={{ gap: 2 + "rem" }}>
              {buttons.map((btn) => (
                <a
                  href="/"
                  className="btn-custom my-2 d-block"
                  style={{ width: "fit-content" }}
                  {...btn.attr}
                >
                  {btn.name}
                </a>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
