// I-Pro Solutions Website JavaScript - Fixed Version with Working Animations

// Global variables
let currentSection = 'home';
let isTransitioning = false;
let countersAnimated = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced website functionality...');
    
    // Initialize functionality
    initNavigation();
    initMobileMenu();
    initContactForm();
    initScrollAnimations();
    initSmoothTransitions();
    enhanceFormValidation();
    initPremiumEffects();
    
    // Handle initial page load
    handleInitialLoad();
    
    // Initialize hero animations immediately if on home page
    setTimeout(() => {
        if (currentSection === 'home') {
            initHeroAnimations();
        }
    }, 1000);
    
    console.log('All premium functionality initialized successfully');
});

// Initialize hero banner animations - Fixed version
function initHeroAnimations() {
    console.log('Initializing hero banner animations...');
    
    // Ensure we're on the home section
    const homeSection = document.getElementById('home');
    if (!homeSection || !homeSection.classList.contains('active')) {
        console.log('Not on home section, skipping hero animations');
        return;
    }
    
    // Reset all animations first
    const animateTextElements = document.querySelectorAll('.animate-text');
    const fadeUpElements = document.querySelectorAll('.animate-fade-up');
    const statsElements = document.querySelectorAll('.animate-stats');
    
    // Reset styles
    animateTextElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
    });
    
    fadeUpElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
    
    statsElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
    
    // Trigger text animations
    setTimeout(() => {
        animateTextElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
    
    // Trigger fade-up animations
    setTimeout(() => {
        fadeUpElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }, 800);
    
    // Trigger stats animation and counter
    setTimeout(() => {
        statsElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Start counter animation
        if (!countersAnimated) {
            setTimeout(() => {
                animateCounters();
                countersAnimated = true;
            }, 500);
        }
    }, 1700);
    
    // Add pulse animation to CTA buttons
    setTimeout(() => {
        const pulseButton = document.querySelector('.pulse-button');
        if (pulseButton) {
            pulseButton.style.animation = 'pulse 2s infinite';
        }
    }, 2000);
    
    console.log('Hero banner animations initialized successfully');
}

// Animate counters in statistics - Fixed version
function animateCounters() {
    console.log('Starting counter animations...');
    
    const counters = document.querySelectorAll('.animate-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const strongElement = counter.querySelector('strong');
        
        if (!strongElement || !target) {
            console.log('Counter element not found or invalid target:', counter);
            return;
        }
        
        let current = 0;
        const increment = Math.ceil(target / 60); // Animate over ~60 steps
        const isPercentage = target === 98; // Only the success rate is a percentage
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                strongElement.textContent = Math.floor(current) + '%';
            } else {
                strongElement.textContent = Math.floor(current) + '+';
            }
        }, 30); // Update every 30ms for smooth animation
    });
    
    console.log('Counter animations started successfully');
}

// Initialize navigation functionality - Fixed version
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Handle WhatsApp link specifically
        if (link.classList.contains('whatsapp-nav')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsApp('Hi! I want to chat about your IP services.');
            });
            return;
        }
        
        // Handle regular navigation links
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Extract section from onclick or determine from text
            const onclickAttr = this.getAttribute('onclick');
            let sectionId = null;
            
            if (onclickAttr && onclickAttr.includes('showSection')) {
                const match = onclickAttr.match(/showSection\('([^']+)'\)/);
                if (match) {
                    sectionId = match[1];
                }
            } else {
                // Determine section from link text
                const text = this.textContent.toLowerCase().trim();
                if (text === 'home') sectionId = 'home';
                else if (text === 'trademarks') sectionId = 'trademarks';
                else if (text === 'copyrights') sectionId = 'copyrights';
                else if (text === 'patents') sectionId = 'patents';
                else if (text === 'global trademark') sectionId = 'global-trademark';
                else if (text === 'business setup india') sectionId = 'business-setup';
                else if (text === 'about us') sectionId = 'about';
                else if (text === 'contact') sectionId = 'contact';
            }
            
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });
    
    // Initialize brand click
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('home');
        });
    }
    
    // Initialize all buttons with onclick attributes
    initializeOnClickButtons();
    
    console.log('Navigation initialized successfully');
}

