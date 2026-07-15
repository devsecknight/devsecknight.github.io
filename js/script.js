// ── FADE IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── AMBIENT GLOW FOLLOWS MOUSE ──
const blob = document.querySelector('.glow-blob');
if (blob) {
  document.addEventListener('mousemove', e => {
    blob.style.left = (e.clientX - 250) + 'px';
    blob.style.top  = (e.clientY - 250) + 'px';
  });
}

// ── HAMBURGER NAV MENU ──
(function () {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.nav-hamburger');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!navLinks || !hamburger) return;

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    if (backdrop) {
      backdrop.style.display = 'block';
      requestAnimationFrame(() => backdrop.classList.add('visible'));
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (backdrop) {
      backdrop.classList.remove('visible');
      backdrop.addEventListener('transitionend', () => {
        backdrop.style.display = '';
      }, { once: true });
    }
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) closeMenu();
    else openMenu();
  });

  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close menu on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

// ── SIDEBAR MOBILE TOGGLE ──
(function () {
  const sidebar = document.querySelector('.sidebar');
  const wrapper = document.querySelector('.page-with-sidebar');
  if (!sidebar || !wrapper) return;

  // Create toggle button
  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '&#9776; &nbsp;Sections';

  btn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.innerHTML = isOpen
      ? '&#10005; &nbsp;Close Sections'
      : '&#9776; &nbsp;Sections';
  });

  // Insert toggle before sidebar inside wrapper
  wrapper.insertBefore(btn, sidebar);
})();

// ── NOTIFICATION BANNER DELAY ──
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector('.notification-banner');
  if (banner) {
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'notif-close';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.onclick = () => banner.classList.remove('show');
    banner.appendChild(closeBtn);

    setTimeout(() => {
      banner.classList.add('show');
    }, 3000);
  }
});
