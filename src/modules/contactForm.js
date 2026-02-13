export function initContactForm() {
  const contactBtn = document.getElementById("contact-us-btn");
  const contactDropdown = document.getElementById("contact-form-dropdown");

  // Toggle contact form dropdown
  if (contactBtn && contactDropdown) {
    contactBtn.addEventListener("click", () => {
      contactDropdown.classList.toggle("active");
      if (contactDropdown.classList.contains("active")) {
        setTimeout(() => {
          contactDropdown.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
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

    const errorMessages = {
      phone: "Please enter a valid phone number",
      email: "Please enter a valid email",
      message: "Message must be less than 20 characters",
    };

    const formInputs = contactForm.querySelectorAll("input, textarea");
    let errorElement = {};
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input?.classList.remove("input-error");
      });
      errorElement[input.id] = contactForm.querySelector(`.${input.id}-error`);
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(
        formInputs,
        errorElement,
        errorMessages,
        validationPatterns,
        contactForm,
      );
    });
  }
}

function submitForm(
  formInputs,
  errorElement,
  errorMessages,
  validationPatterns,
  contactForm,
) {
  const btn = contactForm.querySelector('button[type="submit"]');
  if (!btn) return;
  const originalText = btn.textContent;

  // Simple feedback animation
  btn.textContent = "Sending...";
  btn.disabled = true;

    setTimeout(() => {
      let error = false;
    formInputs.forEach((input) => {
      const fieldName = input.id;
      if (!input.value || !validationPatterns[fieldName].test(input.value)) {
        errorElement[fieldName].textContent = errorMessages[fieldName];
        errorElement[fieldName]?.classList.add("visible");
          input.classList.add("input-error");
          error = true;
      } else {
        errorElement[fieldName].textContent = "";
        errorElement[fieldName]?.classList.remove("visible");
        input?.classList.remove("input-error");
      }
    });
      
        if (!error) {
          btn.textContent = "Message Sent!";
          btn.classList.remove("bg-primary");
        btn.classList.add("bg-green-600");
        contactForm.reset();
        }
      
      setTimeout(() => {
      btn.classList.add("bg-primary");
      btn.classList.remove("bg-green-600");
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1000);
  }, 2000);

}
