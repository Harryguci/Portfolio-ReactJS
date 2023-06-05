import Form from "react-bootstrap/Form";
import "../Assets/Styles/SCSS/_base.scss";
import { useState, useEffect } from "react";

export default function MessageForm(props) {
  let className = "";
  const [values, setValues] = useState([]);

  props.className.forEach((name) => (className += name + " "));

  useEffect(() => {
    console.log("Re-render Values");

    setValues([
      {
        id: 1,
        name: "For work",
      },
      {
        id: 2,
        name: "Other",
      },
    ]);
  }, []);

  const [idCheckBox, setIdCheckBox] = useState([]);

  const isChecked = (id) => {
    try {
      return idCheckBox.some((value) => value === id);
    } catch (e) {
      return false;
    }
  };

  const handleChange = (id) => {
    var res = [];

    if (isChecked(id)) {
      for (var x of idCheckBox) {
        if (x !== id) {
          res = [...res, x];
        }
      }
      setIdCheckBox(res);
    } else {
      setIdCheckBox((prev) => [...prev, id]);
    }
  };

  const handleSubmit = (e) => {
    alert(`Xin cảm ơn ${name}`);
    e.preventDefault();
    console.log(`name: ${name}`);
    console.log(`email: ${email}`);
    console.log(`message: ${message}`);
    console.log(`type: ${idCheckBox}`);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Form
      className={className}
      method="POST"
      action="/message"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput1">
        <Form.Control
          className="bg-dark"
          name="userName"
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput2">
        <Form.Control
          className="bg-dark"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlTextarea1">
        <Form.Control
          className="bg-dark"
          name="content"
          as="textarea"
          rows={3}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>
      <p className="fw-bold" style={{ margin: "20px 0 5px 0" }}>
        Type of message
      </p>
      {values.map((item) => (
        <Form.Group key={item.id}>
          <input
            type="checkbox"
            name={item.name.replace(/ /g, "")}
            className="mx-2 d-inline-block"
            value={item.name}
            onChange={() => handleChange(item.id)}
            check={isChecked(item.id)}
          />
          <label htmlFor={item.name.replace(/ /g, "")} className="my-auto">
            {item.name}
          </label>
        </Form.Group>
      ))}
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
  );
}
