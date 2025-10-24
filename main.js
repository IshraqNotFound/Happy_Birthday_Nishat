/*window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 1000);
  }, 1000);
});*/

const pythonKeywords = ["def", "import", "return", "class", "lambda", "async", "await", "yield"];
let keyIndex = 0;

setInterval(() => {
  const spinner = document.querySelector('.spinner');
  if (spinner) {
    spinner.textContent = pythonKeywords[keyIndex];
    keyIndex = (keyIndex + 1) % pythonKeywords.length;
  }
}, 500);

const synth = new Tone.Synth().toDestination();

const happyBirthdayMelody = [
  { note: 'C4', duration: '8n' },
  { note: 'C4', duration: '8n' },
  { note: 'D4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'F4', duration: '4n' },
  { note: 'E4', duration: '2n' },
  { note: 'C4', duration: '8n' },
  { note: 'C4', duration: '8n' },
  { note: 'D4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'G4', duration: '4n' },
  { note: 'F4', duration: '2n' },
  { note: 'C4', duration: '8n' },
  { note: 'C4', duration: '8n' },
  { note: 'C5', duration: '4n' },
  { note: 'A4', duration: '4n' },
  { note: 'F4', duration: '4n' },
  { note: 'E4', duration: '4n' },
  { note: 'D4', duration: '2n' },
  { note: 'A#4', duration: '8n' },
  { note: 'A#4', duration: '8n' },
  { note: 'A4', duration: '4n' },
  { note: 'F4', duration: '4n' },
  { note: 'G4', duration: '4n' },
  { note: 'F4', duration: '2n' }
];

function playToneMelody(melody) {
  let now = Tone.now();
  melody.forEach(({ note, duration }) => {
    synth.triggerAttackRelease(note, duration, now);
    now += Tone.Time(duration).toSeconds();
  });
}

const enterBtn = document.getElementById('enter-fullscreen');
enterBtn.addEventListener('click', () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 1000);
  }, 300);
  Tone.start().then(() => {
    playToneMelody(happyBirthdayMelody);
  });
});

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.particles = [];
    this.exploded = false;
    this.vy = -12;
    this.ay = 0.2;
  }
  
  update() {
    if (!this.exploded) {
      this.y += this.vy;
      this.vy += this.ay;
      if (this.y <= this.targetY || this.vy >= 0) {
        this.exploded = true;
        for (let i = 0; i < 30; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    }
  }
  
  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(p => {
        p.update();
        p.draw();
      });
    }
  }
  
  done() {
    return this.exploded && this.particles.every(p => p.alpha <= 0);
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.alpha = 1;
    this.color = color;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }
  fireworks.forEach(f => {
    f.update();
    f.draw();
  });
  fireworks = fireworks.filter(f => !f.done());
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function showSection2() {
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "block";
}

function showSection1() {
  document.getElementById("section2").style.display = "none";
  document.getElementById("section1").style.display = "block";
}