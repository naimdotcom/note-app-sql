const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.note_token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.render("login", { message: "Unauthorized" });
        }
        return decoded;
      }
    );

    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error);
    res.render("login", { message: "Unauthorized" });
  }
};

module.exports = { verifyJwt };
