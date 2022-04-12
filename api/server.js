const express = require("express");
const pool = require("./db");

// Constants
const PORT = process.env.PORT ?? 8080;
const HOST = "0.0.0.0";
const public = __dirname + "/../";

// App
const app = express();

app.use("/", express.static(public));

app.get("/", (req, res) => {
  res.sendFile(public);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);