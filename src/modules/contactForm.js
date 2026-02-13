export function initContactForm() {
  const contactBtn = document.getElementById("contact-us-btn");
  const contactDropdown = document.getElementById("contact-form-dropdown");

  // Toggle contact form dropdown
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
      phone: /^\+?[0-9\s\-]{7,15}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: /^.{1,19}$/, // Note: Original code had strict check < 20 chars
    };

    const formInputs = {
      email: contactForm.querySelector("#contact-email"),
      phone: contactForm.querySelector("#phone"),
      message: contactForm.querySelector("#message"),
    };

    const errorMessages = {
      email: contactForm.querySelector(".email-error"),
      phone: contactForm.querySelector(".phone-error"),
      message: contactForm.querySelector(".message-error"),
    };

    formInputs.email?.addEventListener("focus", () => {
      formInputs.email?.classList.remove("input-error");
    });

    formInputs.message?.addEventListener("focus", () => {
      formInputs.message.classList.remove("input-error");
    });

    formInputs.phone?.addEventListener("focus", () => {
      formInputs.phone.classList.remove("input-error");
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(formInputs, errorMessages, validationPatterns, contactForm);
    });
  }
}

function submitForm(formInputs, errorMessages, validationPatterns, contactForm) {
  const contactDropdown = document.getElementById("contact-form-dropdown");
  const btn = contactForm.querySelector('button[type="submit"]');
  if (!btn) return;
  const originalText = btn.textContent;

  // Simple feedback animation
  btn.textContent = "Sending...";
  btn.disabled = true;

  if (!formInputs.phone || !validationPatterns.phone.test(formInputs.phone.value)) {
    errorMessages.phone.textContent = "Please enter a valid phone number";
    errorMessages.phone.classList.add("visible");
    formInputs.phone.classList.add("input-error");
  } else if (!formInputs.email || !validationPatterns.email.test(formInputs.email.value)) {
    errorMessages.email.textContent = "Please enter a valid email";
    errorMessages.email.classList.add("visible");
    formInputs.email.classList.add("input-error");
  } else if (!formInputs.message || !validationPatterns.message.test(formInputs.message.value)) {
    errorMessages.message.textContent = "Message must be less than 20 characters";
    errorMessages.message.classList.add("visible");
    formInputs.message.classList.add("input-error");
  } else {
    btn.textContent = "Message Sent!";
    btn.classList.add("bg-green-600");
    btn.classList.remove("bg-primary");
    contactForm.reset(); 
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.add("bg-primary");
      btn.classList.remove("bg-green-600");
      if (contactDropdown) contactDropdown.classList.remove("active");
    }, 2000);
  }
}
