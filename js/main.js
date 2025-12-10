// Ensure dark mode is always applied
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    html.classList.add('dark');
    html.classList.remove('light');

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll for anchor links with fade transition
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Add fade effect
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(20px)';
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    setTimeout(() => {
                        target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, 100);
                }
            }
        });
    });

    // Space-themed page transition on navigation
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only add transition if navigating to different page
            if (href && !href.startsWith('#') && href !== window.location.pathname.split('/').pop()) {
                // Add warp exit effect
                document.body.classList.add('page-exit');
                document.body.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Create star trail effect
                const trail = document.createElement('div');
                trail.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(0,255,209,0.1) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 9999;
                    animation: fadeIn 0.4s ease-out reverse;
                `;
                document.body.appendChild(trail);
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
            lastScroll = currentScroll;
        });
    }
});

// Terminal cursor animation for inputs
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('terminal-cursor');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('terminal-cursor');
        });
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-20 right-4 bg-retro-emerald/20 border-2 border-retro-emerald text-retro-emerald px-6 py-4 z-50';
            successMessage.textContent = 'Message sent successfully!';
            document.body.appendChild(successMessage);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Intersection Observer for fade-in animations with staggered delays
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add space-themed fade-in animation with staggered delay
                entry.target.style.animationDelay = `${index * 0.15}s`;
                entry.target.style.transformStyle = 'preserve-3d';
                entry.target.classList.add('fade-in');
                entry.target.classList.remove('opacity-0');
                
                // Add subtle star trail effect
                if (entry.target.classList.contains('project-card') || entry.target.classList.contains('blog-card')) {
                    entry.target.style.position = 'relative';
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .manga-panel, .project-card, .blog-card').forEach((el, index) => {
        el.classList.add('opacity-0');
        observer.observe(el);
    });

    // Remove the glow pulse animation - keeping it subtle
});

// Subtle parallax effect - text stays fixed but responds to mouse
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.getElementById('hero-content');
    if (!heroContent) return;

    // Subtle mouse parallax for depth
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateParallax() {
        currentX += (mouseX - currentX) * 0.03;
        currentY += (mouseY - currentY) * 0.03;

        // Subtle parallax rotation (text tilts slightly)
        const rotateX = currentY * 1;
        const rotateY = currentX * 1;
        const translateX = currentX * 10;
        const translateY = currentY * 10;

        // Text stays fixed in position, only subtle parallax movement
        heroContent.style.transform = `
            perspective(1000px) 
            translateX(${translateX}px)
            translateY(${translateY}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

        requestAnimationFrame(animateParallax);
    }

    animateParallax();
});

// Astronaut character controller
document.addEventListener('DOMContentLoaded', () => {
    const astronaut = document.getElementById('astronaut');
    const astronautSprite = document.getElementById('astronaut-sprite');
    if (!astronaut || !astronautSprite) return;

    const animations = {
        idle: './assets/patterns/astronut/jade-guilbot-astronaute-idle-gif.gif',
        walk: './assets/patterns/astronut/jade-guilbot-astronaute-walk-gif.gif',
        jump: './assets/patterns/astronut/jade-guilbot-astronaute-jump-gif.gif',
        dash: './assets/patterns/astronut/jade-guilbot-astronaute-dash-gif.gif',
        death: './assets/patterns/astronut/jade-guilbot-astronaute-death-gif.gif'
    };

    let currentState = 'walk';
    let isInteracting = false;
    let walkCycle = 0;
    let idleTimeout = null;

    // Set animation based on state
    function setAnimation(state) {
        currentState = state;
        astronautSprite.src = animations[state] || animations.walk;
        
        // Remove all state classes
        astronaut.classList.remove('idle', 'jumping');
        
        // Apply state-specific class and behavior
        switch(state) {
            case 'idle':
                astronaut.classList.add('idle');
                astronaut.style.animationPlayState = 'paused';
                break;
            case 'jump':
                astronaut.classList.add('jumping');
                astronaut.style.animationPlayState = 'paused';
                setTimeout(() => {
                    if (currentState === 'jump') {
                        setAnimation('walk');
                    }
                }, 1000); // Jump animation duration
                break;
            case 'walk':
            default:
                astronaut.style.animationDuration = '20s';
                astronaut.style.animationPlayState = 'running';
                astronaut.style.opacity = '1';
                break;
        }
    }

    // Random idle state
    function randomIdle() {
        if (currentState === 'walk' && !isInteracting && Math.random() < 0.3) {
            setAnimation('idle');
            // Return to walking after random time
            const idleDuration = 2000 + Math.random() * 3000;
            idleTimeout = setTimeout(() => {
                if (currentState === 'idle') {
                    setAnimation('walk');
                }
            }, idleDuration);
        }
    }

    // Click handler - random action
    astronaut.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering other click handlers
        
        if (isInteracting) return; // Prevent multiple clicks during animation
        isInteracting = true;

        // Random action: jump
        const action = 'jump';

        setAnimation(action);

        // Reset interaction flag after animation
        setTimeout(() => {
            isInteracting = false;
        }, 2000);
    });

    // Reset astronaut position when animation completes
    astronaut.addEventListener('animationiteration', () => {
        if (currentState === 'walk') {
            walkCycle++;
            // Occasionally change speed or add variation
            if (walkCycle % 3 === 0) {
                const newDuration = 18 + Math.random() * 4;
                astronaut.style.animationDuration = `${newDuration}s`;
            }
            
            // Random idle chance
            if (Math.random() < 0.1) {
                randomIdle();
            }
        }
    });

    // Random idle check every few seconds
    setInterval(() => {
        if (currentState === 'walk' && !isInteracting) {
            randomIdle();
        }
    }, 5000);

    // Initial state
    setAnimation('walk');
});

