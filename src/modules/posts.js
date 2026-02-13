export function initViewMore() {
  const viewMoreBtn = document.querySelector(".view-more-posts");
  const miniToShow = 6;
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", () => {
      console.log("View More button clicked");
      const Cards = document.querySelectorAll(".posts-grid .card");
      const hiddenCards = Array.from(Cards).slice(miniToShow);

      hiddenCards.forEach((card) => {
        card.style.transitionDelay = "0ms";
        card.classList.toggle("hide");
      });

      if (viewMoreBtn.textContent === "View All Posts") {
        viewMoreBtn.textContent = "View Less";
      } else {
        viewMoreBtn.textContent = "View All Posts";
      }
    });
  }
}
