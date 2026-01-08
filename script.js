// script.js
// ----- DOM Elements -----
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// ----- Mobile Menu Toggle -----
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon from bars to X when active
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ----- Set Current Year in Footer -----
currentYearSpan.textContent = new Date().getFullYear();

// ----- Form Validation & Submission -----
contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');

    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Reset previous error messages and styles
    [nameError, emailError, messageError].forEach(el => el.textContent = '');
    [nameInput, emailInput, messageInput].forEach(el => el.style.borderColor = '');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required.';
        nameInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required.';
        emailInput.style.borderColor = '#ff6b6b';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required.';
        messageInput.style.borderColor = '#ff6b6b';
        isValid = false;
    }

    // If form is valid, simulate submission
    if (isValid) {
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = 'var(--color-accent)';

        // Simulate network request (replace with actual fetch/axios call)
        setTimeout(() => {
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.style.color = '#4CAF50';
            contactForm.reset(); // Clear the form
            // Reset status message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, 1500);
    } else {
        formStatus.textContent = 'Please fix the errors above.';
        formStatus.style.color = '#ff6b6b';
    }
});

// ----- Smooth Scrolling for Anchor Links -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// ----- Optional: Add a subtle hover effect to project cards -----
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(100, 108, 255, 0.1)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});