function initializeOnClickButtons() {
    console.log('Initializing onclick buttons...');
    
    // Get all buttons and links with onclick attributes
    const clickableElements = document.querySelectorAll('[onclick]');
    
    clickableElements.forEach(element => {
        // Skip if already has event listener
        if (element.dataset.hasListener) return;
        
        const onclickAttr = element.getAttribute('onclick');
        
        if (onclickAttr) {
            // Don't remove onclick for WhatsApp links in nav
            if (!element.classList.contains('whatsapp-nav')) {
                element.removeAttribute('onclick');
            }
            
            element.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                try {
                    // Parse the onclick attribute and execute it
                    if (onclickAttr.includes('showSection')) {
                        const sectionMatch = onclickAttr.match(/showSection\('([^']+)'\)/);
                        if (sectionMatch) {
                            showSection(sectionMatch[1]);
                        }
                    } else if (onclickAttr.includes('openWhatsApp')) {
                        const messageMatch = onclickAttr.match(/openWhatsApp\('([^']+)'\)/);
                        if (messageMatch) {
                            openWhatsApp(messageMatch[1]);
                        } else {
                            openWhatsApp('Hi! I want to chat about your services.');
                        }
                    } else if (onclickAttr.includes('toggleAccordion')) {
                        toggleAccordion(this);
                    } else if (onclickAttr.includes('toggleFAQ')) {
                        toggleFAQ(this);
                    }
                } catch (error) {
                    console.error('Error executing onclick:', error);
                }
            });
            
            element.dataset.hasListener = 'true';
        }
    });
    
    // Handle service links and other buttons
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        if (!link.dataset.hasListener) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.textContent.includes('Learn More')) {
                    const serviceCard = this.closest('.service-card');
                    if (serviceCard) {
                        const heading = serviceCard.querySelector('h3');
                        if (heading) {
                            const service = heading.textContent.toLowerCase();
                            if (service.includes('trademark')) showSection('trademarks');
                            else if (service.includes('patent')) showSection('patents');
                            else if (service.includes('copyright')) showSection('copyrights');
                            else if (service.includes('global')) showSection('global-trademark');
                            else if (service.includes('business')) showSection('business-setup');
                        }
                    }
                } else if (this.textContent.includes('WhatsApp') || this.innerHTML.includes('fa-whatsapp')) {
                    openWhatsApp('I need legal consultation for IP and business matters');
                }
            });
            link.dataset.hasListener = 'true';
        }
    });
    
    // Handle footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        if (!link.dataset.hasListener) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const text = this.textContent.toLowerCase();
                
                if (text.includes('trademark registration')) showSection('trademarks');
                else if (text.includes('patent services')) showSection('patents');
                else if (text.includes('copyright registration')) showSection('copyrights');
                else if (text.includes('global ip')) showSection('global-trademark');
                else if (text.includes('business setup')) showSection('business-setup');
                else if (text.includes('about')) showSection('about');
                else if (text.includes('contact')) showSection('contact');
                else if (text.includes('track')) showSection('track');
                else if (text.includes('audit')) openWhatsApp('I want a free trademark audit');
            });
            link.dataset.hasListener = 'true';
        }
    });
    
    console.log('Onclick buttons initialized');
}

