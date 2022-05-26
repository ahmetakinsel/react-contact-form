import React, { useRef, useState } from "react";
import * as emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const form = useRef();

  const [name, setName] = useState("user_name");
  const [email, setEmail] = useState("user_email");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email || !name || !message) {
      return toast.error("Please fill the inputs", {
        position: "bottom-center",
        autoClose: 5000,
      });
    } else {
      return toast.success("Your email has been sent", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
  };

  emailjs
    .sendForm(
      "service_thspbsb",
      "contact_form",
      "#contact-form",
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
  console.log(form.current, "wtfffffffffffffff");

  return (
    <form id="contact-form" onSubmit={sendEmail} ref={form}>
      <label>Name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="user_name"
      />
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="user_email"
      />
      <label>Message</label>
      <textarea onChange={(e) => setMessage(e.target.value)} name="message" />
      <input type="submit" value="Send" />
      <ToastContainer />
    </form>
  );
};

export default ContactUs;
