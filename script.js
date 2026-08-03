// Particle Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 4 + 1;
    this.speedY = Math.random() * 1 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.type = Math.random() > 0.5 ? 'heart' : 'circle';
    this.color = Math.random() > 0.5 ? '#e91e63' : '#ffd700';
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) this.reset();
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + s/4);
      ctx.bezierCurveTo(this.x, this.y, this.x - s, this.y, this.x - s, this.y + s/4);
      ctx.bezierCurveTo(this.x - s, this.y + s/2, this.x, this.y + s, this.x, this.y + s);
      ctx.bezierCurveTo(this.x, this.y + s, this.x + s, this.y + s/2, this.x + s, this.y + s/4);
      ctx.bezierCurveTo(this.x + s, this.y, this.x, this.y, this.x, this.y + s/4);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

for (let i = 0; i < 60; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Scroll reveal for letter
const letter = document.getElementById('letter');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
observer.observe(letter);

// Surprise button
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseOverlay = document.getElementById('surpriseOverlay');
const closeBtn = document.getElementById('closeBtn');

surpriseBtn.addEventListener('click', () => {
  surpriseOverlay.classList.add('active');
  createFloatingHearts();
});

closeBtn.addEventListener('click', () => {
  surpriseOverlay.classList.remove('active');
});

surpriseOverlay.addEventListener('click', (e) => {
  if (e.target === surpriseOverlay) {
    surpriseOverlay.classList.remove('active');
  }
});

function createFloatingHearts() {
  const hearts = ['\u2764','\uD83D\uDC96','\uD83D\uDC95','\uD83D\uDC97','\uD83D\uDC9D','\uD83D\uDC98'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random()*6)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.bottom = '0';
      heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
      heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, i * 150);
  }
    }
