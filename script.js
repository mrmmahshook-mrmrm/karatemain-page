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

/* Black Belt Lightbox */
function openLightbox(wrap) {
  const img = wrap.querySelector('img');
  const card = wrap.closest('.bb-card');
  const name = card.querySelector('.bb-name').textContent;
  const dan  = card.querySelector('.bb-dan').textContent;

  document.getElementById('bbLightboxImg').src = img.src.replace('w=400', 'w=900');
  document.getElementById('bbLightboxName').textContent = name;
  document.getElementById('bbLightboxDan').textContent = dan;

  const lb = document.getElementById('bbLightbox');
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('bbLightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});

/* WhatsApp Registration */
function sendToWhatsApp(event) {
  event.preventDefault();

  const name  = document.getElementById("d-name").value;
  const phone = document.getElementById("d-phone").value;
  const sport = document.getElementById("d-sport").value;

  const message =
`New Registration:
Name: ${name}
Phone: ${phone}
Sport: ${sport}`;

  const whatsappNumber = "919061750885";

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.location.href = whatsappURL;
}