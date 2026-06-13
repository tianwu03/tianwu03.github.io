const printButton = document.querySelector(".print-button");
const year = document.querySelector("#current-year");
const siteHeader = document.querySelector(".site-header");
const aboutSection = document.querySelector("#about");
const siteNav = document.querySelector(".site-nav");
const soundControl = document.querySelector(".sound-control");
const soundToggle = document.querySelector(".sound-toggle");
const soundSlider = document.querySelector(".sound-slider");
const soundValue = document.querySelector(".sound-value");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.scrollY < 80) {
  document.body.classList.add("is-booting");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.body.classList.add("is-booted");
      window.setTimeout(() => document.body.classList.remove("is-booting"), 1750);
    });
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

let audioContext;
let soundMuted = localStorage.getItem("sound-muted") === "true";
let soundVolume = Number(localStorage.getItem("sound-volume") ?? 24);
if (!Number.isFinite(soundVolume)) soundVolume = 24;

const updateSoundControl = () => {
  soundVolume = Math.min(100, Math.max(0, soundVolume));

  if (soundControl) {
    soundControl.style.setProperty("--sound-level", `${soundVolume}%`);
  }
  if (soundSlider) {
    soundSlider.value = String(soundVolume);
  }
  if (soundValue) {
    soundValue.textContent = soundMuted ? "OFF" : String(Math.round(soundVolume));
  }
  if (soundToggle) {
    soundToggle.setAttribute("aria-pressed", String(soundMuted));
  }
};

const playInterfaceTone = (frequency = 220, duration = 0.055) => {
  if (soundMuted || soundVolume <= 0) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext ??= new AudioContextClass();
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.35, now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime((soundVolume / 100) * 0.045, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.01);
};

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundMuted = !soundMuted;
    localStorage.setItem("sound-muted", String(soundMuted));
    updateSoundControl();
    if (!soundMuted) playInterfaceTone(260, 0.07);
  });
}

if (soundSlider) {
  soundSlider.addEventListener("input", () => {
    soundVolume = Number(soundSlider.value);
    soundMuted = soundVolume === 0;
    localStorage.setItem("sound-volume", String(soundVolume));
    localStorage.setItem("sound-muted", String(soundMuted));
    updateSoundControl();
  });
  soundSlider.addEventListener("change", () => playInterfaceTone(300, 0.065));
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
  if (!event.target.closest(".sound-slider")) {
    createClickSparks(event.clientX, event.clientY);
  }

  const interactive = event.target.closest("a, button");
  if (!interactive || interactive === soundToggle) return;
  playInterfaceTone(interactive.matches(".button, .print-button") ? 180 : 235);
});

updateSoundControl();

if (siteNav && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const navLinks = [...siteNav.querySelectorAll("a")];

  const resetDock = () => {
    navLinks.forEach((link) => link.style.setProperty("--dock-scale", "1"));
  };

  siteNav.addEventListener("pointermove", (event) => {
    navLinks.forEach((link) => {
      const rect = link.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const proximity = Math.max(0, 1 - distance / 125);
      link.style.setProperty("--dock-scale", String(1 + proximity * 0.22));
    });
  });
  siteNav.addEventListener("pointerleave", resetDock);
  navLinks.forEach((link) => {
    link.addEventListener("focus", () => link.style.setProperty("--dock-scale", "1.18"));
    link.addEventListener("blur", resetDock);
  });
}

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const glowTargets = document.querySelectorAll(
    ".board-visual, .expertise-card, .resume-shell, .education-entry, .interest-row, .contact-panel",
  );
  let activeGlowTarget;

  const clearGlow = (target) => {
    target.style.setProperty("--edge-opacity", "0");
    target.classList.remove("is-edge-active");
  };

  glowTargets.forEach((target) => {
    const edgeLight = document.createElement("span");
    edgeLight.className = "pointer-edge-light";
    edgeLight.setAttribute("aria-hidden", "true");
    target.classList.add("edge-glow");
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
      const sensitivity = Math.min(190, Math.max(78, Math.min(rect.width, rect.height) * 0.42));
      const proximity = Math.max(0, Math.min(1, 1.15 - edgeDistance / sensitivity));

      target.style.setProperty("--edge-x", `${x}px`);
      target.style.setProperty("--edge-y", `${y}px`);
      target.style.setProperty("--edge-opacity", proximity.toFixed(3));
      target.classList.toggle("is-edge-active", proximity > 0.04);
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
