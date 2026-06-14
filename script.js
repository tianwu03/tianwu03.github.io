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
const musicTitle = document.querySelector(".music-meta strong");
const musicLink = document.querySelector(".music-meta");
const previousTrackButton = document.querySelector(".music-previous");
const nextTrackButton = document.querySelector(".music-next");
const languageToggle = document.querySelector(".language-toggle");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const translationPairs = new Map(Object.entries({
  "顾峥": "Gu Zheng",
  "个人介绍": "Profile",
  "专业能力": "Expertise",
  "简历": "Resume",
  "打印简历": "Print Resume",
  "把复杂电路，": "TURN COMPLEX CIRCUITS",
  "做成可靠产品。": "INTO RELIABLE PRODUCTS.",
  "，硬件开发工程师，现就职于上海极洞科技有限公司。 专注芯片级硬件开发、多传感器融合与高密度互连设计，覆盖方案调研、原理图、 8层2阶 / 10层3阶 HDI、制板对接、装配协同及调试验证。": ", a hardware development engineer at Shanghai Jidong Technology Co., Ltd. Focused on chip-level hardware, multi-sensor fusion, and high-density interconnect design, covering research, schematics, 8-layer 2-step / 10-layer 3-step HDI, fabrication coordination, assembly, and validation.",
  "查看个人简历": "VIEW RESUME",
  "芯片级开发": "CHIP-LEVEL DESIGN",
  "高阶 HDI": "ADVANCED HDI",
  "多传感器融合": "SENSOR FUSION",
  "擅长拆解复杂问题，通过清晰的架构、扎实的电路设计和充分验证， 将想法逐步推进为能够稳定工作的真实产品。": "Complex problems are decomposed through clear architecture, rigorous circuit design, and thorough validation, turning ideas into stable, production-ready products.",
  "重视设计背后的逻辑：从芯片选型、电源树、HDI 层叠与高速信号，到 DFM、机械装配和系统联调， 持续关注可制造性、可测试性、可靠性与后续维护。": "Engineering decisions are considered end to end: from component selection, power trees, HDI stackups, and high-speed signals to DFM, mechanical assembly, system integration, and maintainability.",
  "严谨": "RIGOR",
  "可靠": "RELIABILITY",
  "协作": "COLLABORATION",
  "迭代": "ITERATION",
  "芯片级硬件开发": "Chip-level Hardware Development",
  "围绕核心芯片与传感器进行方案选型、原理图设计、电源树规划和接口电路开发。": "Develops chip- and sensor-based solutions through component selection, schematic design, power-tree planning, and interface circuitry.",
  "芯片选型与 Datasheet": "Component Selection & Datasheets",
  "原理图与 BOM": "Schematics & BOM",
  "高阶 HDI 设计": "Advanced HDI Design",
  "具备 8层2阶、10层3阶 HDI 板设计经验，关注层叠规划、高速信号与量产可制造性。": "Experienced in 8-layer 2-step and 10-layer 3-step HDI boards, with focus on stackup planning, high-speed signals, and manufacturability.",
  "阻抗与信号完整性": "Impedance & Signal Integrity",
  "板厂对接": "Fabricator Coordination",
  "DFM / 板厂对接": "DFM / Fabricator Coordination",
  "面向感知系统完成毫米波雷达、GNSS/INS 与摄像头模组的芯片级方案开发与系统接入。": "Builds chip-level sensing solutions integrating mmWave radar, GNSS/INS, and camera modules.",
  "毫米波雷达": "mmWave Radar",
  "深度视觉与验证": "Depth Vision & Validation",
  "具备 ToF 相机接入经验，覆盖 iToF / dToF 方案适配、板级调试、系统联调与问题闭环。": "Experienced in ToF camera integration, including iToF/dToF adaptation, board bring-up, system integration, and issue closure.",
  "系统联调与验证": "System Integration & Validation",
  "个人简历": "Resume",
  "HDI 层叠": "HDI STACKUP",
  "感知域": "SENSING DOMAINS",
  "优秀员工": "OUTSTANDING",
  "硬件开发工程师，聚焦高阶 HDI、芯片级感知硬件、多传感器融合与产品工程化。": "Hardware development engineer focused on advanced HDI, chip-level sensing hardware, multi-sensor fusion, and product engineering.",
  "工具与方向": "Tools & Focus",
  "网站仅展示适合公开的履历信息，当前工作项目与具体成果将按公开范围持续补充。": "This site presents publicly shareable experience. Current projects and outcomes will be added within appropriate disclosure limits.",
  "职业概述": "Professional Summary",
  "上海工程技术大学自动化专业工学学士，现任上海极洞科技有限公司硬件开发工程师。 具备芯片级硬件开发、8层2阶 / 10层3阶 HDI、多传感器融合、深度视觉接入与机械协同设计经验。": "B.Eng. in Automation from Shanghai University of Engineering Science. Currently a hardware development engineer at Shanghai Jidong Technology Co., Ltd., with experience in chip-level hardware, advanced HDI, sensor fusion, depth vision, and mechanical co-design.",
  "项目与工作经历": "Projects & Experience",
  "上海极洞科技有限公司 · 硬件开发工程师": "Shanghai Jidong Technology Co., Ltd. · Hardware Development Engineer",
  "2025.04.07 — 至今": "2025.04.07 — PRESENT",
  "主导 Pobox 项目全流程开发，完成毫米波雷达、GNSS/INS、摄像头模组与 iToF / dToF 深度相机的多传感器融合方案调研、芯片级硬件架构、8层2阶 / 10层3阶 HDI 制板设计及板厂对接； 独立负责机械设计，并在方案阶段统筹结构装配、器件布局与硬件协同。获评 2025 年“001”优秀员工。": "Led end-to-end development of the Pobox project, covering multi-sensor architecture research, chip-level hardware, 8-layer 2-step / 10-layer 3-step HDI design, fabricator coordination, and complete mechanical design. Named a 2025 “001” Outstanding Employee.",
  "2025 · “001”优秀员工": "2025 · “001” OUTSTANDING EMPLOYEE",
  "全国大学生智能汽车竞赛 · 硬件工程师": "National Intelligent Vehicle Competition · Hardware Engineer",
  "主导智能视觉组硬件架构设计，采用 RT1064 核心板与 OpenMV 视觉模块方案； 完成四层 PCB 设计、电源模块布局优化与驱动板维修，获华东赛区第一名、全国二等奖第一名。": "Led the hardware architecture for an intelligent vision team using RT1064 and OpenMV; completed four-layer PCB design, power-layout optimization, and driver-board repair, earning first place in East China and first among national second-prize teams.",
  "全国大学生电子设计竞赛 · 硬件工程师": "National Undergraduate Electronic Design Contest · Hardware Engineer",
  "参与基于 IMU 与编码器融合的云台控制系统开发，进行 OpenART 调试与团队协作， 项目获上海市二等奖。": "Developed a gimbal control system using IMU and encoder fusion, including OpenART debugging and team integration; awarded second prize in Shanghai.",
  "上海市大学生创新训练项目 · 项目负责人": "Shanghai Undergraduate Innovation Program · Project Lead",
  "负责双人项目的硬件与机械部分，自学 SolidWorks 建模并推动机械结构与硬件方案结合。": "Led hardware and mechanical development for a two-person project, applying self-taught SolidWorks skills to integrate structure and electronics.",
  "能力矩阵": "Capability Matrix",
  "芯片级硬件方案与电源树设计": "Chip-level Architecture & Power-tree Design",
  "8层2阶 / 10层3阶 HDI 与工程化设计": "8L 2-Step / 10L 3-Step HDI Engineering",
  "毫米波雷达、GNSS/INS 与摄像头模组": "mmWave Radar, GNSS/INS & Camera Modules",
  "iToF / dToF 接入、Bring-up 与系统联调": "iToF / dToF Integration, Bring-up & System Debug",
  "教育与认证": "Education",
  "上海工程技术大学": "Shanghai University of Engineering Science",
  "自动化 · 工学学士 · 2021 — 2025": "Automation · Bachelor of Engineering · 2021 — 2025",
  "核心课程：模拟与数字电路设计、自动控制原理、嵌入式系统开发、信号与系统、机械制图。": "Core coursework: analog and digital circuit design, automatic control, embedded systems, signals and systems, and mechanical drafting.",
  "兴趣爱好": "Interests",
  "SolidWorks 与机械设计": "SolidWorks & Mechanical Design",
  "习惯从零件功能、内部器件布局和装配路径出发建立三维模型，持续关注壁厚、公差、 紧固方式、接口开孔和可制造性。建模过程不仅追求外观完整，也会结合 PCB 尺寸、 连接器位置、线束走向及维护空间进行结构迭代。": "Builds 3D models from functional, component-layout, and assembly requirements, with attention to wall thickness, tolerances, fasteners, openings, manufacturability, PCB dimensions, connector placement, cable routing, and serviceability.",
  "零件建模": "Part Modeling",
  "装配设计": "Assembly Design",
  "结构迭代": "Structural Iteration",
  "机械建模作品": "Mechanical Models",
  "等待插入图片": "IMAGE RESERVED",
  "3D 打印与设备调试": "3D Printing & Equipment Tuning",
  "拥有拓竹 H2C 3D 打印机，乐于研究材料特性、模型摆放、支撑策略、切片参数和设备状态。 遇到翘曲、拉丝、层纹或尺寸偏差时，会通过参数对比与重复试验定位原因， 将打印设备作为快速原型和机械方案验证工具。": "Uses a Bambu Lab H2C 3D printer to study materials, orientation, supports, slicing parameters, and machine condition, troubleshooting defects through controlled experiments and using printing for rapid prototyping.",
  "拓竹 H2C": "Bambu Lab H2C",
  "切片参数": "Slicing Parameters",
  "设备调试": "Equipment Tuning",
  "3D 打印记录": "3D Printing Records",
  "电子产品拆解研究": "Electronics Teardown Research",
  "对电子产品内部实现保持强烈好奇，特别享受“拆拆拆”的过程。拆解时会观察 PCB 分区、 器件选型、屏蔽与散热、天线位置、结构固定和装配顺序，并结合产品定位分析设计取舍， 将优秀方案和失效细节沉淀为后续设计参考。": "Explores electronic products through teardown, studying PCB partitioning, component selection, shielding, thermal design, antenna placement, mechanical retention, assembly sequence, and design trade-offs.",
  "电路观察": "Circuit Observation",
  "结构分析": "Structural Analysis",
  "设计复盘": "Design Review",
  "电子产品拆解": "Electronics Teardowns",
  "电子创作与原型验证": "Electronics Creation & Prototyping",
  "持续关注新器件、新型传感器和有趣的电子产品，倾向于通过快速原型把想法落到实物。 从方案草图、器件选型和电路搭建，到结构制作、焊接调试和问题复盘， 完整经历“想法—原型—验证—迭代”的闭环。": "Turns ideas into physical prototypes through concept sketches, component selection, circuit construction, structural fabrication, soldering, debugging, and iterative review.",
  "快速原型": "Rapid Prototyping",
  "焊接调试": "Soldering & Debug",
  "闭环验证": "Closed-loop Validation",
  "硬件原型与调试": "Hardware Prototypes & Debug"
}));

