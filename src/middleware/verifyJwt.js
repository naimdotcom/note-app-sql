const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.note_token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { verifyJwt };
