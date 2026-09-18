// Initialize Haute Couture Page Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Collection Slider
    const collectionSwiper = new Swiper('.collection-slider', {
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

    // Initialize ScrollReveal Animations
    const scrollRevealOption = {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        reset: true
    };

    // Hero Section
    ScrollReveal().reveal('.haute-hero-content h1', {
        ...scrollRevealOption,
        delay: 500
    });
    
    ScrollReveal().reveal('.haute-hero-content p', {
        ...scrollRevealOption,
        delay: 800
    });
    
    ScrollReveal().reveal('.haute-scroll', {
        ...scrollRevealOption,
        delay: 1100
    });

    // Couture Introduction
    ScrollReveal().reveal('.couture-intro-content', {
        ...scrollRevealOption,
        origin: 'left',
        delay: 400
    });
    
    ScrollReveal().reveal('.couture-intro-image', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 600
    });

    // Current Collection
    ScrollReveal().reveal('.section-header', {
        ...scrollRevealOption,
        origin: 'top',
        delay: 200
    });

    // Couture Process
    ScrollReveal().reveal('.process-step:nth-child(1)', {
        ...scrollRevealOption,
        delay: 200
    });
    
    ScrollReveal().reveal('.process-step:nth-child(2)', {
        ...scrollRevealOption,
        delay: 300
    });
    
    ScrollReveal().reveal('.process-step:nth-child(3)', {
        ...scrollRevealOption,
        delay: 400
    });
    
    ScrollReveal().reveal('.process-step:nth-child(4)', {
        ...scrollRevealOption,
        delay: 500
    });
    
    ScrollReveal().reveal('.process-step:nth-child(5)', {
        ...scrollRevealOption,
        delay: 600
    });
    
    ScrollReveal().reveal('.process-step:nth-child(6)', {
        ...scrollRevealOption,
        delay: 700
    });

    // Materials Library
    ScrollReveal().reveal('.material-item:nth-child(1)', {
        ...scrollRevealOption,
        delay: 200
    });
    
    ScrollReveal().reveal('.material-item:nth-child(2)', {
        ...scrollRevealOption,
        delay: 300
    });
    
    ScrollReveal().reveal('.material-item:nth-child(3)', {
        ...scrollRevealOption,
        delay: 400
    });
    
    ScrollReveal().reveal('.material-item:nth-child(4)', {
        ...scrollRevealOption,
        delay: 500
    });

    // Couture Appointment
    ScrollReveal().reveal('.appointment-content', {
        ...scrollRevealOption,
        origin: 'left',
        delay: 400
    });
    
    ScrollReveal().reveal('.appointment-image', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 600
    });

    // Couture Appointment Button
    const coutureAppointmentBtn = document.getElementById('coutureAppointment');
    if (coutureAppointmentBtn) {
        coutureAppointmentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // You can reuse the modal functionality from Eclat.js
            // or link to a contact page
            window.location.href = '#';
        });
    }
});