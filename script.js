const printButton = document.querySelector(".print-button");
const year = document.querySelector("#current-year");
const siteHeader = document.querySelector(".site-header");
const aboutSection = document.querySelector("#about");
const siteNav = document.querySelector(".site-nav");
const musicControl = document.querySelector(".music-control");
const musicToggle = document.querySelector(".music-toggle");
const musicSlider = document.querySelector(".music-slider");
const musicValue = document.querySelector(".music-value");
const backgroundAudio = document.querySelector(".background-audio");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const syncPixelAlignedTypography = () => {
  const pixelRatio = window.devicePixelRatio || 1;
  const sizes = window.innerWidth >= 1600
    ? { xs: 13, sm: 15, base: 18 }
    : { xs: 12, sm: 14, base: 16 };
  const alignToDevicePixel = (size) => Math.round(size * pixelRatio) / pixelRatio;

  Object.entries(sizes).forEach(([name, size]) => {
    document.documentElement.style.setProperty(`--text-${name}`, `${alignToDevicePixel(size)}px`);
  });
};

syncPixelAlignedTypography();
window.addEventListener("resize", syncPixelAlignedTypography);

if (!reduceMotion && window.scrollY < 80) {
  document.body.classList.add("is-booting");
  let bootStarted = false;
  const startBoot = () => {
    if (bootStarted) return;
    bootStarted = true;
    document.body.classList.add("is-booted");
    window.setTimeout(() => {
      document.body.classList.remove("is-booting", "is-booted");
    }, 1750);
  };

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(startBoot);
  });
  window.setTimeout(startBoot, 160);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

let musicVolume = 0;
let lastAudibleVolume = Number(localStorage.getItem("music-volume") ?? 24);
if (!Number.isFinite(lastAudibleVolume) || lastAudibleVolume <= 0) lastAudibleVolume = 24;

const updateMusicControl = (status) => {
  musicVolume = Math.min(100, Math.max(0, musicVolume));
  const isPlaying = Boolean(backgroundAudio && !backgroundAudio.paused && !backgroundAudio.muted && musicVolume > 0);

  if (musicControl) {
    musicControl.style.setProperty("--music-level", `${musicVolume}%`);
    musicControl.classList.toggle("is-playing", isPlaying);
    musicControl.classList.toggle("is-unavailable", status === "NETEASE");
  }
  if (musicSlider) {
    musicSlider.value = String(musicVolume);
  }
  if (musicValue) {
    musicValue.textContent = status ?? (musicVolume === 0 ? "MUTE" : `${Math.round(musicVolume)}%`);
  }
  if (musicToggle) {
    musicToggle.textContent = isPlaying ? "PAUSE" : "PLAY";
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? "暂停背景音乐" : "播放背景音乐");
  }
};

const playBackgroundMusic = async () => {
  if (!backgroundAudio) return;

  if (musicVolume <= 0) {
    musicVolume = lastAudibleVolume;
  }
  backgroundAudio.volume = musicVolume / 100;
  backgroundAudio.muted = false;

  try {
    await backgroundAudio.play();
    updateMusicControl();
  } catch (error) {
    backgroundAudio.muted = true;
    updateMusicControl(error?.name === "NotAllowedError" ? "CLICK" : "NETEASE");
  }
};

if (backgroundAudio) {
  backgroundAudio.muted = true;
  backgroundAudio.volume = 0;
  backgroundAudio.addEventListener("play", () => updateMusicControl());
  backgroundAudio.addEventListener("pause", () => updateMusicControl());
  backgroundAudio.addEventListener("error", () => updateMusicControl("NETEASE"));
}

if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (!backgroundAudio) return;

    if (!backgroundAudio.paused && !backgroundAudio.muted) {
      backgroundAudio.pause();
      backgroundAudio.muted = true;
      updateMusicControl();
      return;
    }
    void playBackgroundMusic();
  });
}

if (musicSlider) {
  musicSlider.addEventListener("input", () => {
    musicVolume = Number(musicSlider.value);
    if (musicVolume > 0) {
      lastAudibleVolume = musicVolume;
      localStorage.setItem("music-volume", String(lastAudibleVolume));
      void playBackgroundMusic();
    } else if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.muted = true;
      backgroundAudio.volume = 0;
      updateMusicControl();
    }
  });
}

const createClickSparks = (x, y) => {
  if (reduceMotion) return;

  const fragment = document.createDocumentFragment();
  const sparkCount = 10 + Math.floor(Math.random() * 7);

  for (let index = 0; index < sparkCount; index += 1) {
    const spark = document.createElement("span");
    const angle = Math.random() * 360;
    const distance = 28 + Math.random() * 52;
    const length = 7 + Math.random() * 18;
    const width = 2 + Math.random() * 2;
    const duration = 430 + Math.random() * 360;
    const isWhite = Math.random() < 0.38;

    spark.className = "click-spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--spark-angle", `${angle}deg`);
    spark.style.setProperty("--spark-distance", `${distance}px`);
    spark.style.setProperty("--spark-length", `${length}px`);
    spark.style.setProperty("--spark-width", `${width}px`);
    spark.style.setProperty("--spark-duration", `${duration}ms`);
    spark.style.setProperty("--spark-color", isWhite ? "#ffffff" : "#ff2a2a");
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
    fragment.append(spark);
  }
  document.body.append(fragment);
};

