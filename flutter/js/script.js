// Create floating particles
function createParticles() {
    const particles = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

// Progress bar functionality
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Toggle checklist items
function toggleCheck(item) {
    const checkbox = item.querySelector('.checkbox');
    checkbox.classList.toggle('checked');
    checkbox.innerHTML = checkbox.classList.contains('checked') ? '✓' : '';
    updateUserProgress();
}

// Update user progress
function updateUserProgress() {
    const totalItems = document.querySelectorAll('.checklist li').length;
    const checkedItems = document.querySelectorAll('.checkbox.checked').length;
    const progress = (checkedItems / totalItems) * 100;

    document.getElementById('userProgress').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + '% Complete';
}

function copyCode(button) {
    const codeContent = button.parentElement.nextElementSibling.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeContent).then(() => {
            button.textContent = 'Copied!';
            button.style.background = '#10b981';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            console.error('Clipboard error:', err);
            fallbackCopy(codeContent);
        });
    } else {
        fallbackCopy(codeContent);
    }
}

function fallbackCopy(text) {
    // Create hidden textarea
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Copied!');
        } else {
            alert('Failed to copy!');
        }
    } catch (err) {
        alert('Error copying to clipboard');
        console.error(err);
    }

    document.body.removeChild(textarea);
}


// Flutter demo
function runFlutterDemo() {
    const output = document.getElementById('demoOutput');
    const messages = [
        '🧍 StatelessWidget → UI doesn’t change...',
        '🔁 StatefulWidget → UI updates with state!',
        '🎨 Flutter rebuilds widgets efficiently!',
        '🚀 You now understand widget magic!'
    ];

    let index = 0;
    const interval = setInterval(() => {
        output.textContent = messages[index];
        index++;
        if (index >= messages.length) {
            clearInterval(interval);
        }
    }, 1000);
}


// Celebration function
function celebrateCompletion() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    // Show the custom modal instead of alert
    const modal = document.getElementById('completionModal');
    modal.classList.add('show');
    modal.classList.remove('hidden');
    // alert('🚀 Day 3 complete! You now understand the difference between Stateless and Stateful Widgets. Get ready for Day 4: Basic Flutter Widgets! 🎯');
}

function closeModal() {
    const modal = document.getElementById('completionModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'][Math.floor(Math.random() * 4)];
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';

    document.body.appendChild(confetti);

    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 }
    ], {
        duration: 3000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => confetti.remove();
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Section activation on scroll
function activateSection() {
    const sections = document.querySelectorAll('.section');
    const tocItems = document.querySelectorAll('.toc-item');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;

        if (isVisible) {
            // Remove active class from all sections and toc items
            sections.forEach(s => s.classList.remove('active'));
            tocItems.forEach(item => item.classList.remove('active'));

            // Add active class to current section
            section.classList.add('active');

            // Add active class to corresponding toc item
            const sectionId = section.id;
            const correspondingTocItem = document.querySelector(`.toc-item[href="#${sectionId}"]`);
            if (correspondingTocItem) {
                correspondingTocItem.classList.add('active');
            }
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    // Delay non-critical JS to improve initial load performance
    setTimeout(() => {
        createParticles();

        // Observe all sections for animations
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }, 500);


    // Initial progress update
    updateUserProgress();
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Event listeners
window.addEventListener('scroll', () => {
    updateProgressBar();
    handleHeaderScroll();
    activateSection();
});

// Easter egg: Konami code
let konamiCode = [];
const correctCode = [
    38,
    80,
    68,
    79,
    87,
    78,
    70,
    76,
    85,
    84
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === correctCode.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
            alert('🌈 Easter egg unlocked! You really know your widgets. 🧙‍♂️ Flutter mastery activated!');
        }, 2000);
        konamiCode = [];
    }
});

// Add hover effects for enhanced interactivity
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.02) translateY(-5px)';
    });

    section.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after a delay
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 30);
}, 1500);

// Add pulse effect to important elements
setInterval(() => {
    document.querySelectorAll('.demo-button, .cta-button').forEach(btn => {
        btn.style.animation = 'none';
        setTimeout(() => {
            btn.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    });
}, 10000);

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function shareProgress(platform) {
    const url = encodeURIComponent(window.location.href);
    const dayTitle = document.querySelector('.hero-title').textContent.trim();
    const userProgressText = document.getElementById('progressText').textContent;
    
    const text = `🚀 I've completed ${userProgressText} of "${dayTitle}" in the #Flutter30Days challenge by @WIFGroup. Join me on this learning journey!`;
    const encodedText = encodeURIComponent(text);

    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, '_blank');
    } else if (platform === 'linkedin') {
        // LinkedIn has a different sharing format
        const linkedInText = encodeURIComponent(`I've completed ${userProgressText} of "${dayTitle}" in the #Flutter30Days challenge. #Flutter #MobileDev #LearningInPublic`);
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${linkedInText}`, '_blank');
    }
}

function copyPageLink() {
    const dummy = document.createElement('input');
    const url = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('🔗 Link copied to clipboard!');
}
