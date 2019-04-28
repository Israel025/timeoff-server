const express = require("express");
const port = 6010;
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const app = express();
// const cors = require('cors');

mongoose.connect("mongodb://localhost:27017/timeoff-db").then(() => {
  console.log("DB Connection Successful");
})
.catch(err => {
  console.log("DB connection failed!", err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', UserRoute);

app.listen(port).on("listening", () => {
  console.log(`Server running on ${port}`);
});