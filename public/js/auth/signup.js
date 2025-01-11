const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const errorMessage = document.getElementById("error-message");
const username = document.getElementById("username");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

form.addEventListener("submit", async (e) => {
  const validateEmail = emailRegex.test(email.value);
  errorMessage.innerHTML = "";

  if (!email.value || !password.value || !username.value)
    errorMessage.innerHTML = `<span>Please fill all the fields</span>`;
  else {
    if (!validateEmail) emailError.innerHTML = `<span>Invalid email</span>`;
    if (password.value.length < 6)
      passwordError.innerHTML = `<span>Password too short</span>`;
  }

  if (
    !email.value ||
    !password.value ||
    !validateEmail ||
    password.value.length < 6
  ) {
    e.preventDefault();
  }
  console.log(" form submitted");
});
