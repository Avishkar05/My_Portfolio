// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Function to check if the user is on a touch device
    function isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }

    // ----------------------------------------------------------------
    // THEME (DARK/LIGHT MODE) TOGGLE
    // ----------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on initial load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme'); // Default to light
    }

    // Add click event listener to the theme toggle button
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });

    // ----------------------------------------------------------------
    // MOBILE MENU TOGGLE
    // ----------------------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // ----------------------------------------------------------------
    // PROJECT FILTERING LOGIC
    // ----------------------------------------------------------------
    const filterContainer = document.querySelector('.project-filters');
    if (filterContainer) {
        const projectCards = document.querySelectorAll('.project-card');
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filterValue = e.target.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            }
        });
    }


    // ----------------------------------------------------------------
    // AOS (ANIMATE ON SCROLL) INITIALIZATION
    // ----------------------------------------------------------------
    AOS.init({
        duration: 800, // Animation duration
        once: true,    // Animate only once
        offset: 50,    // Trigger animations a little sooner
    });

    // ----------------------------------------------------------------
    // TYPED.JS INITIALIZATION
    // ----------------------------------------------------------------
    const typedOptions = {
        strings: ['Full Stack Developer', 'Java Specialist', 'Spring Boot Expert', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        loop: true
    };
    new Typed('#typed-text', typedOptions);

    // ----------------------------------------------------------------
    // CUSTOM CURSOR LOGIC (only for non-touch devices)
    // ----------------------------------------------------------------
    if (!isTouchDevice()) {
        const cursor = document.querySelector('.custom-cursor');
        cursor.style.display = 'block'; // Show the cursor

        const linksAndButtons = document.querySelectorAll('a, button');

        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        linksAndButtons.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });
    }


});