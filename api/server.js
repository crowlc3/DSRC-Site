const express = require("express");
const pool = require("./db");

const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

// Constants
const PORT = process.env.PORT ?? 8080;
const HOST = "0.0.0.0";
const public = __dirname + "/../public/";

// App
const app = express();

app.use("/", express.static(public));

app.get("/", (req, res) => {
  res.sendFile(public);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "dsrcacc@gmail.com",
      pass: "dsrc1234"
  }
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/pages/send", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      to: "aidanlane7@gmail.com",
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);