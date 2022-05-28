import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "./styles.css";
import { Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  textField: {
    width: "550px",
  },
  textArea: {
    width: "550px",
    height: "150px",
    borderColor: "1px solid #fff",
  },
  header: {
    color: "#fff",
  },
  btn: {
    fontSize: 50,
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

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

const Contact = () => {
  const form = useRef();
  const classes = useStyles();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (email || name || message || subject === "") {
      setNameError(true);
      setEmailError(true);
      setSubjectError(true);
      setMessageError(true);
    }

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
            <Typography variant="h4" gutterBottom className={classes.header}>
              Contact
            </Typography>
            <FormContent>
              <FieldWrapper>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="user_name"
                  value={name}
                  variant="outlined"
                  label="Name"
                  required
                  className={classes.textField}
                  error={nameError}
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
                  required
                  className={classes.textField}
                  error={subjectError}
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
                  required
                  className={classes.textField}
                  error={emailError}
                />
              </FieldWrapper>
              <FieldWrapper>
                <TextField
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  value={message}
                  label="Message"
                  variant="outlined"
                  multiline={true}
                  rows={5}
                  defaultValue="Default Value"
                  className={classes.textArea}
                  error={messageError}
                />
              </FieldWrapper>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  width: "550px",
                  fontWeight: "bold",
                  borderColor: "#fff",
                }}
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
