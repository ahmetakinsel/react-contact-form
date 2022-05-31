import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const Form = styled.form`
  display: flex;
`;

const FormContent = styled.div`
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  padding: 25px;
`;

//className={classes.textField}

const useStyles = makeStyles({
  textField: {
    width: "550px",
    color: "#fff",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "5px",
      borderColor: "#fff",
    },
    "& label": { color: "#fff", fontSize: "16px" },
  },

  header: {
    color: "#fff",
    textTransform: "uppercase",
  },
});

// sx prop usage
/*
selecting specific input and label element
     sx={{
        color: "#fff",
         "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "10px",
              borderColor: "#fff",
          },
          "& label": { color: "#fff", fontSize: "16px" },
       }}
*/

// sx={{ ...textFieldStyle }}
// sx={buttonStyles}

const buttonStyles = {
  color: "#fff",
  width: "550px",
  fontWeight: "bold",
  borderColor: "#fff",
  "&:hover": {
    borderColor: "#000",
    background: "transparent",
  },
};

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
        autoClose: 4000,
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
            autoClose: 4000,
          });
          clearInputs();
        },
        (error) => {
          console.log(error.text);
          toast.error("Something went wrong please try again", {
            position: "bottom-center",
            autoClose: 4000,
          });
        }
      );
  };

  return (
    <>
      <div class="animation"></div>
      <div class="animation animation-2"></div>
      <div class="animation animation-3"></div>
      <Grid container direction="column" alignItems="center">
        <Form ref={form}>
          <Grid container direction="column" sx={{ padding: "25px" }}>
            <Typography variant="h4" className={classes.header} gutterBottom>
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
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "5px",
                      borderColor: "#fff",
                    },
                    "& .Mui-focused": {
                      borderRadius: "10px",
                      borderColor: "#fff",
                    },
                    "& label": { color: "#fff", fontSize: "16px" },
                  }}
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
                  type="message"
                  name="message"
                  value={message}
                  label="Message"
                  variant="outlined"
                  required
                  className={classes.textField}
                  error={messageError}
                  multiline
                  rows={5}
                />
              </FieldWrapper>
              <Button
                variant="outlined"
                sx={buttonStyles}
                type="submit"
                onClick={sendEmail}
              >
                Send
              </Button>

              <ToastContainer />
            </FormContent>
          </Grid>
        </Form>
      </Grid>
    </>
  );
};
export default Contact;
