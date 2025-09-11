/**
 * Modern Swiper.js Implementation
 * Replaces Owl Carousel with Swiper.js 11.x latest APIs
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Check if Swiper is loaded
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper.js not loaded');
            return;
        }

        // Initialize all carousel/slider elements
        initializeCarousels();
        
        function initializeCarousels() {
            // 1. Main carousel/slider elements
            const mainCarousels = document.querySelectorAll('.owl-carousel, .swiper-container, .swiper');
            
            mainCarousels.forEach(element => {
                // Skip if already initialized
                if (element.swiper) return;
                
                // Convert owl-carousel class to swiper structure if needed
                if (element.classList.contains('owl-carousel')) {
                    convertOwlToSwiper(element);
                }
                
                // Get configuration based on element attributes or defaults
                const config = getSwiperConfig(element);
                
                // Initialize Swiper with latest v11 API
                try {
                    const swiper = new Swiper(element, config);
                    element.swiper = swiper;
                    
                    console.log('✅ Swiper initialized:', element);
                } catch (error) {
                    console.warn('Failed to initialize Swiper:', error, element);
                }
            });
            
            // 2. Initialize any generic sliders
            initializeGenericSliders();
        }
        
        function convertOwlToSwiper(element) {
            // Add swiper wrapper if not exists
            if (!element.querySelector('.swiper-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'swiper-wrapper';
                
                // Move all direct children to wrapper as slides
                while (element.firstElementChild) {
                    const slide = element.firstElementChild;
                    slide.classList.add('swiper-slide');
                    wrapper.appendChild(slide);
                }
                
                element.appendChild(wrapper);
            }
            
            // Add navigation if desired
            if (element.hasAttribute('data-navigation')) {
                addSwiperNavigation(element);
            }
            
            // Add pagination if desired  
            if (element.hasAttribute('data-pagination')) {
                addSwiperPagination(element);
            }
            
            // Remove owl classes, add swiper classes
            element.classList.remove('owl-carousel');
            element.classList.add('swiper');
        }
        
        function addSwiperNavigation(element) {
            const navNext = document.createElement('div');
            navNext.className = 'swiper-button-next';
            
            const navPrev = document.createElement('div'); 
            navPrev.className = 'swiper-button-prev';
            
            element.appendChild(navNext);
            element.appendChild(navPrev);
        }
        
        function addSwiperPagination(element) {
            const pagination = document.createElement('div');
            pagination.className = 'swiper-pagination';
            element.appendChild(pagination);
        }
        
        function getSwiperConfig(element) {
            // Default modern configuration for Swiper 11.x
            const defaultConfig = {
                // Core parameters
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 600,
                
                // Responsive breakpoints  
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 2, 
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                },
                
                // Modern features
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,
                allowTouchMove: true,
                
                // Smooth animations
                effect: 'slide',
                cubeEffect: {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                },
                
                // Auto height
                autoHeight: false,
                
                // Loop
                loop: false,
                
                // Centered slides
                centeredSlides: false,
                
                // Grab cursor
                grabCursor: true,
                
                // Keyboard control
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                
                // Mouse wheel
                mousewheel: {
                    enabled: false,
                },
                
                // Auto play (disabled by default)
                autoplay: false,
                
                // Pagination
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                    type: 'bullets',
                },
                
                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
                // Scrollbar
                scrollbar: {
                    el: '.swiper-scrollbar',
                    draggable: true,
                },
                
                // Accessibility
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                },
                
                // Events
                on: {
                    init: function() {
                        console.log('Swiper initialized');
                        this.el.classList.add('swiper-initialized');
                    },
                    slideChange: function() {
                        // Optional: Add slide change logic
                    }
                }
            };
            
            // Override with element-specific configuration
            const customConfig = getElementConfig(element);
            
            return Object.assign({}, defaultConfig, customConfig);
        }
        
        function getElementConfig(element) {
            const config = {};
            
            // Parse data attributes for configuration
            if (element.hasAttribute('data-slides-per-view')) {
                config.slidesPerView = parseInt(element.getAttribute('data-slides-per-view'));
            }
            
            if (element.hasAttribute('data-space-between')) {
                config.spaceBetween = parseInt(element.getAttribute('data-space-between'));
            }
            
            if (element.hasAttribute('data-loop')) {
                config.loop = element.getAttribute('data-loop') === 'true';
            }
            
            if (element.hasAttribute('data-autoplay')) {
                const delay = parseInt(element.getAttribute('data-autoplay')) || 3000;
                config.autoplay = {
                    delay: delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                };
            }
            
            if (element.hasAttribute('data-effect')) {
                config.effect = element.getAttribute('data-effect');
            }
            
            if (element.hasAttribute('data-centered')) {
                config.centeredSlides = element.getAttribute('data-centered') === 'true';
            }
            
            return config;
        }
        
        function initializeGenericSliders() {
            // Look for any elements that might need slider functionality
            const potentialSliders = document.querySelectorAll('[class*="carousel"], [class*="slider"], [class*="gallery"]');
            
            potentialSliders.forEach(element => {
                if (element.swiper || element.classList.contains('swiper-initialized')) return;
                
                const items = element.children;
                if (items.length > 1 && !element.classList.contains('swiper')) {
                    // This might benefit from slider functionality
                    console.log('Potential slider found:', element);
                }
            });
        }
    });
    
    // Global Swiper utilities
    window.NotikaSwiper = {
        // Reinitialize all swipers (useful for dynamic content)
        refresh: function() {
            document.querySelectorAll('.swiper').forEach(element => {
                if (element.swiper) {
                    element.swiper.update();
                }
            });
        },
        
        // Get swiper instance by element
        getInstance: function(element) {
            return element.swiper;
        },
        
        // Destroy all swipers
        destroyAll: function() {
            document.querySelectorAll('.swiper').forEach(element => {
                if (element.swiper) {
                    element.swiper.destroy(true, true);
                }
            });
        }
    };
    
})();