const express = require("express");
const pool = require("./db");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Constants
const PORT = process.env.PORT ?? 8080;
const HOST = "0.0.0.0";
const public = __dirname + "/../public/";

// App
const app = express();
app.use(express.json());

app.use("/", express.static(public));

app.get("/", (req, res) => {
  res.sendFile(public);
});

app.post("/send", (req, res) => {
  console.log("jiofjeifje" + req.body.name)
  const msg = {
    to: 'dsrcacc@gmail.com', // Change to your recipient
    from: 'dsrcacc@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'Message: ' + req.body.message + '\nName: ' + req.body.name + '\nEmail: ' + req.body.email,
    html: 'Message: ' + req.body.message + '\nName: ' + req.body.name + '\nEmail: ' + req.body.email
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);