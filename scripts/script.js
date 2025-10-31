document.addEventListener("DOMContentLoaded", () => {
  ("use strict");

  const loadingScreen = document.getElementById("loading-screen");
  const mainMenu = document.getElementById("main-menu");
  const starsContainer = document.querySelector(".stars");

  // Prevent browser auto-restoring scroll (we'll manage it manually)
  if ("scrollRestoration" in history) {
    try {
      history.scrollRestoration = "manual";
    } catch (e) {
      // ignore if not allowed
    }
  }

  // LOADER HANDLER
  const hasVisited = sessionStorage.getItem("hasVisited");
  if (hasVisited) {
    if (loadingScreen) loadingScreen.style.display = "none";
    if (mainMenu) mainMenu.classList.add("active");
  } else {
    if (loadingScreen) loadingScreen.classList.add("active");
  }

  function enterPortfolio() {
    sessionStorage.setItem("hasVisited", "true");
    if (loadingScreen) loadingScreen.style.opacity = 0;
    setTimeout(() => {
      if (loadingScreen) loadingScreen.style.display = "none";
      if (mainMenu) mainMenu.classList.add("active");
    }, 500);
  }

  if (loadingScreen) {
    loadingScreen.addEventListener("click", enterPortfolio);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && loadingScreen.classList.contains("active")) {
        enterPortfolio();
      }
    });
  }

  // AUDIO EFFECTS
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
        if (now - lastHoverTime > hoverDelay) {
          if (hoverSound) {
            hoverSound.currentTime = 0;
            try {
              hoverSound.play();
            } catch (e) {}
          }
          lastHoverTime = now;
        }
      });
    });

  // CLICK NAV HANDLER (centralized)
  // Save scroll position for projects page only using separate key
  document.addEventListener("click", (e) => {
    const el = e.target.closest("a, button, [data-clickable], .project-card");
    if (!el) return;

    // Play click sound
    if (clickSound) {
      clickSound.currentTime = 0;
      try {
        clickSound.play();
      } catch (err) {}
    }

    const href =
      (el.dataset && el.dataset.url) ||
      el.getAttribute("href") ||
      el.getAttribute("data-url") ||
      null;

    if (href) {
      // Save scroll position for the projects page only
      sessionStorage.setItem("projects_scroll", String(window.scrollY));
      console.log(
        "[scroll-memory] saved projects_scroll:",
        window.scrollY,
        "for",
        href
      );

      e.preventDefault();
      setTimeout(() => {
        window.location.assign(href);
      }, 200);
      return;
    }

    if (typeof el.onclick === "function") {
      e.preventDefault();
      sessionStorage.setItem("projects_scroll", String(window.scrollY));
      console.log(
        "[scroll-memory] saved (inline onclick) projects_scroll:",
        window.scrollY
      );
      const oldClick = el.onclick;
      setTimeout(() => {
        try {
          oldClick.call(
            el,
            new MouseEvent("click", { bubbles: true, cancelable: true })
          );
        } catch (err) {
          try {
            oldClick.call(el);
          } catch (err2) {}
        }
      }, 200);
      return;
    }
  });

  // PROJECT GRID INIT
  const grid = document.querySelector(".projects-grid");
  if (grid && typeof projects !== "undefined") {
    grid.innerHTML = "";
    Object.entries(projects).forEach(([id, project]) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.dataset.url = `project-detail.html?id=${id}`;
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
            ${project.tech
              .map((t) => `<span class="tech-tag">${t}</span>`)
              .join("")}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // PARTICLES + SHOOTING STARS (improved with original shooting star style)

  // Create static floating particles with varied sizes and opacity
  function createParticles() {
    if (!starsContainer) return;

    const particleCount = 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Vary size and brightness for depth effect
      const size = 1 + Math.random() * 2; // 1-3px
      const opacity = 0.3 + Math.random() * 0.5; // 0.3-0.8
      const duration = 3 + Math.random() * 5; // 3-8s
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

  // Create shooting star with original style (as it was)
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

  // Auto-generate shooting stars periodically
  setInterval(
    () => createShootingStar(Math.random() * 100, Math.random() * 60),
    4000
  );

  // Mouse parallax effect + reactive shooting stars with throttle
  let lastX = 0;
  let lastY = 0;
  let mouseMovementThrottle = null;

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    if (starsContainer) {
      starsContainer.style.transform = `translate(${x * -10}px, ${y * -5}px)`;
    }

    // Throttle shooting star generation to avoid lag
    if (!mouseMovementThrottle) {
      if (Math.abs(e.clientX - lastX) > 80) {
        createShootingStar(x * 100 + 50, y * 100 + 50, true);

        mouseMovementThrottle = setTimeout(() => {
          mouseMovementThrottle = null;
        }, 200); // Throttle: max one star every 200ms
      }
    }

    lastX = e.clientX;
    lastY = e.clientY;
  });

  // RESTORE SCROLL POSITION — projects page only
  // Ensure fresh forward loads start at top (detail pages included)
  window.scrollTo(0, 0);

  function restoreProjectsScrollSmooth() {
    // Only attempt restore if this page actually has a projects grid
    if (!document.querySelector(".projects-grid")) return;

    const scrollPos = sessionStorage.getItem("projects_scroll");
    if (scrollPos !== null) {
      console.log("[scroll-memory] restoring projects_scroll to:", scrollPos);

      // Delay so layout can stabilize; use smooth natural behavior
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(scrollPos, 10),
          behavior: "smooth",
        });

        // Clear saved value so fresh visits start at top
        sessionStorage.removeItem("projects_scroll");
      }, 300);
    }
  }

  // Use pageshow and only act for back-forward navigations (bfcache)
  window.addEventListener("pageshow", (e) => {
    if (
      e.persisted ||
      performance.getEntriesByType("navigation")[0]?.type === "back_forward"
    ) {
      restoreProjectsScrollSmooth();
    }
  });
});
