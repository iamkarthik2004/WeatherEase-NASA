const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Raindrop class
class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 10 + 5;
    this.speed = Math.random() * 1 + 0.5; // Slow rain
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

// Create raindrops
const raindrops = [];
for (let i = 0; i < 100; i++) {
  raindrops.push(new Raindrop());
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  raindrops.forEach(drop => {
    drop.update();
    drop.draw();
  });
  requestAnimationFrame(animate);
}

animate();
