/* MMASI — Interactions */

function toggleMenu() {
  const drawer = document.getElementById('navDrawer');
  const btn = document.getElementById('hamburger');
  drawer.classList.toggle('open');
  btn.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

/* WhatsApp Registration */
function sendToWhatsApp(event) {
  event.preventDefault();
  const form = event.target;
  const name  = form.querySelector('[id$="name"]').value;
  const phone = form.querySelector('[id$="phone"]').value;
  const placeEl = form.querySelector('[id$="place"]');
  const place = placeEl ? placeEl.value : '';
  const sport = form.querySelector('[id$="sport"]').value;

  const message =
`New Registration:
Name: ${name}
Phone: ${phone}
Place: ${place}
Sport: ${sport}`;

  const whatsappNumber = "919746906878";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappURL;
}

/* ─── Animated Counter ───────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  const suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.childNodes[0].textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ─── Intersection Observer — scroll reveals + stat counters ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* 1. General reveal animation */
  const revealElements = document.querySelectorAll(
    '.reveal, .bb-tile, .ach-card, .gen-tile, .why-card, .mv-card, .program-card, .discipline-card, .location-card'
  );

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

  revealElements.forEach((el, index) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal', 'fade-bottom');
      el.style.transitionDelay = `${(index % 4) * 0.12}s`;
    }
    revealObserver.observe(el);
  });

  /* 2. Animated stat counters */
  const statNums = document.querySelectorAll('.stat-num');
  let countersTriggered = false;

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          statNums.forEach(numEl => {
            // Parse target from text (digits only)
            const raw = numEl.textContent.replace(/[^0-9]/g, '');
            const target = parseInt(raw, 10);
            if (!isNaN(target)) animateCounter(numEl, target);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  /* 3. Navbar shrink on scroll */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.padding = '0.7rem 4rem';
      nav.style.boxShadow = '0 4px 40px rgba(0,0,0,0.7)';
    } else {
      nav.style.padding = '';
      nav.style.boxShadow = '';
    }
  }, { passive: true });
});