const normalizeCopy = (value) => value.replace(/\s+/g, " ").trim();
const translatableTextNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let textNode = textWalker.nextNode();
while (textNode) {
  const normalized = normalizeCopy(textNode.nodeValue);
  if (translationPairs.has(normalized)) {
    const match = textNode.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
    translatableTextNodes.push({
      node: textNode,
      prefix: match?.[1] ?? "",
      suffix: match?.[3] ?? "",
      zh: normalized,
      en: translationPairs.get(normalized),
    });
  }
  textNode = textWalker.nextNode();
}

const localeMeta = {
  zh: {
    htmlLang: "zh-CN",
    title: "顾峥 | 硬件工程师",
    description: "顾峥的个人主页与硬件开发工程师简历，聚焦高阶 HDI、芯片级开发、多传感器融合与深度视觉。",
    group: "语言选择",
    switchLanguage: "切换至英文",
    home: "返回首页",
    nav: "主导航",
    print: "打印简历",
  },
  en: {
    htmlLang: "en",
    title: "Gu Zheng | Hardware Engineer",
    description: "Gu Zheng's hardware engineering portfolio, focused on advanced HDI, chip-level development, multi-sensor fusion, and depth vision.",
    group: "Language selector",
    switchLanguage: "Switch to Chinese",
    home: "Back to home",
    nav: "Main navigation",
    print: "Print resume",
  },
};

