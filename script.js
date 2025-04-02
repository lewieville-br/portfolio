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
            if (entry.target.id === 'about') {
                entry.target.querySelector('.about-card').style.animation = 'fadeInUp 1s forwards';
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
                case 'about':
                    currentParticleColor = 'rgb(255, 238, 0)'; // Yelloooooow
                    trail.style.background = 'radial-gradient(circle,rgb(255, 238, 0) 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#FFEE00');
                    document.documentElement.style.setProperty('--section-color-rgb', '255, 238, 0');
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
}, { threshold: 0.4 }); 

sections.forEach(section => {
    observer.observe(section);
});

// Hide header on scroll down, show on scroll up
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('hidden'); // Hide when scrolling down
    } else {
        header.classList.remove('hidden'); // Show when scrolling up
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
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

// Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
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

function animateParticles() {
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
    requestAnimationFrame(animateParticles);
}

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
// About Me Interactivity
function initAboutInteractivity() {
    const aboutItems = document.querySelectorAll('.about-item');

    aboutItems.forEach(item => {
        const detail = item.querySelector('.detail');

        // Hover Effect (Desktop)
        item.addEventListener('mouseenter', () => {
            detail.classList.remove('hidden');
            detail.classList.add('visible');
        });

        item.addEventListener('mouseleave', () => {
            detail.classList.remove('visible');
            detail.classList.add('hidden');
        });

        // Click Effect (Mobile/Touch)
        item.addEventListener('click', () => {
            if (detail.classList.contains('visible')) {
                detail.classList.remove('visible');
                detail.classList.add('hidden');
            } else {
                // Hide all other details
                aboutItems.forEach(otherItem => {
                    const otherDetail = otherItem.querySelector('.detail');
                    otherDetail.classList.remove('visible');
                    otherDetail.classList.add('hidden');
                });
                detail.classList.remove('hidden');
                detail.classList.add('visible');
            }
        });
    });
}

// Add to observer for About section animation
observer.observe(document.getElementById('about')); // Already covered by your existing code, but ensuring it’s explicit
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

// 1. Interactive Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Add styling for the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.7';
    canvas.style.display = 'none'; // Hidden by default
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--section-color');
        ctx.font = fontSize + "px monospace";
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    let matrixInterval;
    
    // Toggle matrix effect with keyboard shortcut
    document.addEventListener('keydown', function(e) {
        if (e.key === 'm' || e.key === 'M') {
            if (canvas.style.display === 'none') {
                canvas.style.display = 'block';
                matrixInterval = setInterval(drawMatrix, 50);
            } else {
                canvas.style.display = 'none';
                clearInterval(matrixInterval);
            }
        }
    });
    
    
    // Add a button to toggle the effect
    const matrixButton = document.createElement('button');
    matrixButton.textContent = 'Toggle Matrix';
    matrixButton.className = 'cyber-button matrix-toggle';
    matrixButton.style.position = 'fixed';
    matrixButton.style.bottom = '20px';
    matrixButton.style.right = '20px';
    matrixButton.style.zIndex = '100';
    document.body.appendChild(matrixButton);
    
    matrixButton.addEventListener('click', function() {
        if (canvas.style.display === 'none') {
            canvas.style.display = 'block';
            matrixInterval = setInterval(drawMatrix, 50);
        } else {
            canvas.style.display = 'none';
            clearInterval(matrixInterval);
        }
    });
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 2. Interactive Terminal
function createInteractiveTerminal() {
    const terminal = document.createElement('div');
    terminal.className = 'terminal';
    terminal.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-buttons">
                <span class="terminal-close"></span>
                <span class="terminal-minimize"></span>
                <span class="terminal-maximize"></span>
            </div>
            <div class="terminal-title">lewieville-terminal</div>
        </div>
        <div class="terminal-content">
            <div class="terminal-output"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">lewieville@portfolio:~$</span>
                <input type="text" class="terminal-input" autofocus>
            </div>
        </div>
    `;
    
    document.body.appendChild(terminal);
    
    // Add styling for terminal
    const style = document.createElement('style');
    style.textContent = `
        .terminal {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 500px;
            height: 300px;
            background: rgba(0, 0, 0, 0.85);
            border: 1px solid var(--section-color);
            border-radius: 5px;
            font-family: monospace;
            color: #fff;
            z-index: 1000;
            overflow: hidden;
            display: none;
            box-shadow: 0 0 20px rgba(var(--section-color-rgb), 0.5);
            transition: all 0.3s ease;
        }
        
        .terminal-header {
            display: flex;
            align-items: center;
            background: rgba(var(--section-color-rgb), 0.2);
            padding: 8px;
            border-bottom: 1px solid rgba(var(--section-color-rgb), 0.5);
        }
        
        .terminal-buttons {
            display: flex;
            gap: 5px;
            margin-right: 10px;
        }
        
        .terminal-close, .terminal-minimize, .terminal-maximize {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
        }
        
        .terminal-close {
            background: #ff5f56;
        }
        
        .terminal-minimize {
            background: #ffbd2e;
        }
        
        .terminal-maximize {
            background: #27c93f;
        }
        
        .terminal-title {
            flex-grow: 1;
            text-align: center;
            font-size: 0.8em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .terminal-content {
            height: calc(100% - 30px);
            padding: 10px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
        
        .terminal-output {
            flex-grow: 1;
            margin-bottom: 10px;
        }
        
        .terminal-input-line {
            display: flex;
            align-items: center;
        }
        
        .terminal-prompt {
            color: var(--section-color);
            margin-right: 5px;
        }
        
        .terminal-input {
            background: transparent;
            border: none;
            color: #fff;
            font-family: monospace;
            flex-grow: 1;
            outline: none;
        }
    `;
    
    document.head.appendChild(style);
    
    const terminalButton = document.createElement('button');
    terminalButton.textContent = 'Toggle Terminal';
    terminalButton.className = 'cyber-button terminal-toggle';
    terminalButton.style.position = 'fixed';
    terminalButton.style.bottom = '60px';
    terminalButton.style.right = '20px';
    terminalButton.style.zIndex = '100';
    document.body.appendChild(terminalButton);
    
    terminalButton.addEventListener('click', function() {
        if (terminal.style.display === 'none' || !terminal.style.display) {
            terminal.style.display = 'block';
            terminal.querySelector('.terminal-input').focus();
        } else {
            terminal.style.display = 'none';
        }
    });
    

    
    // Terminal functionality
    const terminalInput = terminal.querySelector('.terminal-input');
    const terminalOutput = terminal.querySelector('.terminal-output');
    
    // Make terminal draggable
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0, yOffset = 0;
    
    terminal.querySelector('.terminal-header').addEventListener('mousedown', dragStart);
    
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        isDragging = true;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            terminal.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    }
    
    function dragEnd() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }
    
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            terminalOutput.innerHTML += `<div><span class="terminal-prompt">lewieville@portfolio:~$</span> ${command}</div>`;
            
            // Process command
            processCommand(command);
            
            terminalInput.value = '';
        }
    });
    
    function processCommand(command) {
        const cmd = command.trim().toLowerCase();
        let response = '';
        
        switch (cmd) {
            case 'help':
                response = `
                    Available commands:<br>
                    - help: Show this help message<br>
                    - clear: Clear terminal<br>
                    - about: About Lewis Miller<br>
                    - skills: List programming skills<br>
                    - projects: List projects<br>
                    - contact: Contact information<br>
                    - matrix: Toggle matrix rain effect<br>
                    - exit: Close terminal
                `;
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                return;
            case 'about':
                response = 'Lewis Miller - Full Stack Developer, based in Naples, FL.';
                break;
            case 'skills':
                response = 'Skills: Python (90%), JavaScript (85%), HTML+CSS (95%), React.js (85%), SQL+NoSQL (70%)';
                break;
            case 'projects':
                response = 'Projects: LEWON Styles, CTR Trades';
                break;
            case 'contact':
                response = 'Email: lewis.miller@svu.edu | LinkedIn: lewis-miller-60980a314';
                break;
            case 'matrix':
                document.querySelector('.matrix-toggle').click();
                response = 'Toggling matrix effect...';
                break;
            case 'exit':
                terminal.style.display = 'none';
                return;
            default:
                response = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }
        
        terminalOutput.innerHTML += `<div class="terminal-response">${response}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    // Close button functionality
    terminal.querySelector('.terminal-close').addEventListener('click', function() {
        terminal.style.display = 'none';
    });
    
    // Add scrolling to output
    terminalOutput.style.overflowY = 'auto';
}

// Initialize everything on load
window.onload = () => {
    typeWriter();
    initParticles();
    animateParticles();
    createMatrixRain();
    createInteractiveTerminal();
    initAboutInteractivity(); 
};

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
