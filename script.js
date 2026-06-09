const GITHUB_USERNAME = "tianwu03";
const projectGrid = document.querySelector("#project-grid");
const themeToggle = document.querySelector(".theme-toggle");

document.querySelector("#current-year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

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

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProjects(repositories) {
  const visibleRepositories = repositories
    .filter((repository) => !repository.fork)
    .slice(0, 6);

  if (visibleRepositories.length === 0) {
    projectGrid.innerHTML = `
      <article class="project-card project-placeholder">
        <p class="project-index">COMING SOON</p>
        <h3>第一个公开项目正在路上</h3>
        <p>当 GitHub 上出现公开仓库后，这里会自动展示最新项目。</p>
      </article>
    `;
    return;
  }

  projectGrid.innerHTML = visibleRepositories
    .map(
      (repository, index) => `
        <a
          class="project-card"
          href="${escapeHtml(repository.html_url)}"
          target="_blank"
          rel="noreferrer"
        >
          <p class="project-index">PROJECT ${String(index + 1).padStart(2, "0")}</p>
          <h3>${escapeHtml(repository.name)}</h3>
          <p>${escapeHtml(repository.description || "这个项目暂时还没有简介。")}</p>
          <div class="project-meta">
            <span class="language">${escapeHtml(repository.language || "Repository")}</span>
            <span>★ ${repository.stargazers_count}</span>
          </div>
        </a>
      `,
    )
    .join("");
}

async function loadProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=owner`,
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    renderProjects(await response.json());
  } catch (error) {
    projectGrid.innerHTML = `
      <article class="project-card project-placeholder">
        <p class="project-index">GITHUB</p>
        <h3>项目暂时无法加载</h3>
        <p>你仍然可以通过页面中的 GitHub 链接查看全部项目。</p>
      </article>
    `;
    console.error(error);
  }
}

loadProjects();
