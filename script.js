/**
 * Quantum Obsidian Interactive Script
 * Poonam Sikarwar Portfolio (2026)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Page Transitions ── */
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    setTimeout(() => overlay.classList.add('loaded'), 80);
  }

  document.querySelectorAll('a[href]').forEach(link => {
    if (
      link.hostname === window.location.hostname &&
      !link.target &&
      !link.hasAttribute('download') &&
      !link.href.startsWith('mailto:') &&
      !link.href.startsWith('tel:') &&
      !link.href.includes('#')
    ) {
      link.addEventListener('click', e => {
        const dest = link.href;
        if (dest === window.location.href) return;
        e.preventDefault();
        if (overlay) {
          overlay.classList.remove('loaded');
          setTimeout(() => { window.location.href = dest; }, 300);
        } else {
          window.location.href = dest;
        }
      });
    }
  });

  /* ── 2. Floating Nav Active State & Mobile Menu ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  /* ── 3. Scroll Reveal System ── */
  const revealEls = document.querySelectorAll('.reveal');
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Trigger stat count-up if applicable
        if (entry.target.classList.contains('hero-stats')) {
          animateStats();
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── 4. Mouse-Tracking Card Ambient Spotlight ── */
  const spotCards = document.querySelectorAll('.bento-card, .pub-card, .contact-card');
  spotCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ── 5. Count-Up Stats Animation ── */
  let statsAnimated = false;
  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => {
      const targetText = num.textContent.trim();
      const targetVal = parseFloat(targetText.replace(/[^0-9.]/g, ''));
      if (isNaN(targetVal)) return;

      const suffix = targetText.replace(/[0-9.]/g, '');
      let current = 0;
      const duration = 1500;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = targetVal / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetVal) {
          num.textContent = (Number.isInteger(targetVal) ? targetVal : targetVal.toFixed(1)) + suffix;
          clearInterval(timer);
        } else {
          num.textContent = (Number.isInteger(targetVal) ? Math.floor(current) : current.toFixed(1)) + suffix;
        }
      }, stepTime);
    });
  }

  /* ── 6. Publication Filtering ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  if (filterBtns.length > 0 && pubCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        pubCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter || (filter === 'perovskite' && cat && cat.includes('perovskite'))) {
            card.style.display = 'grid';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

  /* ── 7. Copy-to-Clipboard Function ── */
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = 'var(--accent-teal)';
          btn.style.color = '#ffffff';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });

  /* ── 8. Quantum Canvas Background ── */
  const canvas = document.getElementById('mol-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.3 + 0.1
    };
  }

  function initCanvas() {
    resize();
    particles = Array.from({ length: 45 }, createParticle);
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, W, H);
    
    // Draw links between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 140) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(drawCanvas);
  }

  initCanvas();
  drawCanvas();
  window.addEventListener('resize', resize);
});