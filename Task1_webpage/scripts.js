// Smooth scrolling and utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Counter animation for statistics
function animateCounter(element, finalValue, duration = 2000) {
    let currentValue = 0;
    const increment = finalValue / (duration / 50);
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        if (finalValue > 10000) {
            displayValue = (displayValue / 1000).toFixed(0) + 'K+';
        } else if (finalValue > 100) {
            displayValue = displayValue.toLocaleString();
        }
        
        element.textContent = displayValue;
    }, 50);
}

// Intersection Observer for triggering animations when elements come into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counter animations
            if (entry.target.classList.contains('stat-value') || entry.target.classList.contains('stat-number')) {
                const count = parseInt(entry.target.getAttribute('data-count'));
                if (count && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    animateCounter(entry.target, count, 2000);
                }
            }

            // Add fade-in and slide-in animations
            if (entry.target.classList.contains('fade-in')) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
            if (entry.target.classList.contains('slide-in')) {
                entry.target.style.animation = 'slideUp 0.8s ease forwards';
            }

            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', function () {
    // Observe counter elements
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    document.querySelectorAll('.slide-in').forEach(el => observer.observe(el));

    // Initialize gallery slider
    initGallerySlider();
});

// Gallery Slider Functionality
let currentGallerySlide = 0;
let galleryTimer;

function showGallerySlide(n) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    if (n >= slides.length) {
        currentGallerySlide = 0;
    }
    if (n < 0) {
        currentGallerySlide = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentGallerySlide].classList.add('active');
    if (dots[currentGallerySlide]) {
        dots[currentGallerySlide].classList.add('active');
    }
}

function changeGallerySlide(n) {
    currentGallerySlide += n;
    showGallerySlide(currentGallerySlide);
    resetGalleryTimer();
}

function currentSlide(n) {
    currentGallerySlide = n;
    showGallerySlide(currentGallerySlide);
    resetGalleryTimer();
}

function nextGallerySlide() {
    currentGallerySlide++;
    showGallerySlide(currentGallerySlide);
}

function initGallerySlider() {
    showGallerySlide(currentGallerySlide);
    startGalleryTimer();
}

function startGalleryTimer() {
    galleryTimer = setInterval(() => {
        nextGallerySlide();
    }, 5000);
}

function resetGalleryTimer() {
    clearInterval(galleryTimer);
    startGalleryTimer();
}

// Project Modal Functions
const projectDetails = {
    seva: {
        title: 'Seva - Helping Those in Need',
        description: 'Our Seva project focuses on providing essential support to those living in difficult circumstances. We distribute food, clothes, and other necessities to ensure basic human dignity.',
        impacts: [
            'Distributed 50,000+ meals to families in need',
            'Provided clothes and essentials during COVID-19 pandemic',
            'Supported street animals with food during crisis',
            'Maintained transparent and efficient supply chains'
        ],
        call: 'Join us in feeding hungry families and creating hope in marginalized communities.'
    },
    bachpanshala: {
        title: 'Bachpanshala - Education for All',
        description: 'Bachpanshala is our flagship education initiative dedicated to providing quality education and care to underprivileged children in rural and urban areas.',
        impacts: [
            'Educating children in rural areas',
            'Providing learning materials and resources',
            'Mentorship and personal development programs',
            'Building foundations for better futures'
        ],
        call: 'Help us transform lives through education. Every donation funds a child\'s dream.'
    },
    jeev: {
        title: 'Jeev - Supporting and Rescuing Animals',
        description: 'Our Jeev project is dedicated to animal welfare and rescue. We provide food, shelter, and medical care to abandoned and vulnerable animals.',
        impacts: [
            'Feeding 50+ animals daily',
            'Providing medical care to injured animals',
            'Running animal rescue operations',
            'Promoting animal welfare awareness'
        ],
        call: 'Be a voice for the voiceless. Support animal rescue and welfare initiatives.'
    },
    udaan: {
        title: 'Udaan - Women Empowerment',
        description: 'Udaan empowers women with skills, knowledge, and opportunities to become independent and self-sufficient. We provide training in various fields to enhance their career prospects.',
        impacts: [
            'Empowered 900+ girls through digital campaigns',
            'Provided vocational training to women',
            'Created entrepreneurship opportunities',
            'Supported women in achieving financial independence'
        ],
        call: 'Empower a woman, empower a community. Support women\'s skill development.'
    },
    prakriti: {
        title: 'Prakriti - Environmental Protection',
        description: 'Prakriti focuses on environmental conservation through tree plantation, clean-up drives, and community awareness. We believe in protecting nature for future generations.',
        impacts: [
            '20,000+ trees planted across regions',
            'Regular environmental clean-up drives',
            'Community awareness programs',
            'Sustainable development initiatives'
        ],
        call: 'Join us in going green. Plant a tree, save the planet.'
    },
    vikas: {
        title: 'Vikas - Youth Development',
        description: 'Vikas empowers young people with internships, skill-building programs, and mentorship. We prepare youth for successful careers and social responsibility.',
        impacts: [
            '100,000+ interns engaged and trained',
            'Skill development workshops conducted',
            'Career mentorship programs',
            'Youth leadership initiatives'
        ],
        call: 'Invest in youth, invest in the future. Partner with us for internship programs.'
    }
};

function showProjectModal(projectKey) {
    const modal = document.getElementById('projectModal');
    const project = projectDetails[projectKey];
    
    if (!project) return;
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    
    const impactsList = document.getElementById('modalImpacts');
    impactsList.innerHTML = '';
    project.impacts.forEach(impact => {
        const li = document.createElement('li');
        li.textContent = impact;
        impactsList.appendChild(li);
    });
    
    document.getElementById('modalCall').textContent = project.call;
    
    modal.style.display = 'block';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// CTA Button Handlers
function handleCTA(action) {
    let message = '';
    
    switch(action) {
        case 'volunteer':
            message = 'Thank you for your interest in volunteering! Please visit https://www.inamigosfoundation.org.in for more details on how to get involved.';
            break;
        case 'support':
            message = 'Thank you for your generosity! Please visit https://www.inamigosfoundation.org.in for donation options and ways to support our mission.';
            break;
        case 'partner':
            message = 'We\'d love to partner with you! Please contact us at https://www.inamigosfoundation.org.in to discuss collaboration opportunities.';
            break;
    }
    
    alert(message);
    scrollToSection('contact');
}
