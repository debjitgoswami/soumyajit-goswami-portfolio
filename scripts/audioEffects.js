// ===========================
// AUDIO EFFECTS HANDLER
// ===========================

(function () {
  // Inject audio elements if not already present
  if (!document.getElementById("hoverSound")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <audio id="hoverSound" src="../sounds/sound_hover.mp3" preload="auto"></audio>
      <audio id="skillHoverSound" src="../sounds/skill_sound_hover.mp3" preload="auto"></audio>
      <audio id="clickSound" src="../sounds/sound_click.mp3" preload="auto"></audio>
      `
    );
  }

  const hoverSound = document.getElementById("hoverSound");
  const skillHoverSound = document.getElementById("skillHoverSound");
  const clickSound = document.getElementById("clickSound");

  // Hover sound with delay to prevent spam
  let lastHoverTime = 0;
  const hoverDelay = 150;

  // FIXED: Use mouseover instead of mouseenter for better event delegation
  document.addEventListener("mouseover", (e) => {
    // Safely check if .closest exists before using it
    const target = e.target.closest
      ? e.target.closest(
          "a, button, [data-clickable], .project-card, .slide-nav, .indicator, .skill-card, .stat-card"
        )
      : null;

    if (!target) return;

    const now = Date.now();
    if (now - lastHoverTime < hoverDelay) return;

    // Play different sound for skill cards
    if (
      target.classList.contains("skill-card") ||
      target.classList.contains("stat-card")
    ) {
      if (skillHoverSound) {
        skillHoverSound.currentTime = 0;
        skillHoverSound.play().catch(() => {});
      }
    } else {
      if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
      }
    }

    lastHoverTime = now;
  });

  // Click sound handler
  document.addEventListener("click", (e) => {
    // FIXED: Safely check if .closest exists
    const el = e.target.closest
      ? e.target.closest("a, button, [data-clickable], .project-card")
      : null;

    if (!el) return;

    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }

    // Handle navigation after 200ms to allow sound
    const href = el.getAttribute("href") || el.getAttribute("data-url");
    if (href && href !== "#") {
      e.preventDefault();
      setTimeout(() => {
        window.location.href = href;
      }, 200);
      return;
    }

    // Fallback for inline onclick
    if (el.onclick) {
      e.preventDefault();
      const oldClick = el.onclick;
      setTimeout(() => oldClick.call(el, e), 200);
    }
  });

  console.log("✅ Audio effects initialized");
})();
