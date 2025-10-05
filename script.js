
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
            behavior: 'smooth'
        });
            }
        }
    });
});


const sections = document.querySelectorAll('section');
let currentParticleColor = 'rgba(0, 212, 255, 0.8)'; 
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
            if (entry.target.id === 'projects') {
                animateProjectCards();
            }
            
            switch (entry.target.id) {
                case 'home':
                    currentParticleColor = 'rgba(0, 212, 255, 0.8)'; 
                    trail.style.background = 'radial-gradient(circle, #00d4ff 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#00d4ff');
                    document.documentElement.style.setProperty('--section-color-rgb', '0, 212, 255');
                    break;
                case 'experience':
                    currentParticleColor = 'rgba(187, 0, 255, 0.8)'; 
                    trail.style.background = 'radial-gradient(circle, #bb00ff 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#bb00ff');
                    document.documentElement.style.setProperty('--section-color-rgb', '187, 0, 255');
                    break;
                case 'education':
                    currentParticleColor = 'rgba(0, 255, 133, 0.8)'; 
                    trail.style.background = 'radial-gradient(circle, #00ff85 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#00ff85');
                    document.documentElement.style.setProperty('--section-color-rgb', '0, 255, 133');
                    break;
                case 'skills':
                    currentParticleColor = 'rgba(255, 140, 0, 0.8)'; 
                    trail.style.background = 'radial-gradient(circle, #ff8c00 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#ff8c00');
                    document.documentElement.style.setProperty('--section-color-rgb', '255, 140, 0');
                    break;
                case 'projects':
                    currentParticleColor = 'rgba(255, 0, 170, 0.8)'; 
                    trail.style.background = 'radial-gradient(circle, #ff00aa 0%, transparent 70%)';
                    document.documentElement.style.setProperty('--section-color', '#ff00aa');
                    document.documentElement.style.setProperty('--section-color-rgb', '255, 0, 170');
                    break;
                case 'contact':
                    currentParticleColor = 'rgba(0, 102, 255, 0.8)'; 
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


window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('hidden'); 
    } else {
        header.classList.remove('hidden'); 
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});


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


const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 50;

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


document.addEventListener('mousemove', (e) => {
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
});


const parallaxElements = document.querySelectorAll('.parallax');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    parallaxElements.forEach(el => {
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});


function revealText(section) {
    const reveals = section.querySelectorAll('.reveal');
    reveals.forEach((reveal, index) => {
        setTimeout(() => {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }, index * 300);
    });
}


function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}


function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
        
        
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.1) translateY(-3px)';
                tag.style.boxShadow = '0 5px 15px rgba(var(--section-color-rgb), 0.4)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1) translateY(0)';
                tag.style.boxShadow = 'none';
            });
        });
        
        
        const features = card.querySelectorAll('.feature');
        features.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                feature.style.transform = 'translateY(-3px) scale(1.05)';
                feature.style.boxShadow = '0 5px 15px rgba(var(--section-color-rgb), 0.3)';
            });
            
            feature.addEventListener('mouseleave', () => {
                feature.style.transform = 'translateY(0) scale(1)';
                feature.style.boxShadow = 'none';
            });
        });
        
        
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}


function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        observer.observe(card);
    });
}

