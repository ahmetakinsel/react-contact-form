import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import img from "./images/img.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const ImageWrapper = styled.div`
  display: flex;
  padding: 5px;
`;
const Header = styled.h1``;

const Form = styled.form`
  display: flex;
`;

const FormFields = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
`;

const FieldWrapper = styled.div``;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px 10px 0px;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 550px;
  height: 35px;
`;

const Button = styled.button`
  width: 558px;
  height: 35px;
`;

const TextField = styled.textarea`
  width: 550px;
  height: 250px;
  margin-bottom: 25px;
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
      return toast.warning("Please fill the inputs", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }

    const clearInputs = () => {
      setName("");
      setSubject("");
      setEmail("");
      setMessage("");
    };

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.success("Your email has been sent", {
            position: "bottom-center",
            autoClose: 5000,
          });
          clearInputs();
        },
        (error) => {
          console.log(error.text);
          toast.error("Something went wrong please try again", {
            position: "bottom-center",
            autoClose: 5000,
          });
        }
      );
  };

  return (
    <>
      <Container>
        <ImageWrapper>
          <img
            src={img}
            alt="img"
            style={{
              width: "615px",
              height: "100%",
              borderRadius: "5px",
            }}
          />
        </ImageWrapper>
        <Form ref={form}>
          <FormFields>
            <Header>Contact</Header>
            <FieldWrapper>
              <LabelWrapper>
                <InputLabel>Name</InputLabel>
              </LabelWrapper>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="user_name"
                value={name}
              />
            </FieldWrapper>
            <FieldWrapper>
              <LabelWrapper>
                <InputLabel>Subject</InputLabel>
              </LabelWrapper>
              <Input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                name="subject"
                value={subject}
              />
            </FieldWrapper>
            <FieldWrapper>
              <LabelWrapper>
                <InputLabel>Email</InputLabel>
              </LabelWrapper>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="user_email"
                value={email}
              />
            </FieldWrapper>
            <FieldWrapper>
              <LabelWrapper>
                <InputLabel>Message</InputLabel>
              </LabelWrapper>
              <TextField
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                value={message}
              />
            </FieldWrapper>
            <Button type="submit" onClick={sendEmail}>
              Send Email
            </Button>
            <ToastContainer />
          </FormFields>
        </Form>
      </Container>
    </>
  );
};
export default Contact;