let currentLanguage = localStorage.getItem("site-language") === "en" ? "en" : "zh";

const musicLocale = {
  zh: {
    play: "播放",
    pause: "暂停",
    mute: "静音",
    click: "点击",
    source: "音源",
    volume: "音量",
    playAria: "播放背景音乐",
    pauseAria: "暂停背景音乐",
    volumeAria: "背景音乐音量",
    songAria: "在网易云音乐打开 Outer Wilds",
  },
  en: {
    play: "PLAY",
    pause: "PAUSE",
    mute: "MUTE",
    click: "CLICK",
    source: "SOURCE",
    volume: "VOL",
    playAria: "Play background music",
    pauseAria: "Pause background music",
    volumeAria: "Background music volume",
    songAria: "Open Outer Wilds on NetEase Music",
  },
};

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

let musicVolume = 50;
let lastAudibleVolume = Number(localStorage.getItem("music-volume") ?? 50);
if (!Number.isFinite(lastAudibleVolume) || lastAudibleVolume <= 0) lastAudibleVolume = 50;
const playlist = [
  { title: "Travelers", id: "1903408778" },
  { title: "14.3 Billion Years", id: "1903408779" },
  { title: "Outer Wilds", id: "1903401563" },
];
let currentTrackIndex = 2;

const updateMusicControl = (status) => {
  musicVolume = Math.min(100, Math.max(0, musicVolume));
  const isPlaying = Boolean(backgroundAudio && !backgroundAudio.paused && !backgroundAudio.muted && musicVolume > 0);
  const labels = musicLocale[currentLanguage];
  const statusLabel = status === "NETEASE"
    ? labels.source
    : status === "CLICK"
      ? labels.click
      : status;

  if (musicControl) {
    musicControl.style.setProperty("--music-level", `${musicVolume}%`);
    musicControl.classList.toggle("is-playing", isPlaying);
    musicControl.classList.toggle("is-unavailable", status === "NETEASE");
  }
  if (musicSlider) {
    musicSlider.value = String(musicVolume);
  }
  if (musicValue) {
    musicValue.textContent = statusLabel ?? `${labels.volume} ${musicVolume === 0 ? labels.mute : `${Math.round(musicVolume)}%`}`;
  }
  if (musicToggle) {
    musicToggle.textContent = isPlaying ? labels.pause : labels.play;
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? labels.pauseAria : labels.playAria);
  }
};

