export function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  // Posts Animation
  const PostsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add("visible");
        observer.unobserve(card); // Only animate once
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll(".posts-grid .card");

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
    PostsObserver.observe(card);
  });

  // Features Animation
  const FeaturesObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const featureItem = entry.target;
        const left = featureItem.querySelector(".feature-right");
        const right = featureItem.querySelector(".feature-left");

        if (left) left.classList.add("visible");
        if (right) right.classList.add("visible");
        observer.unobserve(featureItem);
      }
    });
  }, observerOptions);

  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach((featureItem, index) => {
    featureItem.style.transitionDelay = `${index * 100}ms`;
    FeaturesObserver.observe(featureItem);
  });
}
