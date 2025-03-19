// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll with particle, cursor, and section color change
const sections = document.querySelectorAll('section');
let currentParticleColor = 'rgba(0, 212, 255, 0.8)'; // Default color (Home: Cyan)
const trail = document.getElementById('mouse-trail');
const header = document.querySelector('header');
let lastScrollTop = 0;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s forwards';
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            if (entry.target.id === 'education') {
                revealText(entry.target);
            }
            // Change particle, cursor, and section color based on section
            switch (entry.target.id) {
                case 'home':
                    currentParticleColor = 'rgba(0, 212, 255, 0.8)'; // Cyan
                    trail.style.background = 'radial-gradient(circle, #00d4ff 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#00d4ff');
                    document.documentElement.style.setProperty('--section-color-rgb', '0, 212, 255');
                    break;
                case 'experience':
                    currentParticleColor = 'rgba(187, 0, 255, 0.8)'; // Purple
                    trail.style.background = 'radial-gradient(circle, #bb00ff 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#bb00ff');
                    document.documentElement.style.setProperty('--section-color-rgb', '187, 0, 255');
                    break;
                case 'education':
                    currentParticleColor = 'rgba(0, 255, 133, 0.8)'; // Green
                    trail.style.background = 'radial-gradient(circle, #00ff85 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#00ff85');
                    document.documentElement.style.setProperty('--section-color-rgb', '0, 255, 133');
                    break;
                case 'skills':
                    currentParticleColor = 'rgba(255, 140, 0, 0.8)'; // Orange
                    trail.style.background = 'radial-gradient(circle, #ff8c00 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#ff8c00');
                    document.documentElement.style.setProperty('--section-color-rgb', '255, 140, 0');
                    break;
                case 'projects':
                    currentParticleColor = 'rgba(255, 0, 170, 0.8)'; // Pink
                    trail.style.background = 'radial-gradient(circle, #ff00aa 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#ff00aa');
                    document.documentElement.style.setProperty('--section-color-rgb', '255, 0, 170');
                    break;
                case 'contact':
                    currentParticleColor = 'rgba(0, 102, 255, 0.8)'; // Blue
                    trail.style.background = 'radial-gradient(circle, #0066ff 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#0066ff');
                    document.documentElement.style.setProperty('--section-color-rgb', '0, 102, 255');
                    break;
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    observer.observe(section);
});

// Hide header on scroll down, show on scroll up with fade effect
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
        header.style.background = `rgba(26, 26, 26, ${Math.min(0.9, scrollTop / 200)})`; // Fade in opacity
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Typewriter effect for header
const typewriterText = "lewieville-br";
let i = 0;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    if (i < typewriterText.length) {
        typewriterElement.innerHTML = typewriterText.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        typewriterElement.style.animation = 'fadeIn 1s';
    }
}

// Particle Background with Physics
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;
const gravity = 0.05; // Gravity force
const bounce = 0.8;   // Elasticity
const friction = 0.99; // Slowdown on bounce

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        // Apply gravity
        this.speedY += gravity;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off walls
        if (this.x + this.size > canvas.width) {
            this.x = canvas.width - this.size;
            this.speedX = -this.speedX * bounce;
            this.speedY *= friction;
        } else if (this.x - this.size < 0) {
            this.x = this.size;
            this.speedX = -this.speedX * bounce;
            this.speedY *= friction;
        }
        
        if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.speedY = -this.speedY * bounce;
            this.speedX *= friction;
        } else if (this.y - this.size < 0) {
            this.y = this.size;
            this.speedY = -this.speedY * bounce;
            this.speedX *= friction;
        }
        
        // Slow down over time
        this.speedX *= 0.998;
        this.speedY *= 0.998;
        
        if (this.size > 0.2) this.size -= 0.02;
    }
    draw() {
        ctx.fillStyle = currentParticleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

let lastFrameTime = 0;
const fps = 60;
const frameInterval = 1000 / fps;

function animateParticles(timestamp) {
    if (timestamp - lastFrameTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
                particlesArray.push(new Particle());
            }
        }
        lastFrameTime = timestamp;
    }
    requestAnimationFrame(animateParticles);
}

// Mouse interaction - push particles away
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particlesArray.forEach(particle => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
            const force = (50 - distance) / 50;
            particle.speedX += (dx / distance) * force * 2;
            particle.speedY += (dy / distance) * force * 2;
        }
    });
});

// Mouse Trail (Custom Cursor)
document.addEventListener('mousemove', (e) => {
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
});

