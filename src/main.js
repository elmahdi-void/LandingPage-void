// Mobile Menu Toggle

function toggleMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden"); // Prevent scrolling when menu is open
  }
}

function toggletheme() {
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
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
}
const ActivateSlider = () => {
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
};

const submitForm =  (formInputs, errorMessages, validationPatterns, contactForm) => {
  
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
      formInputs.name.classList.add("input-error");
    } else if (
      !formInputs.email ||
      !validationPatterns.email.test(formInputs.email.value)
    ) {
      errorMessages.email.textContent = "Please enter a valid email";
      errorMessages.email.classList.add("visible");
      formInputs.email.classList.add("input-error");
    } else if (
      !formInputs.message ||
      !validationPatterns.message.test(formInputs.message.value)
    ) {
      errorMessages.message.textContent =
        "Message must be less than 20 characters";
      errorMessages.message.classList.add("visible");
      formInputs.message.classList.add("input-error");
    } else if (
      !formInputs.phone ||
      !validationPatterns.phone.test(formInputs.phone.value)
    ) {
      errorMessages.phone.textContent = "Please enter a valid phone number";
      errorMessages.phone.classList.add("visible");
      formInputs.phone.classList.add("input-error");
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
};
  



// ################### Mobile Menu Toggle Logic #######################
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMobileMenu);

// ################## Dark Mode Toggle Logic #######################
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
  themeToggleBtn.addEventListener("click", toggletheme);
}

// ####################  Slider Logic #######################
document.addEventListener("DOMContentLoaded", ActivateSlider);

// ####################  Scroll Animations Logic #######################

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

      left.classList.add("visible");
      right.classList.add("visible");
      observer.unobserve(featureItem);
    }
  });
}, observerOptions);

const featureItems = document.querySelectorAll(".feature-item");
featureItems.forEach((featureItem, index) => {
  featureItem.style.transitionDelay = `${index * 100}ms`;
  FeaturesObserver.observe(featureItem);
});

// ####################  Contact Form Logic #######################

// Toggle contact form dropdown
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
    phone : /^\+?[0-9\s\-]{7,15}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: /^.{1,19}$/,
  };

  const formInputs = {
    name: contactForm.querySelector("#name"),
    email: contactForm.querySelector("#contact-email"),
    phone: contactForm.querySelector("#phone"),
    message: contactForm.querySelector("#message"),
  };

  const errorMessages = {
    name: contactForm.querySelector(".name-error"),
    email: contactForm.querySelector(".email-error"),
    phone: contactForm.querySelector(".phone-error"),
    message: contactForm.querySelector(".message-error"),
  };

  formInputs.name.addEventListener("focus", () => {
    formInputs.name.classList.remove("input-error");
  });
  
  formInputs.email.addEventListener("focus", () => {
    formInputs.email.classList.remove("input-error");
  });

  formInputs.message.addEventListener("focus", () => {
    formInputs.message.classList.remove("input-error");
  });

  formInputs.phone.addEventListener("focus", () => {
    formInputs.phone.classList.remove("input-error");
  });

  
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm(formInputs, errorMessages, validationPatterns,contactForm);
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
