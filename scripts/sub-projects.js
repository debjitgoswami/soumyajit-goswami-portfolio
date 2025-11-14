// ---------------------------
// sub-projects.js
// Handles subproject grid display on sub-project.html
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

   sessionStorage.setItem("came_from_projects", "true");
  // Extract parent ID from URL
  function getParentProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("parent");
  }

  const parentId = getParentProjectId();
  console.log("Parent ID:", parentId);

  // Validate parent project exists
  if (!parentId || !projects || !projects[parentId]) {
    console.error("Parent project not found");
    return;
  }

  const parentProject = projects[parentId];
  const subprojects = parentProject.subprojects;

  // Validate subprojects exist
  if (!subprojects || subprojects.length === 0) {
    console.error("No subprojects found for parent:", parentId);
    return;
  }

  console.log("Subprojects found:", subprojects);

  // Update page title
  const titleElement = document.querySelector("#subproject-title");
  if (titleElement) {
    titleElement.textContent = parentProject.title.toUpperCase();
  }

  // Get grid container
  const grid = document.querySelector("#subproject-grid");
  if (!grid) {
    console.error("Subproject grid container not found");
    return;
  }

  grid.innerHTML = "";

  // Create subproject cards
  subprojects.forEach((sub) => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.dataset.url = `project-detail.html?parent=${parentId}&sub=${sub.key}`;

    card.innerHTML = `
      <div class="project-thumbnail">
        <img src="${sub.thumbnail}" alt="${
      sub.title
    }" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="project-info">
        <h3 class="project-title">${sub.title}</h3>
        <p class="project-category">${sub.category}</p>
        <div class="tech-tags">
          ${
            Array.isArray(sub.tech)
              ? sub.tech
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")
              : ""
          }
        </div>
      </div>
    `;

    // ✅ ADD CLICK HANDLER FOR EACH SUBPROJECT CARD
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const url = card.dataset.url;
      console.log("Navigating to:", url);
      setTimeout(() => {
        window.location.href = url;
      }, 200);
    });

    grid.appendChild(card);
  });

  // Fade-in animation for cards
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));


 

  console.log("✅ Subproject grid loaded successfully");
});
