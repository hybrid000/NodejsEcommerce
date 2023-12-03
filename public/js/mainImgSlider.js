const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let slideIndex = 0;
const slideCount = slides.length;
const slideWidth = slides[0].clientWidth;
let interval;

// Function to slide to the specified index
function goToSlide(index) {
  slideIndex = index;
  if (slideIndex < 0) {
    slideIndex = slideCount - 1;
  } else if (slideIndex >= slideCount) {
    slideIndex = 0;
  }
  const translateXValue = -slideIndex * slideWidth;
  slider.style.transform = `translateX(${translateXValue}px)`;
}

// Function to go to the next slide
function nextSlide() {
  goToSlide(slideIndex + 1);
}

// Function to go to the previous slide
function prevSlide() {
  goToSlide(slideIndex - 1);
}

// Add event listeners for buttons
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Auto slide every 5 seconds
function startAutoSlide() {
  interval = setInterval(nextSlide, 5000);
}

// Stop auto slide on user interaction
function stopAutoSlide() {
  clearInterval(interval);
}

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Swipe functionality for mobile devices
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > 50) {
    prevSlide();
  } else if (swipeDistance < -50) {
    nextSlide();
  }
});

// Start auto slide on page load
startAutoSlide();
