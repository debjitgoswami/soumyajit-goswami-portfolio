// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getProjectID() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "1";
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

// // ==========================================
// // LIGHTBOX ELEMENTS & STATE
// // ==========================================
// const lightboxOverlay = document.createElement('div');
// lightboxOverlay.id = 'lightbox-overlay';
// lightboxOverlay.className = 'lightbox-overlay hidden';
// lightboxOverlay.tabIndex = -1;
// lightboxOverlay.innerHTML = `
//   <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
//   <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
//   <div class="lightbox-content">
//     <img id="lightbox-image" src="" alt="Expanded project image" />
//   </div>
//   <button class="lightbox-next" aria-label="Next image">&#10095;</button>
// `;
// document.body.appendChild(lightboxOverlay);

// const lightboxImage = lightboxOverlay.querySelector('#lightbox-image');
// const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
// const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
// const nextBtn = lightboxOverlay.querySelector('.lightbox-next');

// let currentLightboxIndex = 0;

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
// // LIGHTBOX FUNCTIONS
// // ==========================================
// function openLightbox(index) {
//   currentLightboxIndex = index;
//   updateLightboxImage();
//   lightboxOverlay.classList.remove('hidden');
//   document.body.style.overflow = 'hidden'; // disable scroll while lightbox open
//   lightboxOverlay.focus();
// }

// function closeLightbox() {
//   lightboxOverlay.classList.add('hidden');
//   document.body.style.overflow = ''; // restore page scroll
// }

// function updateLightboxImage() {
//   lightboxImage.src = data.images[currentLightboxIndex];
//   lightboxImage.alt = `Project image ${currentLightboxIndex + 1}`;
// }

// function showPrevImage() {
//   currentLightboxIndex = (currentLightboxIndex - 1 + data.images.length) % data.images.length;
//   updateLightboxImage();
// }

// function showNextImage() {
//   currentLightboxIndex = (currentLightboxIndex + 1) % data.images.length;
//   updateLightboxImage();
// }

// function setupLightbox() {
//   document.querySelectorAll('.slide img').forEach((img, index) => {
//     img.style.cursor = 'zoom-in';
//     img.addEventListener('click', () => openLightbox(index));
//   });

//   lightboxOverlay.addEventListener('click', e => {
//     if (e.target === lightboxOverlay) closeLightbox();
//   });

//   closeBtn.addEventListener('click', closeLightbox);
//   prevBtn.addEventListener('click', showPrevImage);
//   nextBtn.addEventListener('click', showNextImage);

//   document.addEventListener('keydown', e => {
//     if (lightboxOverlay.classList.contains('hidden')) return;
//     if (e.key === 'Escape') closeLightbox();
//     else if (e.key === 'ArrowLeft') showPrevImage();
//     else if (e.key === 'ArrowRight') showNextImage();
//   });
// }

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

  const projectID = getProjectID();
  const data = projects[projectID]; // Ensure projects is accessible

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
