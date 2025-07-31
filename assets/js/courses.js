/**
 * ------------------------------------------------------------------
 * Modal Creation and Management
 * ------------------------------------------------------------------
 */

// --- Generic Modal Creation Function ---
function createModal(contentHTML, onOpen = () => {}) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        overflow-y: auto;
        padding: 1rem;
    `;
    modal.innerHTML = contentHTML;
    document.body.appendChild(modal);
    
    // Close modal if the background is clicked
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    onOpen(modal);
}

function closeModal(modalElement) {
    modalElement.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
        if (document.body.contains(modalElement)) {
            document.body.removeChild(modalElement);
        }
    }, 300);
}

// --- Function to show "Notify Me" Modal ---
function notifyMe(courseName) {
    const modalContent = `
        <div class="modal-content" >
            <div class="model-icon" style="font-size: 4rem; margin-bottom: 1rem;">🚀</div>
            <h2 style="color: #00509d; margin-bottom: 1rem; font-size: 1rem;">Get Notified for ${courseName}!</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                Enter your email below to be the first to know when our <strong>${courseName}</strong> course launches. You'll get early access and exclusive content!
            </p>
            <form class="modal-form">
                <input type="email" class="newsletter-input" placeholder="Enter your email" required style="width: 100%; margin-bottom: 1rem; background: #f0f4f8; border-radius: 10px; border: 1px solid #ddd; padding: 1rem;">
                <button type="submit" class="newsletter-btn" style="width: 100%;">Notify Me</button>
            </form>
        </div>
    `;
    
    createModal(modalContent, (modal) => {
        const form = modal.querySelector('.modal-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            handleCourseNotification(email, courseName).then(success => {
                if (success) {
                    closeModal(modal);
                    setTimeout(() => showConfirmationModal(email, `You're on the list for the ${courseName} course!`), 300);
                }
            });
        });
    });
}

// --- Function to show generic Confirmation Modal ---
function showConfirmationModal(email, message) {
     const modalContent = `
        <div class="modal-content" style="background: white; padding: 2rem 3rem; border-radius: 20px; text-align: center; max-width: 500px; margin: 2rem; box-shadow: 0 50px 100px rgba(0, 80, 157, 0.3); animation: slideInUp 0.4s ease-out;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h2 style="color: #00509d; margin-bottom: 1rem;">You're All Set!</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                ${message}<br><br>We'll send an update to <strong>${email}</strong>.
            </p>
            <button onclick="closeModal(this.closest('.modal-content').parentElement)" class="newsletter-btn">Awesome!</button>
        </div>
    `;
    createModal(modalContent);
}


/**
 * ------------------------------------------------------------------
 * Event Handlers
 * ------------------------------------------------------------------
 */

// --- Smooth scrolling for navigation ---
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Adjust for sticky header height
        const headerOffset = 70;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

// --- Newsletter subscription handler ---
function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    const email = emailInput.value;

    handleNewsletterSubscription(email).then(success => {
        if (success) {
            showConfirmationModal(email, "Thank you for joining our exclusive community! You'll now receive daily insights, course updates, and industry trends.");
            // Reset form and update button state
            emailInput.value = '';
            button.innerHTML = '✓ Subscribed!';
            button.style.background = 'linear-gradient(135deg, #00c851, #00a441)';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = 'Subscribe Premium';
                button.style.background = 'linear-gradient(135deg, #00509d, #4facfe)';
                button.disabled = false;
            }, 5000);
        }
    });
}


/**
 * ------------------------------------------------------------------
 * Konami Code Easter Egg
 * ------------------------------------------------------------------
 */
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
];
let konamiIndex = 0;
const dailySecretKey = "RIVERPOD"; // Today's secret key (case-insensitive)

function checkKonami(e) {
    if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            konamiIndex = 0; // Reset for next time
            activateEasterEgg();
        }
    } else {
        konamiIndex = 0;
    }
}

function activateEasterEgg() {
    const modalContent = `
        <div class="modal-content" style="background: white; padding: 2rem 3rem; border-radius: 20px; text-align: center; max-width: 500px; margin: 2rem; box-shadow: 0 50px 100px rgba(0, 80, 157, 0.3); animation: slideInUp 0.4s ease-out;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">👾</div>
            <h2 style="color: #00509d; margin-bottom: 1rem; font-size: 1.8rem;">Code Accepted!</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                You've found the secret portal! Now, prove you're a true #WIFCodeHunter. What is today's secret key?
            </p>
            <form class="modal-form" id="konami-form">
                <input type="text" class="newsletter-input" placeholder="Enter the secret key" required style="width: 100%; text-transform: uppercase; margin-bottom: 1rem; background: #f0f4f8; border-radius: 10px; border: 1px solid #ddd; padding: 1rem;">
                <button type="submit" class="newsletter-btn" style="width: 100%;">Unlock Surprise</button>
            </form>
        </div>
    `;

    createModal(modalContent, (modal) => {
        const form = modal.querySelector('#konami-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputKey = form.querySelector('input').value.toUpperCase();
            if (inputKey === dailySecretKey) {
                // Success!
                closeModal(modal);
                setTimeout(() => showKonamiSuccess(), 300);
            } else {
                // Failure
                alert("Incorrect key. Keep hunting!");
            }
        });
    });
}

function showKonamiSuccess() {
    const successModal = `
         <div class="modal-content" style="background: white; padding: 2rem 3rem; border-radius: 20px; text-align: center; max-width: 500px; margin: 2rem; box-shadow: 0 50px 100px rgba(0, 80, 157, 0.3); animation: slideInUp 0.4s ease-out;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #00509d; margin-bottom: 1rem;">SUCCESS!</h2>
            <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                You found it! You're a true Code Hunter. Don't forget to share a screenshot on social media with #WIFCodeHunter. Come back tomorrow for a new challenge!
            </p>
            <button onclick="closeModal(this.closest('.modal-content').parentElement)" class="newsletter-btn">Awesome!</button>
        </div>
    `;
    createModal(successModal);
}

window.addEventListener('keydown', checkKonami);


/**
 * ------------------------------------------------------------------
 * On-Load and Scroll Effects
 * ------------------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const themeToggle = document.getElementById('theme-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navMenu = document.getElementById('nav-menu-mobile');
    const navLinks = navMenu.querySelectorAll('a');
    const dropdownToggles = navMenu.querySelectorAll('.mobile-submenu-toggle');

    // --- Header scroll effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        // Optional: Save theme preference to localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Check for saved theme preference ---
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // --- Mobile Menu Toggle ---
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);
    mobileMenuClose.addEventListener('click', toggleMenu);

    // --- Close menu when a link is clicked ---
    navLinks.forEach(link => {
        if (!link.parentElement.classList.contains('mobile-dropdown')) {
             link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        }
    });
    
    // --- Handle mobile dropdowns ---
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const parent = toggle.parentElement;
            parent.classList.toggle('expanded');
        });
    });


    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
            item.classList.toggle('active');
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
    });

    // --- Intersection Observer for fade-in animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate only once
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.stat-item, .course-card, .why-us-card, .blog-card, .faq-item, .section-header, .mentor-container, .community-card, .easter-egg-content');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // Add dynamic category colors to blog cards
    document.querySelectorAll('.blog-card-category').forEach(el => {
        const category = el.textContent.trim();
        el.dataset.category = category;
    });
});

// Add a closing function to window scope for modals
window.closeModal = (modalElement) => {
    modalElement.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
        if (document.body.contains(modalElement)) {
            document.body.removeChild(modalElement);
        }
    }, 300);
};

// Add fadeOut animation keyframes to the stylesheet
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