// Enhanced navigation function with animations
function showSection(sectionId) {
    if (isTransitioning || currentSection === sectionId) return;
    
    console.log('Navigating to section with enhanced transition:', sectionId);
    isTransitioning = true;
    
    // Reset counter animation flag if leaving home
    if (currentSection === 'home' && sectionId !== 'home') {
        countersAnimated = false;
    }
    
    // Get current and target sections
    const currentSectionEl = document.querySelector('.section.active');
    const targetSection = document.getElementById(sectionId);
    
    if (!targetSection) {
        console.error('Section not found:', sectionId);
        isTransitioning = false;
        return;
    }
    
    // Add transition animation to current section
    if (currentSectionEl) {
        currentSectionEl.style.transform = 'translateY(-20px)';
        currentSectionEl.style.opacity = '0';
        
        setTimeout(() => {
            currentSectionEl.classList.remove('active');
            currentSectionEl.style.display = 'none';
            currentSectionEl.style.transform = '';
            currentSectionEl.style.opacity = '';
        }, 300);
    }
    
    // Show target section with enhanced animation
    setTimeout(() => {
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        targetSection.style.display = 'block';
        
        requestAnimationFrame(() => {
            targetSection.classList.add('active');
            targetSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                targetSection.style.transition = '';
                isTransitioning = false;
                
                // Trigger hero animations if navigating to home
                if (sectionId === 'home') {
                    setTimeout(() => {
                        initHeroAnimations();
                    }, 200);
                }
            }, 600);
        });
        
        currentSection = sectionId;
        
        // Update URL
        updateURL(sectionId);
        
        // Close mobile menu
        closeMobileMenu();
        
        // Scroll to top with smooth behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Trigger scroll animations for new section
        setTimeout(() => {
            triggerScrollAnimations(targetSection);
        }, 300);
        
        console.log('Successfully navigated to:', sectionId);
    }, 200);
}

// WhatsApp function with enhanced feedback - Fixed version
function openWhatsApp(message, phone = '919324090425') {
    console.log('Opening WhatsApp with message:', message);
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Add visual feedback
    if (window.event && window.event.target) {
        addButtonClickEffect(window.event.target);
    }
    
    try {
        // Open in new window
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        
        // Show success notification
        showNotification('WhatsApp opened successfully! 🚀', 'success');
        
        console.log('WhatsApp opened successfully');
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        showNotification('Error opening WhatsApp. Please try again.', 'error');
    }
}

// Enhanced accordion toggle function
function toggleAccordion(header) {
    console.log('Toggling accordion:', header.textContent.trim());
    
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion-content');
    const icon = header.querySelector('i');
    
    if (!accordionContent) {
        console.error('Accordion content not found');
        return;
    }
    
    const isActive = accordionItem.classList.contains('active');
    
    // Close all other accordions in the same group with smooth animation
    const accordionGroup = accordionItem.closest('.services-accordion, .category-accordion');
    if (accordionGroup) {
        const allItems = accordionGroup.querySelectorAll('.accordion-item');
        allItems.forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                const itemIcon = item.querySelector('.accordion-header i');
                
                if (content) {
                    content.style.maxHeight = '0px';
                    content.style.overflow = 'hidden';
                }
                if (itemIcon) {
                    itemIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
    
    // Toggle current accordion if it wasn't active
    if (!isActive) {
        accordionItem.classList.add('active');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
        if (accordionContent) {
            // Calculate the actual height needed
            const scrollHeight = accordionContent.scrollHeight;
            accordionContent.style.maxHeight = scrollHeight + 'px';
            accordionContent.style.overflow = 'visible';
        }
        
        // Add glow effect to the opened accordion
        accordionItem.style.boxShadow = '0 0 30px rgba(30, 64, 175, 0.3)';
        setTimeout(() => {
            accordionItem.style.boxShadow = '';
        }, 1000);
        
        console.log('Accordion opened:', header.textContent.trim());
    } else {
        // Close the accordion if it was active
        accordionItem.classList.remove('active');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        if (accordionContent) {
            accordionContent.style.maxHeight = '0px';
            accordionContent.style.overflow = 'hidden';
        }
    }
}

// Enhanced FAQ toggle function
function toggleFAQ(question) {
    console.log('Toggling FAQ:', question.textContent.trim());
    
    const faqItem = question.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items with smooth animation
    const faqList = faqItem.closest('.faq-list');
    if (faqList) {
        const allItems = faqList.querySelectorAll('.faq-item');
        allItems.forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                const itemIcon = item.querySelector('.faq-question i');
                
                if (answer) answer.style.maxHeight = '0px';
                if (itemIcon) itemIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Toggle current FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
        if (faqAnswer) {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        }
        
        // Add highlight effect
        faqItem.style.borderColor = 'rgba(30, 64, 175, 0.6)';
        faqItem.style.boxShadow = '0 0 20px rgba(30, 64, 175, 0.2)';
        setTimeout(() => {
            faqItem.style.borderColor = '';
            faqItem.style.boxShadow = '';
        }, 1000);
        
        console.log('FAQ opened:', question.textContent.trim());
    } else {
        // Close FAQ if it was active
        faqItem.classList.remove('active');
        if (icon) icon.style.transform = 'rotate(0deg)';
        if (faqAnswer) faqAnswer.style.maxHeight = '0px';
    }
}

// Enhanced mobile menu functionality
function initMobileMenu() {
    console.log('Initializing enhanced mobile menu...');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (!isActive) {
                navMenu.classList.add('active');
                
                // Animate hamburger menu with enhanced effect
                const spans = this.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                });
                
                // Add body class to prevent scrolling
                document.body.style.overflow = 'hidden';
                
            } else {
                closeMobileMenu();
            }
            
            console.log('Mobile menu toggled:', navMenu.classList.contains('active'));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeMobileMenu, 100);
            });
        });
        
        console.log('Enhanced mobile menu initialized successfully');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        
        // Reset hamburger menu animation
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
        
        // Re-enable body scrolling
        document.body.style.overflow = '';
        
        console.log('Mobile menu closed');
    }
}

