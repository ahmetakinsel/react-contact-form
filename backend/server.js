const express = require("express");
const dotenv = require("dotenv");
const mg = require("mailgun-js");

dotenv.config();

const mailgun = () => {
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
