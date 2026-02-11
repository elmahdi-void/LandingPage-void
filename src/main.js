// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// setupCounter(document.querySelector('#counter'))

let button = document.querySelector('#counter')
let html = document.querySelector('html')
if (button) {
  button.addEventListener('click', function() {
    html.classList.toggle('dark')
  })
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
  }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);

// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
  document.documentElement.classList.add('dark');
} else {
  if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
  document.documentElement.classList.remove('dark');
}

if(themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function() {
    // toggle icons inside button
    if(themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
    if(themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
  });
}

// Slider Logic
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelector('.slides');
  const slide = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

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

    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }
});

