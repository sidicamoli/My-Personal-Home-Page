// ==========================================
// PROFESSIONAL PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initializeTheme();
  initializeLanguage();
  setupScrollAnimations();
  setupNavigationHighlight();
  setupSmoothScroll();
  setupScrollEffects();
});

// ==========================================
// THEME MANAGEMENT
// ==========================================

function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');
  
  // Update button icon
  const themeBtn = document.querySelector('.theme-btn i');
  if (themeBtn) {
    themeBtn.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  // Save to localStorage
  localStorage.setItem('darkMode', isDarkMode);
}

function initializeTheme() {
  // Check saved preference
  const savedTheme = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme
  if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
    document.body.classList.add('dark-mode');
    const themeBtn = document.querySelector('.theme-btn i');
    if (themeBtn) {
      themeBtn.className = 'fas fa-sun';
    }
  }
}

// ==========================================
// LANGUAGE SWITCHER
// ==========================================

function switchLang(lang) {
  const contentEn = document.getElementById('content-en');
  const contentAr = document.getElementById('content-ar');
  const html = document.documentElement;
  
  if (lang === 'ar') {
    // Show Arabic content
    if (contentEn) contentEn.classList.add('hidden');
    if (contentAr) contentAr.classList.remove('hidden');
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    // Show English content
    if (contentEn) contentEn.classList.remove('hidden');
    if (contentAr) contentAr.classList.add('hidden');
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }
  
  // Save preference
  localStorage.setItem('language', lang);
  
  // Re-initialize scroll animations for newly visible content
  setTimeout(setupScrollAnimations, 100);
}

function initializeLanguage() {
  const savedLang = localStorage.getItem('language') || 'en';
  switchLang(savedLang);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function setupScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  
  // Clear previous observers
  if (window.sectionObserver) {
    sections.forEach(section => window.sectionObserver.unobserve(section));
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  window.sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    window.sectionObserver.observe(section);
  });
}

// ==========================================
// NAVIGATION HIGHLIGHT
// ==========================================

function setupNavigationHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  if (sections.length === 0) return;
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-20% 0px -70% 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current link
        const cleanId = id.replace('-ar', '');
        const activeLink = document.querySelector(`.nav-link[href="#${cleanId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize theme from saved preference
  initializeTheme();
  
  // Initialize language from saved preference
  initializeLanguage();
  
  // Setup scroll animations
  setupScrollAnimations();
  
  // Setup navigation highlighting
  setupNavigationHighlight();
  
  // Animate skill bars when visible
  animateSkillBars();
  
  // Smooth scroll for navigation links
  setupSmoothScroll();
});

// Theme Toggle Function
function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');
  
  // Update theme button icon
  const themeBtn = document.querySelector('.theme-btn i');
  if (isDarkMode) {
    themeBtn.className = 'fas fa-sun';
  } else {
    themeBtn.className = 'fas fa-moon';
  }
  
  // Save preference
  localStorage.setItem('darkMode', isDarkMode);
}

// Initialize Theme
function initializeTheme() {
  const savedTheme = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'true' || (savedTheme === null && prefersDark)) {
    document.body.classList.add('dark-mode');
    const themeBtn = document.querySelector('.theme-btn i');
    if (themeBtn) {
      themeBtn.className = 'fas fa-sun';
    }
  }
}

// Language Switcher
function switchLang(lang) {
  const contentEn = document.getElementById('content-en');
  const contentAr = document.getElementById('content-ar');
  const navEn = document.getElementById('nav-en');
  const navAr = document.getElementById('nav-ar');
  const html = document.documentElement;
  
  if (lang === 'ar') {
    contentEn.classList.add('hidden');
    contentAr.classList.remove('hidden');
    navEn.classList.add('hidden');
    navAr.classList.remove('hidden');
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
  } else {
    contentEn.classList.remove('hidden');
    contentAr.classList.add('hidden');
    navEn.classList.remove('hidden');
    navAr.classList.add('hidden');
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
  }
  
  // Save preference
  localStorage.setItem('language', lang);
  
  // Re-initialize navigation highlighting for new language
  setupNavigationHighlight();
}

// Initialize Language
function initializeLanguage() {
  const savedLang = localStorage.getItem('language') || 'en';
  switchLang(savedLang);
}

// Setup Scroll Animations
function setupScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Setup Navigation Highlight
function setupNavigationHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-20% 0px -70% 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current link
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animate Skill Bars
function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        
        // Animate width
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 100);
        
        // Stop observing after animation
        observer.unobserve(fill);
      }
    });
  }, observerOptions);
  
  skillFills.forEach(fill => {
    observer.observe(fill);
  });
}

// Setup Smooth Scroll
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 100;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add scroll-to-top functionality (optional)
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 4px 12px var(--shadow)';
  } else {
    header.style.boxShadow = '0 1px 3px var(--shadow)';
  }
});
// ==========================================
// SCROLL EFFECTS
// ==========================================

function setupScrollEffects() {
  let lastScroll = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add resize listener with debounce
window.addEventListener('resize', debounce(function() {
  setupScrollAnimations();
}, 250));

// Expose functions to global scope for onclick handlers
window.toggleTheme = toggleTheme;
window.switchLang = switchLang;