document.addEventListener("click", (event) => {
  if (!event.target.closest(".music-slider")) {
    createClickSparks(event.clientX, event.clientY);
  }
});

updateMusicControl();

const gradientFrameTargets = document.querySelectorAll(
  [
    ".board-visual",
    ".resume-shell",
    ".contact-panel",
  ].join(", "),
);

gradientFrameTargets.forEach((target) => {
  if (target.querySelector(":scope > .static-gradient-border")) return;
  const border = document.createElement("span");
  border.className = "static-gradient-border";
  border.setAttribute("aria-hidden", "true");
  target.classList.add("gradient-frame");
  target.append(border);
});

if (siteNav && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const navLinks = [...siteNav.querySelectorAll("a")];

  const resetDock = () => {
    navLinks.forEach((link) => link.style.setProperty("--dock-scale", "1"));
  };

  siteNav.addEventListener("pointermove", (event) => {
    siteNav.classList.add("is-dock-active");
    navLinks.forEach((link) => {
      const rect = link.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const proximity = Math.max(0, 1 - distance / 125);
      link.style.setProperty("--dock-scale", String(1 + proximity * 0.22));
    });
  });
  siteNav.addEventListener("pointerleave", () => {
    siteNav.classList.remove("is-dock-active");
    resetDock();
  });
  navLinks.forEach((link) => {
    link.addEventListener("focus", () => {
      siteNav.classList.add("is-dock-active");
      link.style.setProperty("--dock-scale", "1.18");
    });
    link.addEventListener("blur", () => {
      siteNav.classList.remove("is-dock-active");
      resetDock();
    });
  });
}

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const glowTargets = document.querySelectorAll(
    ".board-visual, .expertise-card, .resume-shell, .interest-row, .contact-panel",
  );
  let activeGlowTarget;

  const clearGlow = (target) => {
    target.style.setProperty("--edge-opacity", "0");
    target.style.setProperty("--surface-opacity", "0");
    target.classList.remove("is-edge-active");
  };

  glowTargets.forEach((target) => {
    const surfaceLight = document.createElement("span");
    surfaceLight.className = "pointer-surface-light";
    surfaceLight.setAttribute("aria-hidden", "true");
    const edgeLight = document.createElement("span");
    edgeLight.className = "pointer-edge-light";
    edgeLight.setAttribute("aria-hidden", "true");
    target.classList.add("edge-glow");
    target.append(surfaceLight);
    target.append(edgeLight);

    target.addEventListener("pointermove", (event) => {
      if (activeGlowTarget && activeGlowTarget !== target) {
        clearGlow(activeGlowTarget);
      }
      activeGlowTarget = target;

      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const edgeDistance = Math.min(x, y, rect.width - x, rect.height - y);
      const centerDistance = Math.max(1, Math.min(rect.width, rect.height) / 2);
      const edgeRatio = Math.min(1, edgeDistance / centerDistance);
      const proximity = 0.24 + Math.pow(1 - edgeRatio, 1.7) * 0.76;
      const surfaceOpacity = 0.32 + proximity * 0.24;
      const glowRadius = Math.max(460, edgeDistance * 3 + 300);

      target.style.setProperty("--edge-x", `${x}px`);
      target.style.setProperty("--edge-y", `${y}px`);
      target.style.setProperty("--edge-radius", `${glowRadius}px`);
      target.style.setProperty("--edge-opacity", proximity.toFixed(3));
      target.style.setProperty("--surface-opacity", surfaceOpacity.toFixed(3));
      target.classList.add("is-edge-active");
    });

    target.addEventListener("pointerleave", () => {
      clearGlow(target);
      if (activeGlowTarget === target) {
        activeGlowTarget = undefined;
      }
    });
  });
}

if (siteHeader && aboutSection) {
  let ticking = false;
  let isFloating = siteHeader.classList.contains("is-floating");

  const updateHeaderState = () => {
    const triggerOffset = Math.min(window.innerHeight * 0.18, 180);
    const triggerPoint = aboutSection.offsetTop - triggerOffset;
    const releasePoint = triggerPoint - 80;

    if (!isFloating && window.scrollY >= triggerPoint) {
      isFloating = true;
      siteHeader.classList.add("is-floating");
    } else if (isFloating && window.scrollY <= releasePoint) {
      isFloating = false;
      siteHeader.classList.remove("is-floating");
    }

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
