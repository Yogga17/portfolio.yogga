// ============================================
// GLOBAL VARIABLES
// ============================================
let lastScrollTop = 0;
let isMenuOpen = false;
let skillsAnimated = false;
let currentProjectIndex = 0;
let portfolioItems = [];

// ============================================
// DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functions
    initLoader();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initActiveNavigation();
    initSkillsAnimation();
    initProjectFilters();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
    initKeyboardNavigation();
    initPortfolioLightbox();
    initTypingAnimation();
    initCounterAnimation();
    showKeyboardHint();
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Load images smoothly
    initImageLoading();
    
    console.log('%c👋 Selamat Datang di Portfolio Saya!', 'font-size: 20px; color: #FDB71A; font-weight: bold;');
    console.log('%c💼 Yogga Nanda Pratama', 'font-size: 14px; color: #999;');
});

// ============================================
// LOADING SCREEN
// ============================================
function initLoader() {
    const loader = document.getElementById('loading');

    window.addEventListener('load', function () {
        setTimeout(function () {
            if (loader) {
                loader.classList.add('hide');
                setTimeout(function () {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 800);
    });
}

// ============================================
// SMOOTH IMAGE LOADING
// ============================================
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            isMenuOpen = !isMenuOpen;
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');

            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 968) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    isMenuOpen = false;
                    document.body.style.overflow = '';
                }
            });
        });

        document.addEventListener('click', function (event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                isMenuOpen = false;
                document.body.style.overflow = '';
            }
        });
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// KEYBOARD NAVIGATION (SMOOTH SCROLL)
// ============================================
function initKeyboardNavigation() {
    const sections = document.querySelectorAll('section[id]');
    let currentSectionIndex = 0;
    let isScrolling = false;
    
    const sectionArray = Array.from(sections);
    
    function scrollToSection(index) {
        if (index < 0 || index >= sectionArray.length || isScrolling) {
            return;
        }
        
        isScrolling = true;
        currentSectionIndex = index;
        
        const targetSection = sectionArray[index];
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        updateActiveNav(targetSection.id);
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
    
    function updateActiveNav(sectionId) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    function getCurrentSectionIndex() {
        const scrollPosition = window.scrollY + 200;
        
        for (let i = 0; i < sectionArray.length; i++) {
            const section = sectionArray[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return i;
            }
        }
        return 0;
    }
    
    let scrollTimer;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (!isScrolling) {
                currentSectionIndex = getCurrentSectionIndex();
            }
        }, 100);
    });
    
    document.addEventListener('keydown', function (e) {
        if (e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.isContentEditable) {
            return;
        }
        
        const lightbox = document.getElementById('portfolioLightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            return;
        }
        
        switch (e.key) {
            case 'PageDown':
            case 'ArrowDown':
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
                break;
                
            case 'PageUp':
            case 'ArrowUp':
                e.preventDefault();
                scrollToSection(currentSectionIndex - 1);
                break;
                
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
                
            case 'End':
                e.preventDefault();
                scrollToSection(sectionArray.length - 1);
                break;
        }
    });
    
    currentSectionIndex = getCurrentSectionIndex();
}

// ============================================
// SHOW KEYBOARD HINT
// ============================================
function showKeyboardHint() {
    const hint = document.getElementById('keyboardHint');
    if (!hint) return;
    
    setTimeout(() => {
        hint.classList.add('show');
    }, 2000);
    
    setTimeout(() => {
        hint.classList.remove('show');
    }, 7000);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            hint.classList.add('show');
            setTimeout(() => {
                hint.classList.remove('show');
            }, 3000);
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();
}

// ============================================
// SKILLS ANIMATION
// ============================================
function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkills() {
        if (skillsAnimated) return;

        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (skillsPosition < screenPosition - 100) {
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }, index * 200);
            });
            skillsAnimated = true;
        }
    }

    if (skillsSection) {
        window.addEventListener('scroll', animateSkills);
        animateSkills();
    }
}

