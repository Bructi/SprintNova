// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Navbar Scroll & Shrink Functionality ---
    const navbar = document.querySelector('.navbar');
    
    // Check if navbar exists on the page
    if (navbar) {
        window.addEventListener('scroll', () => {
            // Add 'scrolled' class if user scrolls more than 50px
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- 4. NAVBAR MOBILE TOGGLE ---
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-container nav ul');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            // Toggle the 'open' class to show/hide the nav links
            navLinks.classList.toggle('open');
            
            // Change hamburger icon to 'X' and back
            if (navLinks.classList.contains('open')) {
                toggle.innerHTML = '&times;'; // 'X' icon
            } else {
                toggle.innerHTML = '&#9776;'; // '☰' icon
            }
        });
    }

});