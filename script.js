
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

        // Fake network request
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

// ----- Add a slight hover effect to project cards -----
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(100, 108, 255, 0.1)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ----- Skills Carousel -----
function initSkillsCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');
    
    // Skills data - the icons that move
    const skills = [
        { name: "Git", icon: "fab fa-git-alt", level: "Intermediate" },
        { name: "Node.js", icon: "fab fa-node-js", level: "Intermediate" },
        { name: "SQL", icon: "fas fa-database", level: "Intermediate" },
        { name: "Python", icon: "fab fa-python", level: "Advanced" },
        { name: "JavaScript", icon: "fab fa-js-square", level: "Advanced" },
        { name: "HTML", icon: "fab fa-html5", level: "Advanced" },
        { name: "CSS3", icon: "fab fa-css3-alt", level: "Advanced" },
    ];
    
    let currentIndex = 0;
    const itemsPerView = 3; // Number of skills visible at once
    let autoSlideInterval;
    
    // Create skill items
    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <span class="skill-name">${skill.name}</span>
            <span class="skill-level">${skill.level}</span>
        `;
        carouselTrack.appendChild(skillItem);
    });
    
    // Create dots
    const totalDots = Math.min(skills.length - itemsPerView + 1, 4);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.dataset.index = i;
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }
    
    // Update carousel position
    function updateCarousel() {
        const itemWidth = 160 + 16; // width + gap
        const translateX = -currentIndex * itemWidth;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update active dot
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Show/hide buttons based on position
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
        
        nextBtn.style.opacity = currentIndex >= skills.length - itemsPerView ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex >= skills.length - itemsPerView ? 'default' : 'pointer';
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < skills.length - itemsPerView) {
            currentIndex++;
            updateCarousel();
        } else {
            currentIndex = 0; // Loop back to start
            updateCarousel();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            currentIndex = skills.length - itemsPerView; // Loop to end
            updateCarousel();
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index >= 0 && index <= skills.length - itemsPerView) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    // Start auto-rotation
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // Change every 3 seconds
        nextBtn.classList.add('auto-rotating');
    }
    
    // Stop auto-rotation on hover
    carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
        nextBtn.classList.remove('auto-rotating');
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Button event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        setTimeout(startAutoSlide, 5000); // Restart after 5 seconds
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        setTimeout(startAutoSlide, 5000); // Restart after 5 seconds
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextSlide(); // Swipe left = next
            } else {
                prevSlide(); // Swipe right = previous
            }
        }
        setTimeout(startAutoSlide, 3000);
    });
    
    // Initialize
    updateCarousel();
    startAutoSlide();
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initSkillsCarousel);