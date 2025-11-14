// ---------------------------
// script.js
// Main portfolio logic - animations, interactions, grid building, scroll memory restricted to projects pages
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  ("use strict");

  const loadingScreen = document.getElementById("loading-screen");
  const mainMenu = document.getElementById("main-menu");
  const starsContainer = document.querySelector(".stars");

  // ========== LOADER HANDLER ==========
  const hasVisited = sessionStorage.getItem("hasVisited");
  if (hasVisited) {
    if (loadingScreen) loadingScreen.style.display = "none";
    if (mainMenu) mainMenu.classList.add("active");
  } else {
    if (loadingScreen) loadingScreen.classList.add("active");
  }

  function enterPortfolio() {
    sessionStorage.setItem("hasVisited", "true");
    if (loadingScreen) {
      loadingScreen.style.opacity = 0;
      setTimeout(() => {
        loadingScreen.style.display = "none";
        if (mainMenu) mainMenu.classList.add("active");
      }, 500);
    }
  }

  if (loadingScreen) {
    loadingScreen.addEventListener("click", enterPortfolio);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && loadingScreen?.classList.contains("active")) {
        enterPortfolio();
      }
    });
  }

  // ========== AUDIO EFFECTS ==========
  if (!document.getElementById("hoverSound")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <audio id="hoverSound" src="../sounds/sound_hover.mp3" preload="auto"></audio>
        <audio id="clickSound" src="../sounds/sound_click.mp3" preload="auto"></audio>
      `
    );
  }

  const hoverSound = document.getElementById("hoverSound");
  const clickSound = document.getElementById("clickSound");
  let lastHoverTime = 0;
  const hoverDelay = 150;

  document
    .querySelectorAll("a, button, [data-clickable], .project-card")
    .forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const now = Date.now();
        if (now - lastHoverTime > hoverDelay && hoverSound) {
          hoverSound.currentTime = 0;
          hoverSound.play().catch(() => {});
          lastHoverTime = now;
        }
      });
    });

  // ========== CENTRALIZED CLICK HANDLER + SCROLL SAVE ==========
  document.addEventListener("click", (e) => {
    const el = e.target.closest
      ? e.target.closest("a, button, [data-clickable], .project-card")
      : null;

    if (!el) return;

    // Save scroll only on projects pages
    const pathname = window.location.pathname.toLowerCase();
    if (
      pathname.endsWith("projects.html") ||
      pathname.endsWith("sub-project.html")
    ) {
      if (
        el.classList.contains("project-card") ||
        (el.tagName === "A" &&
          (el.href.includes("project-detail") ||
            el.href.includes("sub-project")))
      ) {
        sessionStorage.setItem("projects_scroll", String(window.scrollY));
      }
    }

    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }

    const href =
      el.dataset?.url ||
      el.getAttribute("href") ||
      el.getAttribute("data-url") ||
      null;

    if (href) {
      e.preventDefault();
      setTimeout(() => {
        window.location.assign(href);
      }, 200);
      return;
    }

    if (typeof el.onclick === "function") {
      e.preventDefault();
      sessionStorage.setItem("projects_scroll", String(window.scrollY));
      const oldClick = el.onclick;
      setTimeout(() => {
        try {
          oldClick.call(
            el,
            new MouseEvent("click", { bubbles: true, cancelable: true })
          );
        } catch (err) {
          oldClick.call(el);
        }
      }, 200);
    }
  });

  // ========== PROJECT GRID BUILDER ==========
  const grid = document.querySelector(".projects-grid");
  if (grid && typeof projects !== "undefined") {
    grid.innerHTML = "";

    Object.entries(projects).forEach(([id, project]) => {
      const card = document.createElement("div");
      card.className = "project-card";

      // Determine navigation URL based on subprojects
      if (project.subprojects && project.subprojects.length > 0) {
        card.dataset.url = `sub-project.html?parent=${id}`;
      } else {
        card.dataset.url = `project-detail.html?id=${id}`;
      }

      card.innerHTML = `
        <div class="project-thumbnail">
          <img src="${project.thumbnail}" alt="${
        project.title
      }" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category}</p>
          <div class="tech-tags">
            ${
              Array.isArray(project.tech)
                ? project.tech
                    .map((tech) => `<span class="tech-tag">${tech}</span>`)
                    .join("")
                : ""
            }
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // ========== PARTICLES & SHOOTING STARS ==========
  function createParticles() {
    if (!starsContainer) return;

    const particleCount = 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = 1 + Math.random() * 2;
      const opacity = 0.3 + Math.random() * 0.5;
      const duration = 3 + Math.random() * 5;
      const delay = Math.random() * 3;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 212, 255, ${opacity});
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px rgba(0, 212, 255, 0.5);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        pointer-events: none;
      `;

      fragment.appendChild(particle);
    }

    starsContainer.appendChild(fragment);
  }

  createParticles();

  function createShootingStar(x, y, forceReactive = false) {
    if (!starsContainer) return;
    if (!forceReactive && Math.random() > 0.2) return;

    const star = document.createElement("div");
    star.className = "particle";
    star.style.cssText = `
      position: absolute;
      width: 3px;
      height: 80px;
      background: rgba(0, 212, 255, 0.8);
      border-radius: 50%;
      top: ${y}%;
      left: ${x}%;
      transform: rotate(-45deg);
      filter: blur(1px);
      animation: shoot 1.2s linear forwards;
      pointer-events: none;
    `;

    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), 1300);
  }

  setInterval(
    () => createShootingStar(Math.random() * 100, Math.random() * 60),
    4000
  );

  // ========== UFO ANIMATION ==========

  // ========== UFO ANIMATION ==========

  function startUfoAnimation() {
    const ufo = document.querySelector(".ufo-floating");
    if (!ufo) return;

    function triggerAnimation() {
      const side = Math.random() < 0.5 ? 0 : 1;
      const startX = side === 0 ? "-150%" : "150vw";
      const endX = side === 0 ? "150vw" : "-150%";

      const top = 10 + Math.random() * 50;
      ufo.style.top = `${top}%`;

      const duration = 20000 + Math.random() * 15000;

      ufo.style.setProperty("--start-x", startX);
      ufo.style.setProperty("--end-x", endX);

      ufo.style.animationDuration = `${duration}ms`;
      ufo.style.animationPlayState = "running";

      setTimeout(() => {
        ufo.style.animationPlayState = "paused";
        setTimeout(triggerAnimation, 5000 + Math.random() * 10000);
      }, duration);
    }

    setTimeout(triggerAnimation, 1000);
  }

  // FIX: run immediately — DO NOT wrap this inside another DOMContentLoaded
  startUfoAnimation();

  // ========== MOUSE PARALLAX ==========
  let lastX = 0;
  let lastY = 0;
  let mouseMovementThrottle = null;

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    if (starsContainer) {
      starsContainer.style.transform = `translate(${x * -10}px, ${y * -5}px)`;
    }

    if (!mouseMovementThrottle) {
      if (Math.abs(e.clientX - lastX) > 80) {
        createShootingStar(x * 100 + 50, y * 100 + 50, true);
        mouseMovementThrottle = setTimeout(() => {
          mouseMovementThrottle = null;
        }, 200);
      }
    }

    lastX = e.clientX;
    lastY = e.clientY;
  });

  // ========== SCROLL RESTORATION ==========
  function restoreProjectsScrollSmooth() {
    const grid = document.querySelector(".projects-grid");
    if (!grid) return;

    const scrollPos = sessionStorage.getItem("projects_scroll");
    if (scrollPos !== null) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(scrollPos, 10),
          behavior: "smooth",
        });
        sessionStorage.removeItem("projects_scroll");
      }, 300);
    }
  }

  window.addEventListener("pageshow", (event) => {
    const navEntries = performance.getEntriesByType("navigation");
    const navType = navEntries.length ? navEntries[0].type : "";

    if (event.persisted || navType === "back_forward") {
      restoreProjectsScrollSmooth();
    }
  });

  console.log("✅ Audio effects initialized");

  // ========== BACK BUTTON HANDLER ==========
  // ========== BACK BUTTON HANDLER ==========
  (function backButtonFix() {
    const backBtn = document.getElementById("back-btn");
    if (!backBtn) return;

    const params = new URLSearchParams(window.location.search);
    const parent = params.get("parent");
    const sub = params.get("sub");
    const id = params.get("id");

    const cameFromProjects = sessionStorage.getItem("came_from_projects");

    // 1️⃣ Case: Detail page opened from a subproject
    if (parent && sub) {
      backBtn.href = `sub-project.html?parent=${parent}`;
      return;
    }

    // 2️⃣ Case: We are on sub-project.html and we previously came from projects
    if (parent && !sub && cameFromProjects === "true") {
      backBtn.href = "projects.html";
      return;
    }

    // 3️⃣ Direct project without subprojects
    if (id && !parent) {
      backBtn.href = "projects.html";
      return;
    }

    // fallback
    backBtn.href = "../index.html";
  })();
});