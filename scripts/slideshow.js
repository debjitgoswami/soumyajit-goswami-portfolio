// Utility: Get the project id from URL (?id=1)
function getProjectID() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "1";
}

// Globals
let currentSlideIndex = 0;
let totalSlides = 0;
let autoplayInterval = null;
let isPlaying = true;

// Update carousel view
function updateCarousel() {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

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

  indicators.forEach((ind, index) => {
    ind.classList.toggle("active", index === currentSlideIndex);
  });
}

function changeSlide(direction) {
  currentSlideIndex =
    (currentSlideIndex + direction + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoplay();
}

function currentSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
  resetAutoplay();
}

function startAutoplay() {
  if (autoplayInterval) return; // prevents interval stacking
  autoplayInterval = setInterval(() => changeSlide(1), 3000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
}

function resetAutoplay() {
  if (isPlaying) {
    stopAutoplay();
    startAutoplay();
  }
}

function toggleAutoplay() {
  const btn = document.querySelector(".play-pause-btn");
  if (isPlaying) {
    stopAutoplay();
    btn.textContent = "▶";
  } else {
    startAutoplay();
    btn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  const projectID = getProjectID();
  const data = projects[projectID] || projects["1"];

  document.querySelector(".project-title").textContent = data.title;
  document.querySelector(".project-category").textContent = data.category;

  const carousel = document.querySelector(".carousel-3d");
  carousel.innerHTML = "";
  data.images.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.setAttribute("data-index", i);
    slide.innerHTML = `<img src="${img}" alt="Project Image ${
      i + 1
    }" style="width:100%;height:100%;object-fit:cover;">`;
    carousel.appendChild(slide);
  });

  totalSlides = data.images.length;

  const indicators = document.querySelector(".slide-indicators");
  indicators.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    indicators.innerHTML += `<span class="indicator${
      i === 0 ? " active" : ""
    }" onclick="currentSlide(${i})"></span>`;
  }

  document.querySelector(".video-container").innerHTML = `
    <video id="projectVideo" width="100%" muted loop preload="auto">
      <source src="${data.video}" type="video/mp4">
    </video>
  `;
  const video = document.getElementById("projectVideo");
  const videoContainer = document.querySelector(".video-container");
  videoContainer.addEventListener("mouseenter", () => video.play());
  videoContainer.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  currentSlideIndex = 0;
  updateCarousel();
  startAutoplay();

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", () => isPlaying && startAutoplay());

  document.addEventListener("click", (e) => {
    if (e.target.closest(".slide.left")) changeSlide(-1);
    else if (e.target.closest(".slide.right")) changeSlide(1);
  });
});