// ============================================
// PROJECT FILTERS
// ============================================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// PORTFOLIO LIGHTBOX
// ============================================
function initPortfolioLightbox() {
    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxLoading = document.querySelector('.lightbox-loading');
    const currentIndexEl = document.getElementById('currentIndex');
    const totalImagesEl = document.getElementById('totalImages');
    const thumbnailsContainer = document.getElementById('lightboxThumbnails');
    const projectCards = document.querySelectorAll('.project-card');
    
    portfolioItems = [];
    projectCards.forEach((card) => {
        const img = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const title = overlay ? overlay.querySelector('h3')?.textContent : 'Project';
        const description = overlay ? overlay.querySelector('p')?.textContent : '';
        const category = card.getAttribute('data-category') || 'Design';
        
        portfolioItems.push({
            title: title,
            description: description,
            category: category,
            image: img.src
        });
    });
    
    if (totalImagesEl) {
        totalImagesEl.textContent = portfolioItems.length;
    }
    
    function generateThumbnails() {
        if (!thumbnailsContainer) return;
        
        thumbnailsContainer.innerHTML = '';
        portfolioItems.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-item';
            if (index === currentProjectIndex) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => showImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    function openLightbox(index) {
        currentProjectIndex = index;
        updateLightboxContent();
        generateThumbnails();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showImage(index) {
        currentProjectIndex = index;
        updateLightboxContent();
        updateThumbnails();
    }
    
    function updateLightboxContent() {
        const item = portfolioItems[currentProjectIndex];
        
        if (item) {
            if (lightboxLoading) {
                lightboxLoading.classList.add('active');
            }
            
            const img = new Image();
            img.onload = function() {
                lightboxImage.src = item.image;
                lightboxImage.alt = item.title;
                if (lightboxLoading) {
                    lightboxLoading.classList.remove('active');
                }
            };
            img.src = item.image;
            
            if (lightboxTitle) lightboxTitle.textContent = item.title;
            if (lightboxDescription) lightboxDescription.textContent = item.description;
            if (lightboxCategory) lightboxCategory.textContent = item.category.toUpperCase();
            
            if (currentIndexEl) currentIndexEl.textContent = currentProjectIndex + 1;
            
            if (lightboxPrev) lightboxPrev.disabled = currentProjectIndex === 0;
            if (lightboxNext) lightboxNext.disabled = currentProjectIndex === portfolioItems.length - 1;
        }
    }
    
    function updateThumbnails() {
        if (!thumbnailsContainer) return;
        
        const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumb, index) => {
            if (index === currentProjectIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    function previousImage() {
        if (currentProjectIndex > 0) {
            showImage(currentProjectIndex - 1);
        }
    }
    
    function nextImage() {
        if (currentProjectIndex < portfolioItems.length - 1) {
            showImage(currentProjectIndex + 1);
        }
    }
    
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && !e.target.classList.contains('project-card')) {
                return;
            }
            e.preventDefault();
            openLightbox(index);
        });
        
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', previousImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextImage();
                } else {
                    previousImage();
                }
            }
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .service-card, .resume-item, .contact-info-item');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');

    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: var(--bg-dark);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 5px 20px rgba(253, 183, 26, 0.4);
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopButton.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 30px rgba(253, 183, 26, 0.6)';
    });

    backToTopButton.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(253, 183, 26, 0.4)';
    });
}

// ============================================
// TYPING ANIMATION
// ============================================
function initTypingAnimation() {
    const subtitleElement = document.querySelector('.subtitle');
    if (!subtitleElement) return;

    const text = subtitleElement.textContent;
    subtitleElement.textContent = '';

    let charIndex = 0;

    function typeCharacter() {
        if (charIndex < text.length) {
            subtitleElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 100);
        }
    }

    setTimeout(typeCharacter, 1500);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const projectCount = document.querySelector('.project-count h3');
    if (!projectCount) return;

    const targetNumber = 50;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let currentNumber = 0;
    let hasAnimated = false;

    function updateCounter() {
        const projectCountPosition = projectCount.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (projectCountPosition < screenPosition && !hasAnimated) {
            hasAnimated = true;

            const counter = setInterval(() => {
                currentNumber += increment;

                if (currentNumber >= targetNumber) {
                    projectCount.textContent = `${targetNumber}+ Projek selesai`;
                    clearInterval(counter);
                } else {
                    projectCount.textContent = `${Math.floor(currentNumber)}+ Projek selesai`;
                }
            }, 16);
        }
    }

    window.addEventListener('scroll', updateCounter);
    updateCounter();
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitButton = document.getElementById('submitBtn');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Mengirim...';
            submitButton.disabled = true;

            const formData = new FormData(contactForm);
            formData.append("from_name", "Portfolio Kontak Website");

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    showNotification('✅ Pesan berhasil terkirim! Terima kasih.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('❌ Gagal mengirim pesan. Silakan coba lagi.', 'error');
                }

            } catch (error) {
                showNotification('❌ Terjadi kesalahan. Silakan coba lagi.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-size: 14px;
        font-weight: 600;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// ANIMATIONS KEYFRAMES
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// RESIZE HANDLER
// ============================================
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (window.innerWidth > 968 && isMenuOpen) {
            const navMenu = document.getElementById('navMenu');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');

            if (navMenu && mobileMenuBtn) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                isMenuOpen = false;
                document.body.style.overflow = '';
            }
        }
    }, 250);
});