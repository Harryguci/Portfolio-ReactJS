// import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import "../Assets/Styles/SCSS/_base.scss";
// import { FaBuromobelexperte } from "react-icons/fa";
import { useState } from "react";

const values = [
  {
    id: 1,
    name: "For work",
  },
  {
    id: 2,
    name: "Other",
  },
  {
    id: 3,
    name: "...",
  },
];

export default function MessageForm(props) {
  let className = "";
  props.className.forEach((name) => (className += name + " "));

  const [idCheckBox, setIdCheckBox] = useState([]);

  const isChecked = (id) => {
    try {
      return idCheckBox.some((value, index) => value === id);
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
      action="/send-message"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput1">
        <Form.Control
          className="bg-dark"
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput2">
        <Form.Control
          className="bg-dark"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlTextarea1">
        <Form.Control
          className="bg-dark"
          type="textarea"
          rows={3}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>
      <p className="fw-bold" style={{margin: "20px 0 5px 0"}}>Kind of message</p>
      {values.map((item) => (
        <Form.Group key={item.id}>
          <input
            type="checkbox"
            name={item.name.replace(/ /g, "")}
            className="mx-2"
            value={item.name}
            onChange={() => handleChange(item.id)}
            check={isChecked(item.id)}
          />
          <label for={item.name.replace(/ /g, "")}>{item.name}</label>
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
