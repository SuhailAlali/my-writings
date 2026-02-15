const canvas = document.getElementById("bubble-canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// فقاعات هادئة
const bubbles = [];
const numBubbles = 40;

for (let i = 0; i < numBubbles; i++) {
  bubbles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 10 + 3,
    speed: Math.random() * 0.7 + 0.1,
    alpha: Math.random() * 0.3 + 0.1,
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  for (let b of bubbles) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${b.alpha})`;
    ctx.fill();
    
    b.y -= b.speed;
    
    if (b.y + b.r < 0) {
      b.y = height + b.r;
      b.x = Math.random() * width;
      b.r = Math.random() * 10 + 3;
      b.speed = Math.random() * 0.7 + 0.1;
      b.alpha = Math.random() * 0.3 + 0.1;
    }
  }
  
  requestAnimationFrame(animate);
}

animate();