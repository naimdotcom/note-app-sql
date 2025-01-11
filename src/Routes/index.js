const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./api/user.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", userRouter);

module.exports = app;
