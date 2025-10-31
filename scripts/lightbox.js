document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const leftBtn = document.querySelector(".lightbox-nav.left");
  const rightBtn = document.querySelector(".lightbox-nav.right");
    console.log("Left Button:", leftBtn);
    console.log("Right Button:", rightBtn);

  let currentIndex = -1;
  let slides = [];

function openLightbox(img) {
  slides = Array.from(document.querySelectorAll(".carousel-3d img")); // gets all images in carousel
  currentIndex = slides.findIndex((slide) => slide.src === img.src);
  lightboxImg.src = img.src;
  lightbox.style.display = "flex";
  

  /////
  // Allow time for DOM to update before adding animation
  requestAnimationFrame(() => {
    lightbox.classList.add("show");
  });


  ////
  document.body.style.overflow = "hidden";
}


  document.addEventListener("click", (e) => {
    const img = e.target.closest(".slide.active img");
    if (!img) return;
    openLightbox(img);
  });

function showImage(index) {
  if (slides.length === 0) return;
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentIndex = index;

  // Remove .show to trigger fade-out
  lightbox.classList.remove("show");

  // Wait for transition to end, then switch image src and fade-in
  setTimeout(() => {
    lightboxImg.src = slides[index].src;
    // Allow browser to process src change before fade-in
    requestAnimationFrame(() => {
      lightbox.classList.add("show");
    });
  }, 350); // Use same time as your transition (0.35s = 350ms)
}


  leftBtn.addEventListener("click", (e) => {
    console.log("Left button clicked");
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  rightBtn.addEventListener("click", (e) => {
    console.log("Right button clicked");
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

function closeLightbox() {
  lightbox.classList.remove("show");
  setTimeout(() => {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }, 350); // match the transition duration
}

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
