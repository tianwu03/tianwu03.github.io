const themeToggle = document.querySelector(".theme-toggle");
const printButton = document.querySelector(".print-button");
const year = document.querySelector("#current-year");
const siteHeader = document.querySelector(".site-header");
const aboutSection = document.querySelector("#about");

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
  });
}

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

if (siteHeader && aboutSection) {
  let ticking = false;

  const updateHeaderState = () => {
    const triggerOffset = Math.min(window.innerHeight * 0.18, 180);
    const triggerPoint = aboutSection.offsetTop - triggerOffset;
    siteHeader.classList.toggle("is-floating", window.scrollY >= triggerPoint);
    ticking = false;
  };

  const requestHeaderUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
  window.addEventListener("resize", requestHeaderUpdate);
  window.addEventListener("hashchange", requestHeaderUpdate);
  window.addEventListener("pageshow", requestHeaderUpdate);
  window.addEventListener("load", requestHeaderUpdate);
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