// Enhanced contact form functionality
function initContactForm() {
    console.log('Initializing enhanced contact form...');
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted with enhanced processing');
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const phone = formData.get('phone')?.trim();
            const service = formData.get('service');
            const message = formData.get('message')?.trim();
            
            console.log('Form data:', { name, email, phone, service, message });
            
            // Validate required fields
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                resetSubmitButton(submitBtn, originalText);
                return;
            }
            
            // Validate email format
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                resetSubmitButton(submitBtn, originalText);
                return;
            }
            
            // Simulate processing delay for better UX
            setTimeout(() => {
                // Create enhanced WhatsApp message
                let whatsappMessage = `🌟 *New Contact Form Inquiry* 🌟\n\n`;
                whatsappMessage += `👤 *Name:* ${name}\n`;
                whatsappMessage += `📧 *Email:* ${email}\n`;
                if (phone) whatsappMessage += `📱 *Phone:* ${phone}\n`;
                if (service && service !== '') {
                    const serviceNames = {
                        'trademark': 'Trademark Registration',
                        'patent': 'Patent Services',
                        'copyright': 'Copyright Registration',
                        'global-ip': 'Global IP Protection',
                        'business-setup': 'Business Setup India',
                        'consultation': 'General Consultation'
                    };
                    whatsappMessage += `🎯 *Service:* ${serviceNames[service] || service}\n`;
                }
                whatsappMessage += `\n💬 *Message:*\n${message}\n\n`;
                whatsappMessage += `📅 *Submitted:* ${new Date().toLocaleString()}`;
                
                // Open WhatsApp
                openWhatsApp(whatsappMessage);
                
                // Show success message
                showNotification('Your message has been prepared for WhatsApp! We will respond shortly. ✨', 'success');
                
                // Reset form with animation
                this.reset();
                
                // Clear validation states
                const inputs = this.querySelectorAll('input, textarea, select');
                inputs.forEach(input => clearFieldValidation(input));
                
                // Reset submit button
                resetSubmitButton(submitBtn, originalText);
                
                console.log('Contact form processed successfully');
            }, 1500);
        });
        
        console.log('Enhanced contact form initialized successfully');
    }
}

