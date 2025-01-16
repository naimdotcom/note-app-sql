const express = require("express");
const { verifyJwt } = require("../middleware/verifyJwt");
const { CreateNote } = require("../controller/note.controller");

const _ = express.Router();

_.route("/").post(CreateNote);

module.exports = _;
