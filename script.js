document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ===== HERO ENTRANCE ANIMATION =====
  const heroEntrance = document.querySelector('.hero-entrance');
  if (heroEntrance) {
    setTimeout(() => heroEntrance.classList.add('animate'), 200);
  }

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = 40 + Math.random() * 60 + '%';
      particle.style.width = (1 + Math.random() * 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // ===== FADE-UP ON SCROLL =====
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  metricNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
