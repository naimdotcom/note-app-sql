const pool = require("../DB/mysqlConnection");
const { generateOtp } = require("../utils/generateOTP");
const { SendMail } = require("../utils/mail");
const { generateToken } = require("../utils/tokens");

const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    if (!user.id) {
      res.render("login", { message: "log in again" });
    }

    if ((!title, !content)) {
      res.render("index", { message: "title and content required" });
    }

    const [userInfo] = await pool.query("SELECT id FROM users WHERE id=?", [
      user.id,
    ]);

    if (userInfo.length === 0) {
      res.render("", { message: "user not found" });
    }

    const [createdNote] = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
      [userInfo[0].id, title, content]
    );

    if (createdNote.length == 0)
      res.render("index", {
        message: "something went wrong while creating note, try again",
      });

    const token = generateToken(userInfo[0].id);
    res.cookie("note_token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("/");
  } catch (error) {
    console.log("error in create note controller:", error);
    res.status(500).render("index", { message: "something went wrong" });
  }
};

module.exports = { CreateNote };