function resetSubmitButton(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    console.log('Showing enhanced notification:', type, message);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.premium-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `premium-notification premium-notification-${type}`;
    
    // Set content with enhanced styling
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Enhanced styling based on type
    const styles = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${styles[type]};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(30, 64, 175, 0.2);
        max-width: 400px;
        transform: translateX(120%);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Enhanced content styling
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const notificationIcon = notification.querySelector('.notification-icon');
    notificationIcon.style.cssText = `
        font-size: 20px;
        flex-shrink: 0;
        animation: pulse 2s infinite;
    `;
    
    const notificationMessage = notification.querySelector('.notification-message');
    notificationMessage.style.cssText = `
        flex: 1;
        line-height: 1.4;
    `;
    
    const notificationClose = notification.querySelector('.notification-close');
    notificationClose.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 6px;
        border-radius: 50%;
        opacity: 0.8;
        transition: all 0.3s ease;
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    notificationClose.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'scale(1.1)';
    });
    
    notificationClose.addEventListener('mouseleave', function() {
        this.style.opacity = '0.8';
        this.style.background = 'none';
        this.style.transform = 'scale(1)';
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in with enhanced effect
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 6 seconds with enhanced animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(120%) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 600);
        }
    }, 6000);
}

// Enhanced scroll animations with intersection observer
function initScrollAnimations() {
    console.log('Initializing enhanced scroll animations...');
    
    // Create intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .feature, .testimonial, .founder-card, .pricing-card, .benefit-card, .portal-card, .step, .service-category'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.05}s, transform 0.8s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    console.log('Enhanced scroll animations initialized');
}

// Initialize smooth transitions
function initSmoothTransitions() {
    console.log('Initializing smooth page transitions...');
    
    // Add transition styles to all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    console.log('Smooth transitions initialized');
}

// Initialize premium effects
function initPremiumEffects() {
    console.log('Initializing premium effects...');
    
    // Add hover effects to cards
    initCardHoverEffects();
    
    // Add button click effects
    initButtonEffects();
    
    // Add sparkle effects
    initSparkleEffects();
    
    console.log('Premium effects initialized');
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.glow-card, .shimmer-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function initButtonEffects() {
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.btn, .glow-effect');
        if (button && !button.disabled) {
            addButtonClickEffect(button);
        }
    });
}

function addButtonClickEffect(button) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (rect.width / 2) - (size / 2);
    const y = (rect.height / 2) - (size / 2);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 800);
}

function initSparkleEffects() {
    // Add sparkle animation to specific elements
    const sparkleElements = document.querySelectorAll('.sparkle-icon');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'sparkleRotate 1s linear infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = 'sparkleRotate 3s linear infinite';
        });
    });
}

function triggerScrollAnimations(container) {
    const animateElements = container.querySelectorAll(
        '.service-card, .feature, .testimonial, .founder-card, .pricing-card, .benefit-card, .portal-card, .step, .service-category'
    );
    
    animateElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle initial page load with enhanced transition
function handleInitialLoad() {
    console.log('Handling initial page load with enhancements...');
    
    // Hide all sections initially
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Check URL hash
    const hash = window.location.hash;
    let targetSectionId = 'home';
    
    if (hash && hash.length > 1) {
        const hashId = hash.substring(1);
        const targetSection = document.getElementById(hashId);
        if (targetSection && targetSection.classList.contains('section')) {
            targetSectionId = hashId;
        }
    }
    
    // Show the target section with initial animation
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
        targetSection.style.opacity = '0';
        targetSection.style.transform = 'translateY(20px)';
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        
        setTimeout(() => {
            targetSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                targetSection.style.transition = '';
                triggerScrollAnimations(targetSection);
            }, 1000);
        }, 100);
    }
    
    currentSection = targetSectionId;
    console.log('Initial section loaded with animation:', targetSectionId);
}

// URL management
function updateURL(sectionId) {
    const newURL = window.location.pathname + '#' + sectionId;
    window.history.replaceState({section: sectionId}, '', newURL);
}

