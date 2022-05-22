import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !subject || !message) {
      return toast.error("Please fill the inputs", {
        position: "bottom-center",
        autoClose: 5000,
      });
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/email`, {
        email,
        subject,
        message,
      });
      toast.success(data.message);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.message && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Form Header</h1>
        <div>
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
          ></input>
        </div>
        <div>
          <label>Subject</label>
          <input
            onChange={(e) => setSubject(e.target.value)}
            type="text"
            name="subject"
          ></input>
        </div>
        <div>
          <label>Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name="message"
          ></textarea>
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Sending.." : "Submit"}
          </button>
        </div>{" "}
        <ToastContainer />
      </form>
    </div>
  );
};

export default ContactForm;
