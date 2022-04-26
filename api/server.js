const express = require("express");
const pool = require("./db");
const sgMail = require("@sendgrid/mail");
const htmlEncoder = require("html-encoder-decoder");


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
  userName = htmlEncoder.encode(req.body.name);
  userEmail = htmlEncoder.encode(req.body.email);
  userMessage = htmlEncoder.encode(req.body.message);
  userDataSet = htmlEncoder.encode(req.body.dataset);
  var htmlBody = "Incoming DSRC Request: <br></br>"+
                 "Name: " + userName + "<br></br>" +
                 "Email: " + userEmail + "<br></br>" +
                 "DataSet: " + userDataSet + "<br></br>" +
                 "Message: " + userMessage + "<br></br>"
  const msg = {
    to: "dsrcrpi@gmail.com",
    from: "dsrcrpi@gmail.com",
    subject: "DSRC Email Request from " + req.body.email,
    text: "Incoming DSRC Request: " + "Message: " + req.body.message + "\r\nName: " + req.body.name + "\r\nEmail: " + req.body.email + "\r\nDataSet: " + req.body.dataset,
    html: htmlBody
  }
  sgMail
    .send(msg)
    .catch((error) => {
      console.error(error)
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);