// Enhanced form validation
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        // Clear validation on input
        input.addEventListener('input', function() {
            clearFieldValidation(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';
    
    // Clear existing validation
    clearFieldValidation(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (fieldName === 'phone' && value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
    }
    
    // Show validation state
    if (!isValid) {
        field.classList.add('invalid');
        showFieldError(field, message);
    } else if (value) {
        field.classList.add('valid');
    }
    
    return isValid;
}

function clearFieldValidation(field) {
    field.classList.remove('invalid', 'valid');
    const errorMsg = field.parentElement.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    // Remove existing error
    clearFieldValidation(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add error icon
    const errorIcon = document.createElement('i');
    errorIcon.className = 'fas fa-exclamation-circle';
    errorIcon.style.fontSize = '10px';
    errorElement.insertBefore(errorIcon, errorElement.firstChild);
    
    field.parentElement.appendChild(errorElement);
}

// Handle browser navigation
window.addEventListener('popstate', function(e) {
    handleInitialLoad();
});

// Handle window resize with enhanced mobile menu handling
window.addEventListener('resize', function() {
    // Close mobile menu on larger screens
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
    
    // Recalculate accordion heights
    const activeAccordions = document.querySelectorAll('.accordion-item.active .accordion-content');
    activeAccordions.forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
});

// Add enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes sparkleRotate {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(30, 64, 175, 0.7);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(30, 64, 175, 0);
        }
    }
    
    @keyframes textSlideUp {
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
        }
        33% {
            transform: translateY(-20px) rotate(120deg);
            opacity: 1;
        }
        66% {
            transform: translateY(-40px) rotate(240deg);
            opacity: 0.8;
        }
    }
    
    @keyframes backgroundFloat {
        0% { 
            background-position: 0% 0%, 100% 0%, 0% 100%;
            opacity: 0.8;
        }
        50% {
            background-position: 100% 50%, 0% 100%, 100% 0%;
            opacity: 1;
        }
        100% { 
            background-position: 50% 100%, 50% 50%, 50% 50%;
            opacity: 0.8;
        }
    }
    
    /* Make sure floating elements are visible */
    .floating-element {
        position: absolute !important;
        background: rgba(255, 255, 255, 0.1) !important;
        border-radius: 50% !important;
        animation: float 6s ease-in-out infinite !important;
        backdrop-filter: blur(5px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        z-index: 1 !important;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .form-control.invalid {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
    }
    
    .form-control.valid {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2) !important;
    }
    
    .form-group.focused .form-label {
        color: #1e40af !important;
        transform: scale(1.05);
        transition: all 0.3s ease;
    }
    
    .accordion-content {
        transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
    }
    
    .accordion-header i {
        transition: transform 0.4s ease;
    }
    
    .faq-answer {
        transition: max-height 0.4s ease;
        overflow: hidden;
    }
    
    .faq-question i {
        transition: transform 0.4s ease;
    }
    
    /* Custom scrollbar for better UX */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e3a8a 100%);
    }
`;
document.head.appendChild(enhancedStyles);

// Add some debug utilities for troubleshooting
window.debugIproEnhanced = {
    showSection,
    openWhatsApp,
    toggleAccordion,
    toggleFAQ,
    currentSection: () => currentSection,
    testWhatsApp: () => openWhatsApp('Enhanced test message from I-Pro Solutions website! ✨'),
    testNotification: (type) => showNotification('This is a test notification! 🚀', type || 'success'),
    triggerScrollAnimations: triggerScrollAnimations,
    initializeOnClickButtons: initializeOnClickButtons,
    initHeroAnimations: initHeroAnimations,
    animateCounters: animateCounters,
    forceHeroAnimations: () => {
        countersAnimated = false;
        initHeroAnimations();
    }
};

console.log('🚀 I-Pro Solutions website loaded with turquoise theme and working animated hero banner!');
console.log('✨ Debug functions available at window.debugIproEnhanced');
console.log('🎯 Features: Turquoise background, animated hero, counter animations, floating elements, working WhatsApp, enhanced mobile menu');