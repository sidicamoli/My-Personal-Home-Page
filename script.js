document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher
    const titleEn = document.getElementById('title-en');
    const titleAr = document.getElementById('title-ar');
    const contentEn = document.getElementById('content-en');
    const contentAr = document.getElementById('content-ar');
    const languageButtons = document.querySelectorAll('.language-switch button');

    function switchLanguage(lang) {
        if (lang === 'en') {
            titleEn.classList.remove('hidden');
            titleAr.classList.add('hidden');
            contentEn.classList.remove('hidden');
            contentAr.classList.add('hidden');
            document.body.dir = 'ltr';
            localStorage.setItem('language', 'en');
        } else {
            titleEn.classList.add('hidden');
            titleAr.classList.remove('hidden');
            contentEn.classList.add('hidden');
            contentAr.classList.remove('hidden');
            document.body.dir = 'rtl';
            localStorage.setItem('language', 'ar');
        }
    }

    // Set initial language based on localStorage or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    switchLanguage(savedLanguage);

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchLanguage(button.textContent.toLowerCase().includes('english') ? 'en' : 'ar');
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme
    function setTheme(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Toggle Light Mode';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Toggle Dark Mode';
        }
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        setTheme(true);
    } else {
        setTheme(false); // Default to light mode
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        setTheme(!body.classList.contains('dark-mode'));
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Remove active class from all and add to clicked
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}` ||
                        (entry.target.id.includes('-ar') && link.getAttribute('href') === `#${entry.target.id.replace('-ar', '')}`)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animate skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    const animateSkills = () => {
        skillLevels.forEach(skillBar => {
            const level = parseInt(skillBar.dataset.level);
            let percent = 0;
            switch (level) {
                case 5: percent = 100; break;
                case 4: percent = 80; break;
                case 3: percent = 60; break;
                case 2: percent = 40; break;
                case 1: percent = 20; break;
                default: percent = 0;
            }
            skillBar.style.setProperty('--skill-percent', `${percent}%`);
        });
    };

    // Trigger skill animation when skills section is in view
    const skillsSection = document.getElementById('skills') || document.getElementById('skills-ar');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(skillsSection); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 });
        skillsObserver.observe(skillsSection);
    }


    // Fade-in animation for cards on scroll
    const cards = document.querySelectorAll('.card');
    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    cards.forEach(card => {
        card.classList.add('fade-in'); // Add initial hidden state
        cardObserver.observe(card);
    });
});