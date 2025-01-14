const express = require("express");
const {
  createAccount,
  verifyOtp,
  login,
} = require("../../controller/auth.controller");
const { verifyJwt } = require("../../middleware/verifyJwt");
const { THEMES } = require("../../Constants/theme");

const _ = express.Router();

_.route("/").get(verifyJwt, (req, res) => {
  if (!req.user) {
    return res.render("login", { message: "Unauthorized" });
  }
  res.render("index");
});

_.route("/sign-up")
  .get((req, res) => {
    res.render("signup");
  })
  .post(createAccount);

_.route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(login);

_.route("/otp")
  .get((req, res) => {
    res.render("otp");
  })
  .post(verifyJwt, verifyOtp);

_.route("/settings").get((req, res) => {
  res.render("settings", {
    THEMES: THEMES,
    theme: "dark",
  });
});

_.route("/reset-password").get((req, res) => {
  res.render("reset_password");
});

module.exports = _;
