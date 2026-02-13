export function initSlider() {
  const slides = document.querySelector(".slides");
  const slide = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (slides && slide.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slideWidth = slide[0].clientWidth;

    function goToSlide(index) {
      if (index < 0) {
        index = slide.length - 1;
      } else if (index >= slide.length) {
        index = 0;
      }
      slides.style.transform = `translateX(-${index * slideWidth}px)`;
      currentIndex = index;
    }

    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });
  }
}
