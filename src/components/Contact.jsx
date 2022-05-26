import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div``;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 615px;
  height: 35px;
`;

const Button = styled.input`
  width: 615px;
  height: 35px;
`;

const TextField = styled.textarea`
  width: 615px;
  height: 300px;
`;

const Contact = () => {
  const form = useRef();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email || !name || !message || !subject) {
      return toast.error("Please fill the inputs", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }

    emailjs
      .sendForm(
        "service_thspbsb",
        "contact_form",
        form.current,
        "n9ZujbouD9q1Pl4Uy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Container>
      <ImageWrapper>
        <img src="public/assets/img.jpg" alt="img" />
      </ImageWrapper>
      <Form ref={form} onSubmit={sendEmail}>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="user_name"
        />
        <InputLabel>Subject</InputLabel>
        <Input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          name="subject"
        />
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="user_email"
        />
        <InputLabel>Message</InputLabel>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        <Button type="submit" value="Send" />
        <ToastContainer />
      </Form>
    </Container>
  );
};
export default Contact;
