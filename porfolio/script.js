// ============================================
// Portfolio Website - JavaScript Functionality
// Simple and easy to understand code
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    

    // Form Validation + Submit (Contact Page)
    const contactForm = document.getElementById('contactForm');
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree endpoint
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default submit for custom handling
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Reset previous error messages
            clearErrors();
            
            // Validation flags
            let isValid = true;
            
            // Validate Name
            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!emailPattern.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Message
            if (message === '') {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, send via Formspree
            if (isValid) {
                sendContactForm(new FormData(contactForm), submitBtn);
            }
        });
    }
    
    // Helper Functions for Form Validation and Submission
    
    // Function to show error message
    function showError(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        field.classList.add('is-invalid');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }
    
    // Function to clear all error messages
    function clearErrors() {
        const fields = ['name', 'email', 'message'];
        fields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            if (field) {
                field.classList.remove('is-invalid');
            }
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
    
    // Function to set form status messages
    function setFormStatus(type, message) {
        const formMessage = document.getElementById('formMessage');
        if (!formMessage) return;
        
        let alertClass = 'alert-info';
        if (type === 'success') alertClass = 'alert-success';
        if (type === 'error') alertClass = 'alert-danger';
        
        formMessage.innerHTML = '<div class="alert ' + alertClass + '">' + message + '</div>';
    }
    // Function to send form data to Formspree
    function sendContactForm(formData, submitBtn) {
        setFormStatus('info', 'Sending your message...');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(function(response) {
            if (response.ok) {
                setFormStatus('success', 'Thank you! Your message has been sent.');
                contactForm.reset();
            } else {
                return response.json().then(function(data) {
                    throw new Error(data.error || 'Unable to send message right now.');
                });
            }
        })
        .catch(function(error) {
            console.error('Contact form submission error:', error);
            setFormStatus('error', 'Sorry, there was a problem sending your message. Please try again later.');
        })
        .finally(function() {
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        });
    }
    
    
    // Resume Download Button (About Page)
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Force download of the resume file without opening a new tab
            const link = document.createElement('a');
            link.href = 'Resume.pdf';
            link.download = 'Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Only apply smooth scroll for same-page anchors
            if (this.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Skill Cards Animation on Scroll (Home Page)
    // ============================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add animation class when cards come into view
    function animateOnScroll() {
        skillCards.forEach(function(card) {
            if (isInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize skill cards with hidden state
    skillCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Check on page load
    animateOnScroll();
    
    // ============================================
    // Project Cards Hover Effect Enhancement
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            // Add additional visual feedback
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ============================================
    // Console Message (Optional)
    // ============================================
    console.log('Portfolio website loaded successfully!');
    
});

