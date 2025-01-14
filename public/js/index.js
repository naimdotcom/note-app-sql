/**
 * Toggle the theme
 * @param {string} theme - The theme to toggle to
 */
function toggleTheme(theme) {
  // Save the selected theme to local storage
  localStorage.setItem("theme", theme);

  // Apply the saved theme to the document
  setTheme();
}

/**
 * Set the theme
 */
function setTheme() {
  const theme = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-theme", theme);
}
setTheme();
