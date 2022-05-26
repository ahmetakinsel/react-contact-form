import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import img from "./img/img.jpg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const ImageWrapper = styled.div`
  display: flex;
  padding: 5px;
`;

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
    <>
      <Container>
        <ImageWrapper>
          <img src={img} alt="img" width="615px" height="100%" />
        </ImageWrapper>
        <Form ref={form}>
          <FormFields>
            <h1>Contact</h1>
            <FieldWrapper>
              <LabelWrapper>
                <InputLabel>Name</InputLabel>
              </LabelWrapper>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="user_name"
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
              />
            </FieldWrapper>
            <FieldWrapper>
              <LabelWrapper>
                <InputLabel>Message</InputLabel>
              </LabelWrapper>
              <TextField
                onChange={(e) => setMessage(e.target.value)}
                name="message"
              />
            </FieldWrapper>
            <Button type="submit" onClick={sendEmail}>
              Send
            </Button>
            <ToastContainer />
          </FormFields>
        </Form>
      </Container>
    </>
  );
};
export default Contact;
