import { initMobileMenu } from './modules/mobileMenu.js';
import { initThemeToggle } from './modules/themeToggle.js';
import { initSlider } from './modules/slider.js';
import { initAnimations } from './modules/animations.js';
import { initContactForm } from './modules/contactForm.js';
import { initViewMore } from './modules/posts.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSlider(); 
  initAnimations();
  initContactForm();
  initViewMore();
});

// Theme toggle needs to run immediately to prevent flash of wrong theme
initThemeToggle();
