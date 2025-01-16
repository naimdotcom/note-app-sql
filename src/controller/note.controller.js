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
  } catch (error) {
    console.log("error in create note controller:", error);
    res.status(500).render("index", { message: "something went wrong" });
  }
};