function initAboutInteractivity() {
    const aboutItems = document.querySelectorAll('.about-item');

    aboutItems.forEach(item => {
        const detail = item.querySelector('.detail');

        
        item.addEventListener('mouseenter', () => {
            detail.classList.remove('hidden');
            detail.classList.add('visible');
        });

        item.addEventListener('mouseleave', () => {
            detail.classList.remove('visible');
            detail.classList.add('hidden');
        });

        
        item.addEventListener('click', () => {
            if (detail.classList.contains('visible')) {
                detail.classList.remove('visible');
                detail.classList.add('hidden');
            } else {
                
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


observer.observe(document.getElementById('about')); 

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


function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.7';
    canvas.style.display = 'none'; 
    canvas.style.pointerEvents = 'none'; 
    
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
        
        .terminal-response a {
            color: #00ffff;
            text-decoration: underline;
            transition: all 0.3s ease;
        }
        
        .terminal-response a:hover {
            color: #ffffff;
            text-shadow: 0 0 5px #00ffff;
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
    

    
    
    const terminalInput = terminal.querySelector('.terminal-input');
    const terminalOutput = terminal.querySelector('.terminal-output');
    
    
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
                    <div style="color: #00ffff;">Available commands:</div>
                    <div style="margin-left: 20px;">
                        <div>• help - Show this help message</div>
                        <div>• clear - Clear terminal</div>
                        <div>• about - About Lewis Miller</div>
                        <div>• skills - Technical skills & frameworks</div>
                        <div>• projects - Portfolio projects</div>
                        <div>• trading - Trading & quantitative work</div>
                        <div>• resume - Download resume</div>
                        <div>• contact - Contact information</div>
                        <div>• matrix - Toggle matrix rain effect</div>
                        <div>• whoami - Display user info</div>
                        <div>• ls - List sections</div>
                        <div>• cd - Navigate sections</div>
                        <div>• exit - Close terminal</div>
                    </div>
                `;
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                return;
            case 'about':
                response = `
                    <div style="color: #00ffff;">Lewis Miller - Full Stack Developer & Quantitative Trader</div>
                    <div>📍 Location: Naples, FL</div>
                    <div>🎯 Specialties: Full Stack Web Dev, Cloud Hosting, API Integration, Algorithmic Trading</div>
                    <div>🏆 Former FL Powerlifting Record Holder</div>
                    <div>🎮 Pro Esports Athlete (Valorant)</div>
                    <div>🇧🇷 Served LDS Mission in Brazil (Portuguese fluent)</div>
                    <div>💻 Currently: Computer Science @ Southern Virginia University</div>
                `;
                break;
            case 'skills':
                response = `
                    <div style="color: #00ffff;">Languages & Frameworks:</div>
                    <div>• Python (90%) - Django, Data Analysis, Trading Algorithms</div>
                    <div>• JavaScript (85%) - React, Node.js, Web Development</div>
                    <div>• Flutter/Dart (75%) - Mobile Development</div>
                    <div>• HTML/CSS (95%) - Responsive Design, Animations</div>
                    <div>• SQL (85%) - Database Design & Optimization</div>
                    <div>• Pine Script (90%) - TradingView Indicators</div>
                    <br>
                    <div style="color: #00ffff;">Tools & Platforms:</div>
                    <div>• AWS, Google Cloud, Azure - Cloud Hosting</div>
                    <div>• Supabase, Firebase - Backend Services</div>
                    <div>• Git/GitHub - Version Control</div>
                    <div>• TradingView API - Financial Data</div>
                `;
                break;
            case 'projects':
                response = `
                    <div style="color: #00ffff;">Portfolio Projects:</div>
                    <div>• LEWON Styles - E-commerce platform (React, Supabase, Stripe)</div>
                    <div>• CTR Trading Indicator - Pine Script trading algorithm</div>
                    <div>• Bitcoin Cycle Analysis - Python quantitative analysis</div>
                    <div>• LEWIE'S LMS - Learning Management System</div>
                    <div>• Crypto Trading Course - Educational platform (Firebase)</div>
                    <div>• Trading Community & AI - Community platform with AI integration</div>
                    <div>• Database Hosting Solutions - Cloud database services</div>
                    <div>• Discord Profit Bot - Python trading calculator bot</div>
                    <div>• Family Search RPG - 3D genealogy game (In Development)</div>
                `;
                break;
            case 'trading':
                response = `
                    <div style="color: #00ffff;">Trading & Quantitative Work:</div>
                    <div>• CTR Trading Indicator - Multi-timeframe analysis (1H, 6H, 16H)</div>
                    <div>• Bitcoin Cycle Analysis - 8+ years of weekly data analysis</div>
                    <div>• Pine Script Development - Custom TradingView indicators</div>
                    <div>• Python Trading Algorithms - Automated analysis & signals</div>
                    <div>• Risk Management Systems - Position sizing & R:R calculations</div>
                    <div>• TradingView API Integration - Real-time market data</div>
                `;
                break;
            case 'resume':
                response = `
                    <div style="color: #00ffff;">Resume Download:</div>
                    <div>📄 <a href="Lewis M - Portfolio.pdf" download style="color: #00ffff;">Click here to download resume (PDF)</a></div>
                    <div>📧 For more information, contact: lewis.miller@svu.edu</div>
                `;
                break;
            case 'contact':
                response = `
                    <div style="color: #00ffff;">Contact Information:</div>
                    <div>📧 Email: lewis.miller@svu.edu</div>
                    <div>💼 LinkedIn: lewis-miller-60980a314</div>
                    <div>🌐 Website: ctrtrades.com</div>
                    <div>📍 Location: Naples, FL</div>
                    <div>📱 Available for freelance & full-time opportunities</div>
                `;
                break;
            case 'whoami':
                response = `
                    <div style="color: #00ffff;">User: lewieville</div>
                    <div>Role: Full Stack Developer & Quantitative Trader</div>
                    <div>Status: Available for opportunities</div>
                    <div>Interests: Coding, Trading, Esports, Powerlifting, Genealogy</div>
                `;
                break;
            case 'ls':
                response = `
                    <div style="color: #00ffff;">Portfolio Sections:</div>
                    <div>📁 about/ - Personal information & background</div>
                    <div>📁 projects/ - Portfolio projects showcase</div>
                    <div>📁 skills/ - Technical skills & frameworks</div>
                    <div>📁 experience/ - Professional experience</div>
                    <div>📁 education/ - Academic background</div>
                    <div>📁 contact/ - Contact form & information</div>
                `;
                break;
            case 'cd':
                response = `
                    <div style="color: #00ffff;">Navigation Commands:</div>
                    <div>• cd about - Scroll to About Me section</div>
                    <div>• cd projects - Scroll to Projects section</div>
                    <div>• cd skills - Scroll to Skills section</div>
                    <div>• cd contact - Scroll to Contact section</div>
                    <div>• cd .. - Return to top</div>
                `;
                break;
            case 'matrix':
                if (document.querySelector('.matrix-toggle')) {
                document.querySelector('.matrix-toggle').click();
                    response = 'Toggling matrix rain effect...';
                } else {
                    response = 'Matrix effect not available.';
                }
                break;
            case 'exit':
                terminal.style.display = 'none';
                return;
            default:
                response = `
                    <div style="color: #ff6b6b;">Command not found: ${cmd}</div>
                    <div>Type 'help' for available commands.</div>
                `;
        }
        
        terminalOutput.innerHTML += `<div class="terminal-response">${response}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    
    terminal.querySelector('.terminal-close').addEventListener('click', function() {
        terminal.style.display = 'none';
    });
    
    
    terminalOutput.style.overflowY = 'auto';
}


window.onload = () => {
    typeWriter();
    initParticles();
    animateParticles();
    createMatrixRain();
    createInteractiveTerminal();
    initAboutInteractivity(); 
    initProjectCards();
    animateProjectCards();
    
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '1';
    });
    
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    
    const projectButtons = document.querySelectorAll('.project-link');
    projectButtons.forEach(button => {
        if (button.href === 'javascript:void(0)') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const buttonText = this.textContent;
                if (buttonText.includes('Demo') || buttonText.includes('Analysis')) {
                    
                } else if (buttonText.includes('Code')) {
                    
                } else if (buttonText.includes('Live')) {
                    
                }
            });
        }
    });
};


function showTradingIndicatorCode() {
    const code = `
indicator("CTR Indicator (Fixed MFI)", overlay=true)


res_1h = "60"   
res_6h = "360"  
res_16h = "960" 

fast_length = input.int(12, "MACD Fast Length")
slow_length = input.int(26, "MACD Slow Length")
signal_length = input.int(9, "MACD Signal Smoothing")
rsiMFIperiod = input.int(60, "MFI Period")
wtChannelLen = input.int(9, "WT Channel Length")  
wtAverageLen = input.int(12, "WT Average Length")
wtMALen = input.int(3, "WT MA Length")


f_macd(src, fast, slow, signal) =>
    fast_ma = ta.ema(src, fast)
    slow_ma = ta.ema(src, slow)
    macd = fast_ma - slow_ma
    signal_line = ta.ema(macd, signal)
    hist = macd - signal_line
    [macd, signal_line, hist]


f_rsimfi(period) =>
    typical_price = (high + low + close) / 3
    money_flow = typical_price * volume
    pos_flow = ta.sma(money_flow * (typical_price > typical_price[1] ? 1 : 0), period)
    neg_flow = ta.sma(money_flow * (typical_price < typical_price[1] ? 1 : 0), period)
    money_flow_ratio = pos_flow / neg_flow
    100 - (100 / (1 + money_flow_ratio))


f_wavetrend(src, chlen, avg, malen) =>
    esa = ta.ema(src, chlen)
    de = ta.ema(math.abs(src - esa), chlen)
    ci = (src - esa) / (0.015 * de)
    wt1 = ta.ema(ci, avg)
    wt2 = ta.sma(wt1, malen)
    wtCrossUp = ta.crossover(wt1, wt2)
    [wt1, wt2, wtCrossUp]


[wt1_1h, wt2_1h, wtCrossUp_1h] = request.security(syminfo.tickerid, res_1h, f_wavetrend(hlc3, wtChannelLen, wtAverageLen, wtMALen), lookahead=barmerge.lookahead_off)
mfi_1h = request.security(syminfo.tickerid, res_1h, f_rsimfi(rsiMFIperiod), lookahead=barmerge.lookahead_off)


[_, _, hist_6h] = request.security(syminfo.tickerid, res_6h, f_macd(close, fast_length, slow_length, signal_length), lookahead=barmerge.lookahead_off)
mfi_6h = request.security(syminfo.tickerid, res_6h, f_rsimfi(rsiMFIperiod), lookahead=barmerge.lookahead_off)

macd_green_6h = hist_6h > 0
mfi_green_6h = mfi_6h > 50


[_, _, hist_16h] = request.security(syminfo.tickerid, res_16h, f_macd(close, fast_length, slow_length, signal_length), lookahead=barmerge.lookahead_off)
mfi_16h = request.security(syminfo.tickerid, res_16h, f_rsimfi(rsiMFIperiod), lookahead=barmerge.lookahead_off)

macd_green_16h = hist_16h > 0
mfi_green_16h = mfi_16h > 50


multi_tf_green = macd_green_6h and mfi_green_6h and macd_green_16h and mfi_green_16h


green_dot_valid = wtCrossUp_1h and mfi_1h > 50 


final_buy_signal = green_dot_valid and multi_tf_green


plotshape(final_buy_signal, title="Buy Signal", style=shape.labelup, location=location.belowbar, color=color.lime, text="BUY")`;

    showCodeModal('CTR Trading Indicator - Pine Script', code, 'pine-script');
}


function showBitcoinAnalysisCode() {
    const code = `import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import pandas_ta as ta

# 1. Download BTC Weekly Data
btc = yf.download("BTC-USD", start="2016-01-01", interval="1wk", auto_adjust=False)

# 2. Flatten MultiIndex columns if present
if isinstance(btc.columns, pd.MultiIndex):
    btc.columns = ['_'.join(col).strip() for col in btc.columns.values]

btc.reset_index(inplace=True)

# 3. Identify numeric columns
numeric_cols = [col for col in ['Open_BTC-USD', 'High_BTC-USD', 'Low_BTC-USD', 'Close_BTC-USD',
                                'Adj Close_BTC-USD', 'Volume_BTC-USD'] if col in btc.columns]

# 4. Clean numeric columns
btc[numeric_cols] = btc[numeric_cols].apply(pd.to_numeric, errors='coerce')
btc = btc.dropna(subset=numeric_cols).reset_index(drop=True)

# 5. Rename
rename_map = {col: col.split('_')[0] for col in numeric_cols}
btc.rename(columns=rename_map, inplace=True)

# 6. Indicators
btc["SMA10"] = btc["Close"].rolling(10).mean()
btc["RSI"] = ta.rsi(btc["Close"], length=14)

# ------------------------
# Swing Low Detection
# ------------------------
def detect_swing_lows(data, lookback=2, lookforward=2):
    lows = []
    for i in range(lookback, len(data) - lookforward):
        prev_lows = data['Low'].iloc[i - lookback:i].values
        next_lows = data['Low'].iloc[i + 1:i + 1 + lookforward].values
        if data['Low'].iloc[i] <= prev_lows.min() and data['Low'].iloc[i] <= next_lows.min():
            lows.append(i)
    return lows

swing_lows = detect_swing_lows(btc)

# ------------------------
# Confirm Swing Lows (BTC specific)
# ------------------------
confirmed_lows = []
for idx in swing_lows:
    if pd.notna(btc['SMA10'].iloc[idx]) and pd.notna(btc['RSI'].iloc[idx]):
        # Confirmation rules:
        sma_cross = btc['Close'].iloc[idx] > btc['SMA10'].iloc[idx]
        rsi_oversold = btc['RSI'].iloc[idx] < 40
        v_reversal = btc['RSI'].iloc[idx] > btc['RSI'].iloc[idx-1]  # upward momentum shift

        if (sma_cross and rsi_oversold) or (sma_cross and v_reversal):  # Allow V-shaped BTC reversals
            confirmed_lows.append(idx)

# ------------------------
# Detect Cycle Failures
# ------------------------
failed_lows = []
for j in range(1, len(confirmed_lows)):
    prev = confirmed_lows[j - 1]
    curr = confirmed_lows[j]
    if btc['Close'].iloc[curr] < btc['Low'].iloc[prev]:
        failed_lows.append(curr)

# ------------------------
# Detect Cycle Highs & Translation
# ------------------------
cycle_info = []
for j in range(1, len(confirmed_lows)):
    start = confirmed_lows[j - 1]
    end = confirmed_lows[j]

    cycle_high_idx = btc['High'].iloc[start:end + 1].idxmax()
    cycle_high_date = btc['Date'].iloc[cycle_high_idx]
    cycle_high_price = btc['High'].iloc[cycle_high_idx]

    # midpoint of the cycle
    midpoint = (start + end) 

    if cycle_high_idx > midpoint:
        translation = "RT"  # Right Translated
    elif cycle_high_idx < midpoint:
        translation = "LT"  # Left Translated
    else:
        translation = "MT"  # Mid

    cycle_info.append({
        "Cycle #": j,
        "Start Date": btc['Date'].iloc[start],
        "End Date": btc['Date'].iloc[end],
        "High Date": cycle_high_date,
        "High Price": cycle_high_price,
        "Translation": translation,
        "Failed": (end in failed_lows)
    })

cycles_df = pd.DataFrame(cycle_info)
print(cycles_df)

# ------------------------
# Plotting with Cycle High Labels
# ------------------------
plt.figure(figsize=(14, 7))
plt.plot(btc['Date'], btc['Close'], label="BTC-USD", color="black")

# Mark confirmed lows
for i in confirmed_lows:
    plt.scatter(btc['Date'].iloc[i], btc['Low'].iloc[i], color="blue", marker="^", s=100,
                label="Confirmed WCL" if i == confirmed_lows[0] else "")

# Mark failed lows
for f in failed_lows:
    plt.scatter(btc['Date'].iloc[f], btc['Low'].iloc[f], color="red", marker="x", s=100,
                label="Failed Cycle Low" if f == failed_lows[0] else "")

# Shade timing windows
for i in confirmed_lows:
    start = i + 24
    end = i + 42
    if end < len(btc):
        plt.axvspan(btc['Date'].iloc[start], btc['Date'].iloc[end], color="lightblue", alpha=0.2)

# Mark cycle highs with translation labels
for row in cycle_info:
    high_idx = btc[btc['Date'] == row["High Date"]].index[0]
    plt.scatter(btc['Date'].iloc[high_idx], btc['High'].iloc[high_idx],
                color="green", marker="o", s=80)
    plt.text(btc['Date'].iloc[high_idx], btc['High'].iloc[high_idx] * 1.05,
             row["Translation"], color="green", fontsize=9, ha="center")

plt.legend()
plt.title("Bitcoin Weekly Cycles: Lows, Failures & Translation")
plt.xlabel("Date")
plt.ylabel("Price (USD)")
plt.show()`;

    showCodeModal('Bitcoin Cycle Analysis - Python', code, 'python');
}


function showImageModal(title, imageSrc) {
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    `;

    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #1a1a1a;
        border: 2px solid var(--section-color);
        border-radius: 10px;
        max-width: 95%;
        max-height: 95%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
    `;

    
    const header = document.createElement('div');
    header.style.cssText = `
        background: var(--section-color);
        color: #000;
        padding: 15px 20px;
        font-weight: bold;
        font-size: 1.2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    header.innerHTML = `
        <span>${title} - Demo</span>
        <button onclick="this.closest('.modal').remove()" style="background: none; border: none; color: #000; font-size: 1.5em; cursor: pointer;">&times;</button>
    `;

    
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
        max-height: 80vh;
        overflow: auto;
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title;
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(var(--section-color-rgb), 0.3);
    `;

    imageContainer.appendChild(img);

    
    modalContent.appendChild(header);
    modalContent.appendChild(imageContainer);
    modal.appendChild(modalContent);
    modal.className = 'modal';

    
    document.body.appendChild(modal);

    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}


function showBotCode() {
    const botCode = `import discord
from discord.ext import commands
import asyncio
import random
from datetime import datetime, timedelta

# Bot configuration
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

# Trading calculations
def calculate_position_size(account_balance, risk_percentage, entry_price, stop_loss):
    """Calculate position size based on risk management"""
    risk_amount = account_balance * (risk_percentage / 100)
    price_risk = abs(entry_price - stop_loss)
    position_size = risk_amount / price_risk
    return round(position_size, 2)

def calculate_rr_ratio(entry_price, stop_loss, take_profit):
    """Calculate Risk:Reward ratio"""
    risk = abs(entry_price - stop_loss)
    reward = abs(take_profit - entry_price)
    if risk == 0:
        return 0
    return round(reward / risk, 2)

@bot.event
async def on_ready():
    print(f'\\{bot.user\\} has connected to Discord!')

@bot.command(name='position')
async def position_size(ctx, balance: float, risk: float, entry: float, stop: float):
    """Calculate position size for risk management"""
    size = calculate_position_size(balance, risk, entry, stop)
    await ctx.send(f"**Position Size:** \\{size\\} units\\\\n**Risk Amount:** $\\{balance * (risk/100):.2f\\}")

@bot.command(name='rr')
async def risk_reward(ctx, entry: float, stop: float, target: float):
    """Calculate Risk:Reward ratio"""
    ratio = calculate_rr_ratio(entry, stop, target)
    await ctx.send(f"**Risk:Reward Ratio:** 1:\\{ratio\\}")

@bot.command(name='profit')
async def profit_calc(ctx, entry: float, exit: float, quantity: float):
    """Calculate profit/loss"""
    pnl = (exit - entry) * quantity
    percentage = ((exit - entry) / entry) * 100
    await ctx.send(f"**P&L:** $\\{pnl:.2f\\}\\\\n**Percentage:** \\{percentage:.2f\\}%")

bot.run('YOUR_BOT_TOKEN')`;

    showCodeModal('Discord Profit Bot - Python', botCode, 'python');
}


function showTradingIndicatorCode() {
    const tradingCode = `
indicator("CTR Indicator (Fixed MFI)", overlay=true)


res_1h = "60" 
res_6h = "360" 
res_16h = "960" 
fast_length = input.int(12, "MACD Fast Length")
slow_length = input.int(26, "MACD Slow Length")
signal_length = input.int(9, "MACD Signal Smoothing")
rsiMFIperiod = input.int(60, "MFI Period")
wtChannelLen = input.int(9, "WT Channel Length")

wtAverageLen = input.int(12, "WT Average Length")
wtMALen = input.int(3, "WT MA Length")


f_macd(src, fast, slow, signal) =>
    fast_ma = ta.ema(src, fast)
    slow_ma = ta.ema(src, slow)
    macd = fast_ma - slow_ma
    signal_line = ta.ema(macd, signal)
    hist = macd - signal_line
    [macd, signal_line, hist]


f_rsimfi(period) =>
    typical_price = (high + low + close) / 3
    money_flow = typical_price * volume
    pos_flow = ta.sma(money_flow * (typical_price > typical_price[1] ? 1 : 0), period)
    neg_flow = ta.sma(money_flow * (typical_price < typical_price[1] ? 1 : 0), period)
    money_flow_ratio = pos_flow / neg_flow
    100 - (100 / (1 + money_flow_ratio))


f_wavetrend(src, chlen, avg, malen) =>
    esa = ta.ema(src, chlen)
    de = ta.ema(math.abs(src - esa), chlen)
    ci = (src - esa) / (0.015 * de)
    wt1 = ta.ema(ci, avg)
    wt2 = ta.sma(wt1, malen)
    wtCrossUp = ta.crossover(wt1, wt2)
    [wt1, wt2, wtCrossUp]


[wt1_1h, wt2_1h, wtCrossUp_1h] = request.security(syminfo.tickerid, res_1h, f_wavetrend(hlc3, wtChannelLen, wtAverageLen, wtMALen), lookahead=barmerge.lookahead_off)
mfi_1h = request.security(syminfo.tickerid, res_1h, f_rsimfi(rsiMFIperiod), lookahead=barmerge.lookahead_off)


[_, _, hist_6h] = request.security(syminfo.tickerid, res_6h, f_macd(close, fast_length, slow_length, signal_length), lookahead=barmerge.lookahead_off)
mfi_6h = request.security(syminfo.tickerid, res_6h, f_rsimfi(rsiMFIperiod), lookahead=barmerge.lookahead_off)
macd_green_6h = hist_6h > 0
mfi_green_6h = mfi_6h > 50


[_, _, hist_16h] = request.security(syminfo.tickerid, res_16h, f_macd(close, fast_length, slow_length, signal_length), lookahead=barmerge.lookahead_off)
mfi_16h = request.security(syminfo.tickerid, res_16h, f_rsimfi(rsiMFIperiod), lookahead=barmerge.lookahead_off)
macd_green_16h = hist_16h > 0
mfi_green_16h = mfi_16h > 50


multi_tf_green = macd_green_6h and mfi_green_6h and macd_green_16h and mfi_green_16h


green_dot_valid = wtCrossUp_1h and mfi_1h > 50 


final_buy_signal = green_dot_valid and multi_tf_green


plotshape(final_buy_signal, title="Buy Signal", style=shape.labelup, location=location.belowbar, color=color.lime, text="BUY")
BTC Cycle trade`;

    showCodeModal('CTR Trading Indicator - Pine Script', tradingCode, 'pinescript');
}


function showCodeModal(title, code, language) {
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    `;

    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: #1a1a1a;
        border: 2px solid var(--section-color);
        border-radius: 10px;
        max-width: 90%;
        max-height: 90%;
        width: 800px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;

    
    const header = document.createElement('div');
    header.style.cssText = `
        background: var(--section-color);
        color: #000;
        padding: 15px 20px;
        font-weight: bold;
        font-size: 1.2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    header.innerHTML = `
        <span>${title}</span>
        <button onclick="this.closest('.modal').remove()" style="background: none; border: none; color: #000; font-size: 1.5em; cursor: pointer;">&times;</button>
    `;

    
    const codeContainer = document.createElement('div');
    codeContainer.style.cssText = `
        padding: 20px;
        overflow: auto;
        max-height: 70vh;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        line-height: 1.4;
        color: #fff;
        background: #000;
        white-space: pre-wrap;
        word-wrap: break-word;
    `;
    codeContainer.textContent = code;

    
    const footer = document.createElement('div');
    footer.style.cssText = `
        padding: 15px 20px;
        background: #333;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    `;
    
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Code';
    copyButton.style.cssText = `
        background: var(--section-color);
        color: #000;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    `;
    copyButton.onclick = () => {
        navigator.clipboard.writeText(code).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => copyButton.textContent = 'Copy Code', 2000);
        });
    };

    footer.appendChild(copyButton);

    
    modalContent.appendChild(header);
    modalContent.appendChild(codeContainer);
    modalContent.appendChild(footer);
    modal.appendChild(modalContent);
    modal.className = 'modal';

    
    document.body.appendChild(modal);

    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
