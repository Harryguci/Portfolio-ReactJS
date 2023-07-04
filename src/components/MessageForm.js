import Form from "react-bootstrap/Form";
import "../Assets/Styles/SCSS/_base.scss";
import { useState, useEffect } from "react";

export default function MessageForm(props) {
 const [className, setClassName] = useState([]);
  useEffect(() => {
    let txt = "";
    props.className.forEach((name) => (txt += name + " "));
    setClassName(prev => prev += txt);
  },[props.className]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    alert(`Gửi thành công! Cảm ơn ${name}`);
  };

  return (
    <>
      <Form
        className={className}
        method="POST"
        action="https://docs.google.com/forms/d/e/1FAIpQLSf4r_LeYZS4ZT0A__sXOBC-A2HMrVGJhgK3_InjN6eDSTW8tA/formResponse"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Group className="mb-3" controlId="MessageForm.ControlInput1">
          <Form.Control
            controlid="name"
            className="bg-dark"
            name="entry.485905818"
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="MessageForm.ControlInput2">
          <Form.Control
            controlid="email"
            className="bg-dark"
            name="entry.1869112674"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="MessageForm.ControlTextarea1">
          <Form.Control
            controlid="message"
            className="bg-dark"
            name="entry.897887378"
            as="textarea"
            rows={3}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-4 mt-md-5">
          <button
            type="submit"
            className="btn bg-dark px-4 py-2 py-md-3 px-md-5 fw-bold"
            style={{ fontSize: 1 + "rem" }}
          >
            SEND
          </button>
        </Form.Group>
      </Form>
    </>
  );
}
