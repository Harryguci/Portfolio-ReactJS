import Form from "react-bootstrap/Form";
import "../Assets/Styles/SCSS/_base.scss";
import "../Assets/Styles/SCSS/MacMessageForm.scss";
import { useState } from "react";

export default function MessageForm({ variant = "default", className = [] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const isMacos = variant === "macos";
  const formClass = [
    ...(Array.isArray(className) ? className : [className]),
    isMacos ? "mac-message-form" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClass = isMacos ? "mac-message-form__input" : "bg-dark";
  const submitClass = isMacos
    ? "mac-message-form__submit"
    : "btn bg-dark px-4 py-2 py-md-3 px-md-5 fw-bold";

  const handleSubmit = () => {
    alert(`Gửi thành công! Cảm ơn ${name}`);
  };

  return (
    <Form
      className={formClass}
      method="POST"
      action="https://docs.google.com/forms/d/e/1FAIpQLSf4r_LeYZS4ZT0A__sXOBC-A2HMrVGJhgK3_InjN6eDSTW8tA/formResponse"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput1">
        <Form.Label>To:</Form.Label>
        <Form.Control
          className={inputClass}
          name="entry.485905818"
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput2">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          className={inputClass}
          name="entry.1869112674"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlTextarea1">
        <Form.Label>Message:</Form.Label>
        <Form.Control
          className={inputClass}
          name="entry.897887378"
          as="textarea"
          rows={4}
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <button type="submit" className={submitClass}>
          Send
        </button>
      </Form.Group>
    </Form>
  );
}
