// ==========================================
// UTILITY FUNCTIONS //// also known as the function of project-detail.js
// ==========================================
function getProjectID() {
  const params = new URLSearchParams(window.location.search);
  // If 'parent' and 'sub' are present, return parent to identify main project first
  // Subproject key will be handled separately
  return {
    id: params.get("id"),
    parent: params.get("parent"),
    sub: params.get("sub"),
  };
}


function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ==========================================
// CAROUSEL STATE & VARIABLES
// ==========================================
let currentSlideIndex = 0;
let totalSlides = 0;
let autoplayInterval;
let isPlaying = true;

const slideDuration = 3000; // Autoplay interval in ms

// DOM element references (cached after DOM loads)
let carousel, indicatorsContainer, playPauseBtn, videoContainer;



// ==========================================
// CAROUSEL FUNCTIONS
// ==========================================
function updateCarousel() {
  const slides = carousel.querySelectorAll(".slide");
  const indicators = indicatorsContainer.querySelectorAll(".indicator");

  slides.forEach((slide, index) => {
    slide.classList.remove("active", "left", "right", "hide");

    if (index === currentSlideIndex) {
      slide.classList.add("active");
    } else if (index === (currentSlideIndex - 1 + totalSlides) % totalSlides) {
      slide.classList.add("left");
    } else if (index === (currentSlideIndex + 1) % totalSlides) {
      slide.classList.add("right");
    } else {
      slide.classList.add("hide");
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlideIndex);
  });
}

function changeSlide(direction) {
  currentSlideIndex =
    (currentSlideIndex + direction + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoplay();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
  resetAutoplay();
}

function startAutoplay() {
  autoplayInterval = setInterval(() => changeSlide(1), slideDuration);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function resetAutoplay() {
  if (isPlaying) {
    stopAutoplay();
    startAutoplay();
  }
}

function toggleAutoplay() {
  if (isPlaying) {
    stopAutoplay();
    playPauseBtn.textContent = "▶";
    isPlaying = false;
  } else {
    startAutoplay();
    playPauseBtn.textContent = "⏸";
    isPlaying = true;
  }
}

// // ==========================================

// ==========================================
// BUILD CAROUSEL FUNCTION
// ==========================================
function buildCarousel(data) {
  carousel.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  data.images.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.dataset.index = index;
    slide.innerHTML = `<img src="${img}" alt="Project Image ${index + 1}" style="width:100%;height:100%;object-fit:cover;">`;
    carousel.appendChild(slide);

    const indicator = document.createElement("span");
    indicator.className = "indicator";
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  totalSlides = data.images.length;
  currentSlideIndex = 0;
  updateCarousel();

  // setupLightbox();

  const videoSection = document.querySelector(".video-section");
  const videoContainer = videoSection.querySelector(".video-container");

  videoContainer.innerHTML = "";

  if (Array.isArray(data.video) && data.video.length > 0) {
    data.video.forEach((vid, idx) => {
      const videoBlock = document.createElement("div");
      videoBlock.className = "video-block";
      videoBlock.innerHTML = `
        <video id="projectVideo${idx}" width="100%" muted loop controls preload="auto" style="margin-bottom:1rem;">
          <source src="${vid}" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      `;
      videoContainer.appendChild(videoBlock);

      const videos = document.querySelectorAll("video");

      videos.forEach((video) => {
        video.addEventListener("mouseenter", () => video.play());
        video.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      });
    });
    videoSection.style.display = "";
  } else if (typeof data.video === "string" && data.video.trim() !== "") {
    const videoBlock = document.createElement("div");
    videoBlock.className = "video-block";
    videoBlock.innerHTML = `
        <video id="projectVideo" width="100%" muted loop controls preload="auto" style="margin-bottom:1rem;">
          <source src="${data.video}" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      `;
    videoContainer.appendChild(videoBlock);
    videoSection.style.display = "";
  } else {
    videoSection.style.display = "none";
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  carousel = document.querySelector(".carousel-3d");
  indicatorsContainer = document.querySelector(".slide-indicators");
  playPauseBtn = document.querySelector(".play-pause-btn");
  videoContainer = document.querySelector(".video-container");
const savedScroll = sessionStorage.getItem("projects_scroll");
  const params = getProjectID();
  let data = null;

  if (params.parent && params.sub && projects[params.parent]) {
    // Find the subproject in parent's subprojects
    data = projects[params.parent].subprojects.find(
      (s) => s.key === params.sub
    );
  } else if (params.id && projects[params.id]) {
    data = projects[params.id];
  } else {
    // Fallback default project
    data = projects["1"];
  }

  if (!data) {
    console.error("Project data not found.");
    return;
  }

  document.querySelector(".project-title").textContent = data.title;
  document.querySelector(".project-category").textContent = data.category;

  buildCarousel(data);

  const prevBtn = document.querySelector(".slide-nav.prev");
  const nextBtn = document.querySelector(".slide-nav.next");

  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

  if (playPauseBtn) {
    playPauseBtn.textContent = "⏸";
    playPauseBtn.addEventListener("click", toggleAutoplay);
  }

  carousel.addEventListener("click", (e) => {
    const target = e.target.closest(".slide");
    if (!target) return;
    if (target.classList.contains("left")) changeSlide(-1);
    else if (target.classList.contains("right")) changeSlide(1);
  });

  startAutoplay();
});
