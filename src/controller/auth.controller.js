const createAccount = async (req, res) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  try {
    const { name, email, password, confirm_password } = req.body;
    console.log(req.body);
    const validateEmail = emailRegex.test(email);
    if (!email || !password || !validateEmail || password.length < 6) {
      return res.render("signup", {
        message: "Please fill all the fields",
      });
    }
    res.redirect("/login");
  } catch (error) {
    console.log("sign up error", error);
  }
};

module.exports = { createAccount };
