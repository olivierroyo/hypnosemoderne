// Gestion des thèmes
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

// Charger thème depuis localStorage
(function () {
  const savedTheme = localStorage.getItem("theme") || "theme1";
  setTheme(savedTheme);
})();
