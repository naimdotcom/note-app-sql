const pool = require("../DB/mysqlConnection");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const { generateOtp } = require("../utils/generateOTP");
const { SendMail } = require("../utils/mail");
const { generateToken } = require("../utils/tokens");

const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    let updatedNote;

    if (!user.id) {
      res.render("login", { message: "log in again" });
    }

    if ((!title, !content)) {
      res.render("index", { message: "title and content required" });
    }

    async function updateImages(content) {
      // Extract all <img src="..."> matches
      const matches = content.matchAll(/<img[^>]+src="([^">]+)"/g);

      // Convert matches into an array of Promises for processing
      const replacements = [];
      for (const match of matches) {
        const base64Data = match[1]; // Extract the src content
        const originalTag = match[0]; // Full <img> tag

        if (base64Data.startsWith("data:image")) {
          // Process the base64 image and upload it
          const imageUrl = await uploadOnCloudinary(base64Data);

          // Prepare a replacement for the <img> tag
          replacements.push({
            originalTag,
            newTag: `<img src="${imageUrl}">`,
          });
        }
      }

      // Replace the base64 images with uploaded URLs
      let updatedContent = content;
      replacements.forEach(({ originalTag, newTag }) => {
        updatedContent = updatedContent.replace(originalTag, newTag);
      });

      return updatedContent;
    }

    updateImages(content).then((Content) => {
      updatedNote = Content;
      console.log(updatedNote);
    });

    const [userInfo] = await pool.query("SELECT id FROM users WHERE id=?", [
      user.id,
    ]);

    if (userInfo.length === 0) {
      res.render("", { message: "user not found" });
    }

    const [createdNote] = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
      [userInfo[0].id, title, updatedNote]
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