// Home Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    parallaxElements.forEach(el => {
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Education Text Reveal
function revealText(section) {
    const reveals = section.querySelectorAll('.reveal');
    reveals.forEach((reveal, index) => {
        setTimeout(() => {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Skills Animation
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Projects Tilt Effect
const tiltCard = document.querySelector('.tilt-card');
tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    document.getElementById('form-message').innerText = `Thank you, ${name}! Your message has been sent.`;
    document.getElementById('form-message').style.color = 'var(--section-color)';
    this.reset();

    setTimeout(() => {
        document.getElementById('form-message').innerText = '';
    }, 5000);
});

// Physics-based header tilt
const headerContent = document.querySelector('.header-content');
let targetAngleX = 0;
let targetAngleY = 0;
let currentAngleX = 0;
let currentAngleY = 0;
const spring = 0.05;  // Spring stiffness
const damping = 0.85; // Damping factor

document.addEventListener('mousemove', (e) => {
    const rect = header.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    targetAngleY = ((e.clientX - centerX) / window.innerWidth) * 20;
    targetAngleX = ((e.clientY - centerY) / window.innerHeight) * 20;
});

function updateHeaderTilt() {
    const dx = targetAngleX - currentAngleX;
    const dy = targetAngleY - currentAngleY;
    
    currentAngleX += dx * spring;
    currentAngleY += dy * spring;
    
    currentAngleX *= damping;
    currentAngleY *= damping;
    
    headerContent.style.transform = `perspective(1000px) rotateX(${currentAngleX}deg) rotateY(${currentAngleY}deg)`;
    
    requestAnimationFrame(updateHeaderTilt);
}

// Initialize everything on load
window.onload = () => {
    typeWriter();
    initParticles();
    animateParticles();
    updateHeaderTilt();
};

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Contact Form Submission with Flashy Feedback
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('form-message');
    
    if (!name || !email || !message) {
        formMessage.innerText = 'Error: All fields required!';
        formMessage.style.color = '#ff0000';
        formMessage.style.animation = 'glitch 1s linear infinite';
        setTimeout(() => {
            formMessage.innerText = '';
            formMessage.style.animation = 'none';
        }, 3000);
        return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMessage.innerText = 'Error: Invalid email format!';
        formMessage.style.color = '#ff0000';
        formMessage.style.animation = 'glitch 1s linear infinite';
        setTimeout(() => {
            formMessage.innerText = '';
            formMessage.style.animation = 'none';
        }, 3000);
        return;
    }
    
    // Flashy success animation
    formMessage.innerText = `Signal Received, ${name}! Transmitting...`;
    formMessage.style.color = 'var(--section-color)';
    formMessage.style.animation = 'neon-flicker 0.5s infinite alternate';
    
    const button = this.querySelector('.cyber-button');
    button.innerText = 'Sent!';
    button.disabled = true;
    button.style.background = '#00ff00';
    
    // Particle burst effect
    createParticleBurst();
    
    setTimeout(() => {
        formMessage.innerText = '';
        formMessage.style.animation = 'none';
        button.innerText = 'Transmit Signal';
        button.disabled = false;
        button.style.background = 'var(--section-color)';
        this.reset();
    }, 3000);
});

// Interactive Contact Particles
const contactCanvas = document.getElementById('contact-particles');
const contactCtx = contactCanvas.getContext('2d');
contactCanvas.width = 150;
contactCanvas.height = 150;

const contactParticles = [];
const contactParticleCount = 20;

class ContactParticle {
    constructor() {
        this.x = contactCanvas.width / 2;
        this.y = contactCanvas.height / 2;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = 60; // Frames to live
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size *= 0.98;
    }
    draw() {
        contactCtx.fillStyle = currentParticleColor;
        contactCtx.beginPath();
        contactCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        contactCtx.fill();
    }
}

function animateContactParticles() {
    contactCtx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);
    for (let i = contactParticles.length - 1; i >= 0; i--) {
        contactParticles[i].update();
        contactParticles[i].draw();
        if (contactParticles[i].life <= 0) {
            contactParticles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateContactParticles);
}

contactCanvas.addEventListener('mousemove', (e) => {
    const rect = contactCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    for (let i = 0; i < 2; i++) {
        const particle = new ContactParticle();
        particle.x = mouseX;
        particle.y = mouseY;
        contactParticles.push(particle);
    }
});

// Particle burst on form submission
function createParticleBurst() {
    const rect = contactCanvas.getBoundingClientRect();
    const centerX = contactCanvas.width / 2;
    const centerY = contactCanvas.height / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = new ContactParticle();
        particle.x = centerX;
        particle.y = centerY;
        particle.speedX = Math.random() * 6 - 3;
        particle.speedY = Math.random() * 6 - 3;
        particle.life = 90;
        contactParticles.push(particle);
    }
}

// Start contact particle animation
animateContactParticles();