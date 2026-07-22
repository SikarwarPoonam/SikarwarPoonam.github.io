document.addEventListener('DOMContentLoaded', () => {

  /* ── Page Fade-In ── */
  const overlay = document.querySelector('.page-transition');
  if (overlay) setTimeout(() => overlay.classList.add('loaded'), 80);

  /* ── Page Fade-Out on nav clicks ── */
  document.querySelectorAll('a[href]').forEach(link => {
    if (
      link.hostname === window.location.hostname &&
      !link.target &&
      !link.hasAttribute('download') &&
      !link.href.startsWith('mailto:')
    ) {
      link.addEventListener('click', e => {
        const dest = link.href;
        if (dest === window.location.href) return;
        e.preventDefault();
        if (overlay) {
          overlay.classList.remove('loaded');
          setTimeout(() => { window.location.href = dest; }, 380);
        } else {
          window.location.href = dest;
        }
      });
    }
  });

  /* ── Active Nav Link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ────────────────────────────────────────────
     FLOATING ATOMS BACKGROUND ANIMATION
  ──────────────────────────────────────────── */
  const canvas = document.getElementById('mol-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Color options matching the new site style (Indigo, Teal, Rose)
  const COLOR_PALETTE = [
    'rgba(99, 102, 241, VAL)',  // indigo
    'rgba(20, 184, 166, VAL)',  // teal
    'rgba(236, 72, 153, VAL)'   // rose
  ];

  let W, H, atoms = [];
  const ATOM_COUNT = 32;
  let mouse = { x: null, y: null, active: false };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function createAtom() {
    const radius = rnd(6, 12);
    const color = pick(COLOR_PALETTE);
    
    // Create 1 to 3 electron orbits
    const numOrbits = Math.floor(rnd(1, 4));
    const orbits = [];
    for (let i = 0; i < numOrbits; i++) {
      orbits.push({
        rx: radius * rnd(2.0, 3.5),
        ry: radius * rnd(0.8, 1.6),
        angle: rnd(0, Math.PI * 2),
        speed: rnd(0.015, 0.04) * (Math.random() > 0.5 ? 1 : -1),
        currentAngle: rnd(0, Math.PI * 2),
        electronRadius: rnd(1.8, 3.0)
      });
    }

    return {
      x: rnd(0, W),
      y: rnd(0, H),
      vx: rnd(-0.25, 0.25),
      vy: rnd(-0.25, 0.25),
      baseVx: 0,
      baseVy: 0,
      radius,
      color,
      orbits,
      alpha: rnd(0.12, 0.22)
    };
  }

  function init() {
    resize();
    atoms = Array.from({ length: ATOM_COUNT }, createAtom);
    
    // Store original velocities as base velocities
    atoms.forEach(a => {
      a.baseVx = a.vx;
      a.baseVy = a.vy;
    });
  }

  // Mouse event listeners
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  function drawAtom(a) {
    const { x, y, radius, color, orbits, alpha } = a;

    // 1. Draw orbitals & electrons
    orbits.forEach(o => {
      // Draw faint orbit ellipse
      ctx.beginPath();
      if (ctx.ellipse) {
        ctx.ellipse(x, y, o.rx, o.ry, o.angle, 0, Math.PI * 2);
      } else {
        // Fallback for older browsers
        ctx.arc(x, y, o.rx, 0, Math.PI * 2);
      }
      ctx.strokeStyle = color.replace('VAL', alpha * 0.15);
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Update electron angle
      // If mouse is active and near, speed up the electron slightly for interactive feel
      let currentSpeed = o.speed;
      if (mouse.active) {
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 180) {
          currentSpeed = o.speed * (2.0 - dist / 180);
        }
      }
      o.currentAngle += currentSpeed;

      // Calculate electron position on the rotated ellipse
      const ex = o.rx * Math.cos(o.currentAngle);
      const ey = o.ry * Math.sin(o.currentAngle);
      const cosA = Math.cos(o.angle);
      const sinA = Math.sin(o.angle);
      const rotX = x + ex * cosA - ey * sinA;
      const rotY = y + ex * sinA + ey * cosA;

      // Electron core
      ctx.fillStyle = color.replace('VAL', alpha * 0.95);
      ctx.beginPath();
      ctx.arc(rotX, rotY, o.electronRadius, 0, Math.PI * 2);
      ctx.fill();

      // Electron glow
      const eGlow = ctx.createRadialGradient(rotX, rotY, 0, rotX, rotY, o.electronRadius * 2);
      eGlow.addColorStop(0, color.replace('VAL', alpha * 0.5));
      eGlow.addColorStop(1, color.replace('VAL', 0));
      ctx.fillStyle = eGlow;
      ctx.beginPath();
      ctx.arc(rotX, rotY, o.electronRadius * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw nucleus
    // Outer nucleus glow
    const nucleusGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
    nucleusGlow.addColorStop(0, color.replace('VAL', alpha * 0.5));
    nucleusGlow.addColorStop(0.4, color.replace('VAL', alpha * 0.2));
    nucleusGlow.addColorStop(1, color.replace('VAL', 0));
    ctx.fillStyle = nucleusGlow;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Nucleus core
    const nucleusCore = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, 0, x, y, radius);
    nucleusCore.addColorStop(0, '#ffffff');
    nucleusCore.addColorStop(0.2, color.replace('VAL', alpha * 0.95));
    nucleusCore.addColorStop(1, color.replace('VAL', alpha * 0.7));
    ctx.fillStyle = nucleusCore;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Nucleus border
    ctx.strokeStyle = color.replace('VAL', alpha * 0.3);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // Update positions and velocities
    atoms.forEach(a => {
      // Mouse interaction (repulsion)
      if (mouse.active) {
        const dx = a.x - mouse.x;
        const dy = a.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const effectDist = 180;
        
        if (dist < effectDist) {
          const force = (effectDist - dist) / effectDist;
          const angle = Math.atan2(dy, dx);
          const push = force * 0.45;
          a.vx += Math.cos(angle) * push;
          a.vy += Math.sin(angle) * push;
        } else {
          a.vx += (a.baseVx - a.vx) * 0.04;
          a.vy += (a.baseVy - a.vy) * 0.04;
        }
      } else {
        a.vx += (a.baseVx - a.vx) * 0.02;
        a.vy += (a.baseVy - a.vy) * 0.02;
      }

      // Limit speed
      const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      const maxSpeed = 1.8;
      if (speed > maxSpeed) {
        a.vx = (a.vx / speed) * maxSpeed;
        a.vy = (a.vy / speed) * maxSpeed;
      }

      a.x += a.vx;
      a.y += a.vy;

      // Wrap around edges
      const pad = 60;
      if (a.x < -pad) a.x = W + pad;
      if (a.x > W + pad) a.x = -pad;
      if (a.y < -pad) a.y = H + pad;
      if (a.y > H + pad) a.y = -pad;
    });

    // Draw lines between nearby atoms (bonding energy field)
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const a1 = atoms[i];
        const a2 = atoms[j];
        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const bondDist = 130;

        if (dist < bondDist) {
          const avgAlpha = (a1.alpha + a2.alpha) / 2;
          const strength = (1 - dist / bondDist) * avgAlpha * 0.35;
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.strokeStyle = a1.color.replace('VAL', strength);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    atoms.forEach(drawAtom);

    requestAnimationFrame(loop);
  }

  init();
  loop();
  window.addEventListener('resize', () => {
    resize();
    atoms.forEach(a => {
      if (a.x > W) a.x = rnd(0, W);
      if (a.y > H) a.y = rnd(0, H);
    });
  });
});