const applyLanguage = (language) => {
  currentLanguage = language === "en" ? "en" : "zh";
  const meta = localeMeta[currentLanguage];
  const labels = musicLocale[currentLanguage];

  localStorage.setItem("site-language", currentLanguage);
  document.documentElement.lang = meta.htmlLang;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);

  translatableTextNodes.forEach(({ node, prefix, suffix, zh, en }) => {
    node.nodeValue = `${prefix}${currentLanguage === "en" ? en : zh}${suffix}`;
  });

  if (languageToggle) {
    languageToggle.textContent = currentLanguage === "en" ? "中" : "EN";
    languageToggle.setAttribute("aria-label", meta.switchLanguage);
    languageToggle.setAttribute("aria-pressed", String(currentLanguage === "en"));
  }
  document.querySelector(".brand")?.setAttribute("aria-label", meta.home);
  siteNav?.setAttribute("aria-label", meta.nav);
  printButton?.setAttribute("aria-label", meta.print);
  musicSlider?.setAttribute("aria-label", labels.volumeAria);
  musicLink?.setAttribute("aria-label", `${currentLanguage === "en" ? "Open" : "在网易云音乐打开"} ${playlist[currentTrackIndex].title}`);

  updateMusicControl();
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

const selectTrack = (index, shouldPlay = false) => {
  if (!backgroundAudio) return;

  currentTrackIndex = (index + playlist.length) % playlist.length;
  const track = playlist[currentTrackIndex];
  backgroundAudio.src = `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`;
  backgroundAudio.load();
  backgroundAudio.volume = musicVolume / 100;
  backgroundAudio.muted = !shouldPlay;

  if (musicTitle) musicTitle.textContent = `${track.title}——Outer Wilds`;
  if (musicLink) {
    musicLink.href = `https://music.163.com/#/song?id=${track.id}`;
    musicLink.setAttribute("aria-label", `在网易云音乐打开 ${track.title}`);
  }

  if (shouldPlay) {
    void playBackgroundMusic();
  } else {
    updateMusicControl();
  }
};

if (backgroundAudio) {
  backgroundAudio.muted = true;
  backgroundAudio.volume = musicVolume / 100;
  backgroundAudio.addEventListener("play", () => updateMusicControl());
  backgroundAudio.addEventListener("pause", () => updateMusicControl());
  backgroundAudio.addEventListener("error", () => updateMusicControl("NETEASE"));
  backgroundAudio.addEventListener("ended", () => selectTrack(currentTrackIndex + 1, true));
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

previousTrackButton?.addEventListener("click", () => {
  selectTrack(currentTrackIndex - 1, Boolean(backgroundAudio && !backgroundAudio.paused && !backgroundAudio.muted));
});

nextTrackButton?.addEventListener("click", () => {
  selectTrack(currentTrackIndex + 1, Boolean(backgroundAudio && !backgroundAudio.paused && !backgroundAudio.muted));
});

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

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
}

applyLanguage(currentLanguage);

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
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const kx = dx === 0 ? Infinity : centerX / Math.abs(dx);
      const ky = dy === 0 ? Infinity : centerY / Math.abs(dy);
      const edgeProximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      const cursorAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const proximity = 0.08 + Math.pow(edgeProximity, 2.2) * 0.92;
      const surfaceOpacity = 0.38 + proximity * 0.27;
      const glowRadius = Math.max(460, Math.min(rect.width, rect.height) * 0.72);

      target.style.setProperty("--edge-x", `${x}px`);
      target.style.setProperty("--edge-y", `${y}px`);
      target.style.setProperty("--edge-radius", `${glowRadius}px`);
      target.style.setProperty("--cursor-angle", `${cursorAngle.toFixed(3)}deg`);
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
