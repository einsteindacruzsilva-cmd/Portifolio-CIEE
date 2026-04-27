const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const savedTheme = localStorage.getItem("preferred-theme");
const sectionsToReveal = document.querySelectorAll(".reveal");

function updateThemeUI(isDark) {
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Modo claro" : "Modo escuro";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark-theme", isDark);
  localStorage.setItem("preferred-theme", theme);
  updateThemeUI(isDark);
}

const preferredSystemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredSystemTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = body.classList.contains("dark-theme") ? "light" : "dark";
  applyTheme(nextTheme);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

sectionsToReveal.forEach((section) => revealObserver.observe(section));
