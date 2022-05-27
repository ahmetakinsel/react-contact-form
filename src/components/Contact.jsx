import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "./styles.css";
import { Button, TextField } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
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
const FormContent = styled.div`
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  padding: 25px;
`;

const Header = styled.h1`
  color: #fff;
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
        () => {
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
      <div class="animation"></div>
      <div class="animation animation-2"></div>
      <div class="animation animation-3"></div>
      <Container>
        <Form ref={form}>
          <FormFields>
            <Header>Contact</Header>
            <FormContent>
              <FieldWrapper>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="user_name"
                  value={name}
                  label="Name"
                  variant="outlined"
                  style={{ width: "550px", fontSize: "1px" }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  onChange={(e) => setSubject(e.target.value)}
                  type="text"
                  name="subject"
                  value={subject}
                  label="Subject"
                  variant="outlined"
                  style={{ width: "550px" }}
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="user_email"
                  value={email}
                  label="Email"
                  variant="outlined"
                  style={{ width: "550px" }}
                  autoFocus={false}
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  value={message}
                  label="Message"
                  variant="outlined"
                  sx={{ width: "550px", height: "150px" }}
                  multiline={true}
                  rows={5}
                  defaultValue="Default Value"
                />
              </FieldWrapper>
              <Button
                variant="outlined"
                style={{ color: "#fff", width: "550px", fontWeight: "bold" }}
                type="submit"
                onClick={sendEmail}
              >
                Send
              </Button>

              <ToastContainer />
            </FormContent>
          </FormFields>
        </Form>
      </Container>
    </>
  );
};
export default Contact;
