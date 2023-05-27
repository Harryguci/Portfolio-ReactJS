// import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import "../Assets/Styles/SCSS/_base.scss";

export default function MessageForm(props) {
  let className = "";
  props.className.forEach((name) => (className += name + " "));

  return (
    <Form className={className}>
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput1">
        <Form.Control
          className="bg-dark"
          type="text"
          placeholder="Your name..."
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlInput2">
        <Form.Control className="bg-dark" type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="MessageForm.ControlTextarea1">
        <Form.Control
          className="bg-dark"
          as="textarea"
          rows={3}
          placeholder="Message"
        />
      </Form.Group>
      <Form.Group className="mt-4 mt-md-5">
        <button type="submit" className="btn bg-dark px-4 py-2 py-md-3 px-md-5 fw-bold" style={{fontSize: 1 + "rem"}}>
          SEND
        </button>
      </Form.Group>
    </Form>
  );
}
