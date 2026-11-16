// Gestion des thèmes
function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

// Gestion de la visibilité du switcher
function toggleSwitcher() {
  const switcher = document.getElementById("theme-switcher");
  if (!switcher) return;

  const isMinimized = switcher.classList.toggle("minimized");
  localStorage.setItem("theme-switcher-minimized", isMinimized);
}

// Charger thème et état du switcher depuis localStorage
(function () {
  const savedTheme = localStorage.getItem("theme") || "theme1";
  setTheme(savedTheme);

  document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.getElementById("theme-switcher");
    if (!switcher) return;

    const isMinimized = localStorage.getItem("theme-switcher-minimized") === "true";
    if (isMinimized) {
      switcher.classList.add("minimized");
    }
  });
})();
