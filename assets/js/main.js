/* ── AGE CALCULATOR ─────────────────────────────────────── */
function calcAge() {
  const birth = new Date(2000, 6, 29); // July = month 6 (0-indexed)
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

document.addEventListener('DOMContentLoaded', () => {
  const age = calcAge();

  const ageValue = document.getElementById('age-value');
  const ageInline = document.getElementById('age-inline');
  const footerYear = document.getElementById('footer-year');

  if (ageValue)  ageValue.textContent  = age;
  if (ageInline) ageInline.textContent = age;
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ── NAVBAR SCROLL ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── BURGER MENU ──────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── INTERSECTION OBSERVER ────────────────────────────── */
  const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  // Skill cards with stagger
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);

  document.querySelectorAll('.skill-card, .project-card, .formation-card').forEach(el => {
    skillObserver.observe(el);
  });

  // Timeline items with stagger
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        tlObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);

  document.querySelectorAll('.timeline-item').forEach(el => {
    tlObserver.observe(el);
  });

  // Generic fade-up elements
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => {
    fadeObserver.observe(el);
  });

  /* ── ACTIVE NAV LINK ──────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));

  /* ── CONTACT FORM ─────────────────────────────────────── */
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = 'Veuillez remplir tous les champs.';
        note.className = 'form-note error';
        return;
      }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        note.textContent = 'Adresse email invalide.';
        note.className = 'form-note error';
        return;
      }

      // Simulate send (no backend)
      const btn = form.querySelector('button[type="submit"] span');
      btn.textContent = 'Envoi en cours…';

      setTimeout(() => {
        form.reset();
        note.textContent = 'Message envoyé ! Je vous répondrai rapidement.';
        note.className = 'form-note success';
        btn.textContent = 'Envoyer le message';
        setTimeout(() => { note.textContent = ''; note.className = 'form-note'; }, 5000);
      }, 1000);
    });
  }

  /* ── SMOOTH SCROLL OFFSET ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── TERMINAL TYPEWRITER ──────────────────────────────── */
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity .3s ease';
    setTimeout(() => {
      line.style.opacity = '1';
    }, 300 + i * 180);
  });
});
