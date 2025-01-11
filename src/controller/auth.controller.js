const pool = require("../DB/mysqlConnection");
const { generateOtp } = require("../utils/generateOTP");

const createAccount = async (req, res) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  try {
    const { username, email, password, confirm_password } = req.body;
    console.log(req.body);
    const validateEmail = emailRegex.test(email);
    if (!email || !password || !validateEmail || password.length < 6) {
      return res.render("signup", {
        message: "Please fill all the fields",
      });
    }

    // check if email exist or not
    const user = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("user: ", user);
    if (user[0].length > 0) {
      return res.render("signup", {
        message: "Email already exist",
      });
    }

    const otp = generateOtp();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    // create user
    const savedUser = await pool.query(
      "INSERT INTO users (username, email, password, verification_code, otp_expires) VALUES (?, ?, ?, ?, ?)",
      [username, email, password, otp, otpExpires]
    );
    console.log("savedUser: ", savedUser);

    res.redirect("/login");
  } catch (error) {
    console.log("sign up error", error);
  }
};

module.exports = { createAccount };
