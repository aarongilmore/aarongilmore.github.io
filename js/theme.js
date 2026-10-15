(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");

  if (!toggle) return;

  const render = () => {
    const isDark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    render();
  });

  render();
})();
