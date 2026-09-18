// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const container = document.querySelector('.container');
    
    // Simulate loading delay
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        container.classList.add('loaded');
        
        // Initialize animations after preloader hides
        setTimeout(() => {
            initAnimations();
            initSwiper();
        }, 500);
    }, 2500);
});

// Menu Toggle
const container = document.querySelector('.container');
const menuIcon = document.querySelector('.menu-icon');
const headingRight = document.querySelector('.main-heading-right');
const headingLeft = document.querySelector('.main-heading-left');

menuIcon.addEventListener('click', () => {
    container.classList.toggle('navigate');
});

// Responsive Design
const responsiveDesign = () => {
    if (window.innerWidth <= 700) {
        headingRight.style.display = 'none';
        headingLeft.textContent = 'ÉCLAT';
        headingLeft.style.opacity = '0.1';
        headingLeft.style.color = 'var(--gold)';
    } else {
        headingRight.style.display = 'block';
        headingLeft.textContent = 'É';
        headingLeft.style.opacity = '0.05';
        headingLeft.style.color = 'var(--gray)';
    }
};

window.addEventListener('resize', () => {
    responsiveDesign();
});

responsiveDesign();

// Initialize Animations
function initAnimations() {
    const scrollRevealOption = {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        reset: true
    };
    
    // Header elements
    ScrollReveal().reveal('.main-heading-left', {
        ...scrollRevealOption,
        origin: 'left',
        delay: 300
    });
    
    ScrollReveal().reveal('.main-heading-right', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 600
    });
    
    ScrollReveal().reveal('.about h1', {
        ...scrollRevealOption,
        delay: 900
    });
    
    ScrollReveal().reveal('.about p', {
        ...scrollRevealOption,
        delay: 1200
    });
    
    ScrollReveal().reveal('.link', {
        ...scrollRevealOption,
        delay: 1500
    });
    
    ScrollReveal().reveal('.season', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 1800
    });
    
    // Section headers
    ScrollReveal().reveal('.section-header', {
        ...scrollRevealOption,
        origin: 'top',
        delay: 200
    });
    
    // Couture section
    ScrollReveal().reveal('.couture-swiper', {
        ...scrollRevealOption,
        delay: 400
    });
    
    // Heritage section
    ScrollReveal().reveal('.heritage-content', {
        ...scrollRevealOption,
        origin: 'left',
        delay: 400
    });
    
    ScrollReveal().reveal('.heritage-image', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 600
    });
    
    // Materials section
    ScrollReveal().reveal('.material-card:nth-child(1)', {
        ...scrollRevealOption,
        delay: 200
    });
    
    ScrollReveal().reveal('.material-card:nth-child(2)', {
        ...scrollRevealOption,
        delay: 400
    });
    
    ScrollReveal().reveal('.material-card:nth-child(3)', {
        ...scrollRevealOption,
        delay: 600
    });
    
    ScrollReveal().reveal('.material-card:nth-child(4)', {
        ...scrollRevealOption,
        delay: 800
    });
    
    // Newsletter section
    ScrollReveal().reveal('.newsletter-container', {
        ...scrollRevealOption,
        delay: 400
    });
}

// Initialize Swiper
function initSwiper() {
    const coutureSwiper = new Swiper('.couture-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// Private Appointment Button
const privateAppointmentBtn = document.getElementById('privateAppointment');
privateAppointmentBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'appointment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Request a Private Appointment</h2>
            <p>Our personal stylists will guide you through our collections in the privacy of our Paris atelier.</p>
            <form class="appointment-form">
                <div class="form-group">
                    <input type="text" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                    <input type="tel" placeholder="Phone Number" required>
                </div>
                <div class="form-group">
                    <select required>
                        <option value="" disabled selected>Preferred Location</option>
                        <option value="paris">Paris</option>
                        <option value="london">London</option>
                        <option value="new-york">New York</option>
                        <option value="dubai">Dubai</option>
                        <option value="tokyo">Tokyo</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea placeholder="Special Requests (Optional)"></textarea>
                </div>
                <button type="submit">Submit Request</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add styles to modal
    const style = document.createElement('style');
    style.textContent = `
        .appointment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: var(--white-off);
            padding: 5rem;
            max-width: 60rem;
            width: 90%;
            position: relative;
            animation: modalFadeIn 0.5s ease;
        }
        
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .close-modal {
            position: absolute;
            top: 2rem;
            right: 2rem;
            font-size: 3rem;
            cursor: pointer;
            color: var(--gray-light);
            transition: var(--transition);
        }
        
        .close-modal:hover {
            color: var(--gold);
        }
        
        .modal-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 400;
            color: var(--gray);
            margin-bottom: 2rem;
            letter-spacing: 0.2rem;
        }
        
        .modal-content p {
            font-size: 1.6rem;
            color: var(--gray-light);
            margin-bottom: 4rem;
            line-height: 1.8;
            font-weight: 300;
        }
        
        .form-group {
            margin-bottom: 2rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.4rem;
            color: var(--gray);
            background-color: transparent;
            border: 1px solid var(--gray-light);
            transition: var(--transition);
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--gold);
        }
        
        .form-group textarea {
            height: 15rem;
            resize: none;
        }
        
        .modal-content button {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.4rem;
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            background-color: var(--gold);
            color: var(--white);
            border: none;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .modal-content button:hover {
            background-color: var(--gold-dark);
        }
    `;
    
    document.head.appendChild(style);
    
    // Form submission
    const form = modal.querySelector('.appointment-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = form.querySelector('button');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Request Sent';
            submitBtn.style.backgroundColor = 'var(--gray)';
            
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Your appointment request has been submitted. Our team will contact you shortly.';
                
                document.body.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                    
                    setTimeout(() => {
                        document.body.removeChild(successMsg);
                    }, 500);
                }, 5000);
                
                // Add styles to success message
                const successStyle = document.createElement('style');
                successStyle.textContent = `
                    .success-message {
                        position: fixed;
                        bottom: 3rem;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: var(--gold);
                        color: var(--white);
                        padding: 2rem 3rem;
                        border-radius: 0.5rem;
                        font-size: 1.4rem;
                        opacity: 0;
                        transition: opacity 0.5s ease;
                        z-index: 1000;
                        max-width: 90%;
                        text-align: center;
                    }
                    
                    .success-message.show {
                        opacity: 1;
                    }
                `;
                
                document.head.appendChild(successStyle);
            }, 1500);
        }, 1500);
    });
});

// Material Card Hover Effect
const materialCards = document.querySelectorAll('.material-card');
materialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const info = this.querySelector('.material-info');
        info.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', function() {
        const info = this.querySelector('.material-info');
        info.style.transform = 'translateY(100%)';
    });
});

// Newsletter Form Animation
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = newsletterForm.querySelector('input');

newsletterInput.addEventListener('focus', function() {
    newsletterForm.style.borderBottomColor = 'var(--gold)';
});

newsletterInput.addEventListener('blur', function() {
    newsletterForm.style.borderBottomColor = 'var(--gray-light)';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Video Play Button
const playButton = document.querySelector('.play-button');
if (playButton) {
    playButton.addEventListener('click', function() {
        const video = document.querySelector('.atelier-video video');
        const overlay = document.querySelector('.video-overlay');
        
        if (video.paused) {
            video.play();
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
        } else {
            video.pause();
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        }
    });
}

// Footer Year Update
const yearElement = document.querySelector('footer .footer-legal span');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Eclat. All rights reserved.`;
}