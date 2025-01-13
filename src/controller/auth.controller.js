const pool = require("../DB/mysqlConnection");
const { generateOtp } = require("../utils/generateOTP");
const { SendMail } = require("../utils/mail");
const { OtpEmailTemplate } = require("../utils/mailTemplate");
const { emailRegex } = require("../utils/regex");
const { generateToken } = require("../utils/tokens");

const createAccount = async (req, res) => {
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

    if (!user) {
      return res.render("otp", { message: "User not found" });
    }

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
      "UPDATE users SET verification_code = NULL, otp_expires = NULL, isverified = 1 WHERE id = ?",
      [user.id]
    );

    console.log("updatedUser: ", updatedUser);
    const token = generateToken({ id: user.id });
    res.cookie("note_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.redirect("/login");
  } catch (error) {
    console.log("verify otp error", error);
    res.render("otp", { message: "something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password || !emailRegex.test(email) || password.length < 6) {
      return res.render("login", { message: "All fields are required" });
    }

    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("user: ", user);

    if (user.length < 1) {
      return res.render("login", { message: "Invalid email or password" });
    }

    if (user[0].isverified !== 1) {
      const otp = generateOtp();
      const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      const token = generateToken({ id: user[0].id });
      await pool
        .query(
          "UPDATE users SET verification_code = ?, otp_expires = ? WHERE id = ?",
          [otp, otpExpires, user[0].id]
        )
        .then(() => {
          SendMail(
            OtpEmailTemplate(user[0].username, otp, otpExpires), // 10 minutes
            email,
            "OTP Verification"
          );
          res.cookie("note_token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
          res.render("otp", {
            message: "Email is not verified, check your email",
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("login", { message: "something went wrong" });
        });

      return;
    }

    const token = generateToken(user[0].id);
    console.log("token: ", token);

    res.cookie("note_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("/");
  } catch (error) {
    console.log("controller login error", error);
    res.render("login", { message: "something went wrong" });
  }
};

module.exports = { createAccount, verifyOtp, login };
