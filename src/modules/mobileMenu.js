export function initMobileMenu() {
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
}
