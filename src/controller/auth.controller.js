const pool = require("../DB/mysqlConnection");
const { generateOtp } = require("../utils/generateOTP");
const { SendMail } = require("../utils/mail");
const { OtpEmailTemplate } = require("../utils/mailTemplate");
const { generateToken } = require("../utils/tokens");

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
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // create user
    const [savedUser] = await pool.query(
      "INSERT INTO users (username, email, password, verification_code, otp_expires) VALUES (?, ?, ?, ?, ?)",
      [username, email, password, otp, otpExpires]
    );

    console.log("savedUser: ", savedUser.insertId);

    const token = generateToken({ id: savedUser.insertId });

    const mail = SendMail(
      OtpEmailTemplate(username, otp, otpExpires),
      email,
      "OTP Verification"
    );

    console.log("token ", token);

    res.cookie("note_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.redirect("/otp");
    return;
  } catch (error) {
    console.log("sign up error", error);
    res.render("signup", {
      message: "Something went wrong",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    console.log("user: ", user);

    if (otp.length < 6) {
      return res.render("otp", { message: "Please enter a valid otp" });
    }

    const [userInfo] = await pool.query("SELECT * FROM users WHERE id = ?", [
      user.id,
    ]);

    console.log("userInfo: ", userInfo);

    if (userInfo.length < 1) {
      return res.render("otp", { message: "User not found" });
    }

    if (Number(otp) !== userInfo[0].verification_code) {
      return res.render("otp", { message: "Invalid OTP" });
    }

    if (Date.now() >= userInfo[0].otp_expires) {
      console.log("OTP has expired", Date.now(), userInfo[0].otp_expires);
      return res.render("otp", { message: "OTP has expired" });
    }

    const [updatedUser] = await pool.query(
      "UPDATE users SET verification_code = NULL, otp_expires = NULL WHERE id = ?",
      [user.id]
    );

    console.log("updatedUser: ", updatedUser);

    res.redirect("/login");
  } catch (error) {
    console.log("verify otp error", error);
    res.render("otp", { message: "something went wrong" });
  }
};

module.exports = { createAccount, verifyOtp };
