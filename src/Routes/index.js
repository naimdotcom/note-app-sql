const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./api/user.routes");

app.use(
  cors({
    origin: `http://localhost:${process.env.PORT || 4040}`,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", userRouter);

module.exports = app;
