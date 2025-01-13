console.log("====================================");
console.log("Welcome to the index.js file");
console.log("====================================");

function setTheme(theme = "pink") {
  document.documentElement.setAttribute("data-theme", theme);
}

setTheme();
