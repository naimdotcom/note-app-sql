const jwt = require("jsonwebtoken");

const generateToken = (info) => {
  const token = jwt.sign({ ...info }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = { generateToken };
