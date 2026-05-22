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
  const sport = form.querySelector('[id$="sport"]').value;

  const message =
`New Registration:
Name: ${name}
Phone: ${phone}
Sport: ${sport}`;

  const whatsappNumber = "919746906878";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappURL;
}

/* Intersection Observer for Scroll Animations */
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal, .bb-tile, .ach-card, .gen-tile');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to run animation only once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el, index) => {
    // For gallery items that don't have .reveal yet, add it dynamically
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal', 'fade-bottom');
      // Add staggered delay based on index
      el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }
    observer.observe(el);
  });
});