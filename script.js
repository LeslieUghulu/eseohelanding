/* ================================
   ESEOHE — Landing Page Scripts
   ================================ */

/* ---- NAV scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- Particle system ---- */
(function initParticles() {
  const container = document.getElementById('particles');
  const count = 30;
  const colors = ['rgba(168,85,247,0.6)', 'rgba(219,39,119,0.5)', 'rgba(14,165,233,0.4)', 'rgba(245,158,11,0.4)'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: -${Math.random() * 20}s;
    `;
    container.appendChild(p);
  }
})();

/* ---- Waveform bars ---- */
(function buildWaveform() {
  const container = document.getElementById('waveBars');
  const bars = 40;

  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    const h = Math.random() * 70 + 20;
    bar.style.height = `${h}%`;
    container.appendChild(bar);
  }
})();

/* ---- Simulated music player ---- */
(function initPlayer() {
  const playBtn  = document.getElementById('playBtn');
  const iconPlay  = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');
  const waveBars  = document.getElementById('waveBars');

  let isPlaying = false;
  let animationInterval = null;
  let progress = 0;
  const bars = waveBars.querySelectorAll('.wave-bar');

  function animateBars() {
    animationInterval = setInterval(() => {
      progress += 1;
      const active = Math.floor((progress / 200) * bars.length);
      bars.forEach((bar, i) => {
        bar.classList.toggle('active', i < active);
        if (isPlaying && i >= active) {
          bar.style.height = `${Math.random() * 70 + 20}%`;
        }
      });
      if (progress >= 200) {
        clearInterval(animationInterval);
        progress = 0;
        bars.forEach(bar => bar.classList.remove('active'));
        isPlaying = false;
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
      }
    }, 80);
  }

  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    iconPlay.style.display  = isPlaying ? 'none' : '';
    iconPause.style.display = isPlaying ? ''     : 'none';

    if (isPlaying) {
      animateBars();
    } else {
      clearInterval(animationInterval);
    }
  });

  // Waveform scrub
  waveBars.parentElement.addEventListener('click', e => {
    const rect = waveBars.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    progress = Math.floor(ratio * 200);
  });
})();

/* ---- Reveal on scroll ---- */
(function initReveal() {
  const targets = [
    '.about-grid',
    '.music-grid',
    '.featured-track',
    '.gallery-grid',
    '.tour-item',
    '.contact-text',
    '.contact-socials',
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
      observer.observe(el);
    });
  });
})();

/* ---- Subtle tilt on album cards ---- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- Subscribe form ---- */
document.getElementById('subscribeForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn   = e.target.querySelector('button');
  const orig  = btn.textContent;

  btn.textContent = 'Subscribed!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  input.value = '';

  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 3000);
});

/* ---- Active nav highlight ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.color = 'var(--purple-lt)';
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();
