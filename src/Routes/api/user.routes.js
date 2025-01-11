const express = require("express");
const { createAccount } = require("../../controller/auth.controller");

const _ = express.Router();

_.route("/sign-up")
  .get((req, res) => {
    res.render("signup");
  })
  .post(createAccount);

_.route("/login").get((req, res) => {
  res.render("login");
});

_.route("/otp").get((req, res) => {
  res.render("otp");
});

module.exports = _;
