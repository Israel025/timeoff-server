const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const LeaveRequestRoute = require("./routes/LeaveRequestRoute");
const env = require("./env");
const port = env.port;
const app = express();

app.use(cors());

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

mongoose
  .connect(env.mongodb_url, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch(err => {
    console.log("DB connection failed!", err);
  });



app.use((req, res, next) => {
  console.log(`$[${new Date().toTimeString()}]: ${req.method} ${req.url}`);

  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/user", UserRoute);

app.use("/leave",
cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}), LeaveRequestRoute);

app.listen(port).on("listening", () => {
  console.log(`Server running on ${port}`);
});
