const express = require("express");
const {
  createAccount,
  verifyOtp,
  login,
} = require("../../controller/auth.controller");
const { verifyJwt } = require("../../middleware/verifyJwt");

const _ = express.Router();

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

module.exports = _;
