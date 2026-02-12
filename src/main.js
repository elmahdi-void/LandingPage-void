// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// setupCounter(document.querySelector('#counter'))

let button = document.querySelector("#counter");
let html = document.querySelector("html");
if (button) {
  button.addEventListener("click", function () {
    html.classList.toggle("dark");
  });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden"); // Prevent scrolling when menu is open
  }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMobileMenu);

// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
  document.documentElement.classList.add("dark");
} else {
  if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
  document.documentElement.classList.remove("dark");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle("hidden");
    if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
}

// Slider Logic
document.addEventListener("DOMContentLoaded", function () {
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
});

// Scroll Animation for Posts
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      // Add a small delay based on the index (calculated via dataset or just reliable if order is preserved)
      // But standard interaction observer might trigger all at once.
      // let's just add the class.
      card.classList.add("visible");
      observer.unobserve(card); // Only animate once
    }
  });
}, observerOptions);

const cards = document.querySelectorAll(".posts-grid .card");
cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`; // Stagger effect
  observer.observe(card);
});

const observer2 = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const featureItem = entry.target;
      const left = featureItem.querySelector(".feature-right");
      const right = featureItem.querySelector(".feature-left");

      left.classList.add("visible");
      right.classList.add("visible");
      observer.unobserve(featureItem);
    }
  });
}, observerOptions);

const featureItems = document.querySelectorAll(".feature-item");
featureItems.forEach((featureItem, index) => {
  featureItem.style.transitionDelay = `${index * 100}ms`; // Stagger effect
  observer2.observe(featureItem);
});

// Contact Us Dropdown Toggle
const contactBtn = document.getElementById("contact-us-btn");
const contactDropdown = document.getElementById("contact-form-dropdown");

if (contactBtn && contactDropdown) {
  contactBtn.addEventListener("click", () => {
    contactDropdown.classList.toggle("active");
    if (contactDropdown.classList.contains("active")) {
      setTimeout(() => {
        contactDropdown.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  });
}


const contactForm = contactDropdown?.querySelector("form");
if (contactForm) {
  const validationPatterns = {
    name: /^[a-zA-Z\s]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{1,19}$/, 
  };

  const formInputs = {
    name: contactForm.querySelector("#name"),
    email: contactForm.querySelector("#contact-email"),
    message: contactForm.querySelector("#message"),
  };
  const errorMessages = {
    name: contactForm.querySelector(".name-error"),
    email: contactForm.querySelector(".email-error"),
    message: contactForm.querySelector(".message-error"),
  };

  formInputs.name.addEventListener("focus", () => {
    formInputs.name.classList.remove(
      "border-red-500",
      "dark:border-red-500",
      "text-red-500",
      "dark:text-red-500",
    );
  });
  formInputs.email.addEventListener("focus", () => {
    formInputs.email.classList.remove(
      "border-red-500",
      "dark:border-red-500",
      "text-red-500",
      "dark:text-red-500",
    );
  });
  formInputs.message.addEventListener("focus", () => {
    formInputs.message.classList.remove(
      "border-red-500",
      "dark:border-red-500",
      "text-red-500",
      "dark:text-red-500",
    );
  });



  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    if (!btn) return;
    const originalText = btn.textContent;

    // Simple feedback animation
    btn.textContent = "Sending...";
    btn.disabled = true;

    if (
      !formInputs.name ||
      !validationPatterns.name.test(formInputs.name.value)
    ) {
      errorMessages.name.textContent = "Please enter a valid name";
      errorMessages.name.classList.add("visible");
      formInputs.name.classList.add(
        "border-red-500",
        "dark:border-red-500",
        "text-red-500",
        "dark:text-red-500",
      );
    } else if (
      !formInputs.email ||
      !validationPatterns.email.test(formInputs.email.value)
    ) {
      errorMessages.email.textContent = "Please enter a valid email";
      errorMessages.email.classList.add("visible");
      formInputs.email.classList.add(
        "border-red-500",
        "dark:border-red-500",
        "text-red-500",
        "dark:text-red-500",
      );
    } else if (
      !formInputs.message ||
      !validationPatterns.message.test(formInputs.message.value)
    ) {
      errorMessages.message.textContent = "Message must be less than 20 characters";
      errorMessages.message.classList.add("visible");
      formInputs.message.classList.add(
        "border-red-500",
        "dark:border-red-500",
        "text-red-500",
        "dark:text-red-500",
      );
    } else {
      btn.textContent = "Message Sent!";
      btn.classList.add("bg-green-600");
      btn.classList.remove("bg-primary");
      contactForm.reset(); // Replace with actual submission logic
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.add("bg-primary");
        btn.classList.remove("bg-green-600");
        contactDropdown.classList.remove("active");
      }, 2000);
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.add("bg-primary");
      btn.classList.remove("bg-green-600");
    }, 2000);
  });
}

const viewMoreBtn = document.querySelector(".view-more-posts");
const miniToShow = 6;
if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
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
