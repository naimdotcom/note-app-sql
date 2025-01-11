const crypto = require("crypto");

const generateOtp = () => {
  const otp = crypto.randomInt(100000, 999999);
  console.log(otp);

  return otp;
};

module.exports = { generateOtp };
