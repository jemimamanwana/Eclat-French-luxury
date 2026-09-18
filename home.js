// Initialize Home Page Specific Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Editorial Slider
    const editorialSwiper = new Swiper('.editorial-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // Initialize ScrollReveal Animations
    const scrollRevealOption = {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        reset: true
    };

    // Featured Collections
    ScrollReveal().reveal('.collection-card:nth-child(1)', {
        ...scrollRevealOption,
        delay: 200
    });
    
    ScrollReveal().reveal('.collection-card:nth-child(2)', {
        ...scrollRevealOption,
        delay: 400
    });
    
    ScrollReveal().reveal('.collection-card:nth-child(3)', {
        ...scrollRevealOption,
        delay: 600
    });

    // Craftsmanship Section
    ScrollReveal().reveal('.craftsmanship-content', {
        ...scrollRevealOption,
        origin: 'left',
        delay: 400
    });
    
    ScrollReveal().reveal('.craftsmanship-video', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 600
    });

    // Editorial Section
    ScrollReveal().reveal('.editorial-header', {
        ...scrollRevealOption,
        origin: 'top',
        delay: 200
    });

    // Boutique Section
    ScrollReveal().reveal('.boutique-image', {
        ...scrollRevealOption,
        origin: 'left',
        delay: 400
    });
    
    ScrollReveal().reveal('.boutique-content', {
        ...scrollRevealOption,
        origin: 'right',
        delay: 600
    });

    // Video Play Button
    const playButton = document.querySelector('.craftsmanship-video .play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const video = document.querySelector('.craftsmanship-video video');
            const overlay = document.querySelector('.craftsmanship-video .video-overlay');
            
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

    // Boutique Button Animation
    const boutiqueButton = document.querySelector('.boutique-button');
    if (boutiqueButton) {
        boutiqueButton.addEventListener('click', function(e) {
            e.preventDefault();
            // You can add the same modal functionality as the private appointment button
            // or link to a contact page
            window.location.href = '#';
        });
    }
});