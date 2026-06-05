const hamburger       = document.querySelector('.nav-hamburger');
const navLinks        = document.querySelector('.nav-links');
const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
const mobileCartDrawer = document.getElementById('mobileCartDrawer');
const drawerBackdrop  = document.getElementById('drawerBackdrop');
const navCartBtn      = document.getElementById('navCartBtn');
const mobileCartClose = document.getElementById('mobileCartClose');

function isMobile() {
  return window.innerWidth <= 768;
}

/* ── HELPERS ── */
function openMenu() {
  mobileMenuDrawer.classList.add('is-open');
  mobileMenuDrawer.setAttribute('aria-hidden', 'false');
  drawerBackdrop.classList.add('is-active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenuDrawer.classList.remove('is-open');
  mobileMenuDrawer.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  if (!mobileCartDrawer.classList.contains('is-open')) {
    drawerBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

function openCart() {
  mobileCartDrawer.classList.add('is-open');
  mobileCartDrawer.setAttribute('aria-hidden', 'false');
  drawerBackdrop.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  mobileCartDrawer.classList.remove('is-open');
  mobileCartDrawer.setAttribute('aria-hidden', 'true');
  if (!mobileMenuDrawer.classList.contains('is-open')) {
    drawerBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

function closeAll() {
  closeMenu();
  closeCart();
  drawerBackdrop.classList.remove('is-active');
  document.body.style.overflow = '';
}

/* ── HAMBURGUESA ── */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (isMobile()) {
      mobileMenuDrawer.classList.contains('is-open') ? closeMenu() : openMenu();
    } else {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    }
  });
}

/* ── CARRITO ── */
if (navCartBtn) {
  navCartBtn.addEventListener('click', e => {
    if (isMobile()) {
      e.preventDefault();
      mobileCartDrawer.classList.contains('is-open') ? closeCart() : openCart();
    }
  });
}

/* ── CERRAR CARRITO ── */
if (mobileCartClose) {
  mobileCartClose.addEventListener('click', closeCart);
}

/* ── BACKDROP ── */
if (drawerBackdrop) {
  drawerBackdrop.addEventListener('click', closeAll);
}

/* ── ESC ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAll();
});

/* ── LINKS DEL DRAWER ── */
if (mobileMenuDrawer) {
  mobileMenuDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ── DESKTOP: cerrar nav links al clickear fuera ── */
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!isMobile() && !e.target.closest('nav')) {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── CANTIDAD EN CARRITO MOBILE ── */
document.querySelectorAll('.mobile-cart-item-qty').forEach(control => {
  const span  = control.querySelector('span');
  const [btnMinus, btnPlus] = control.querySelectorAll('button');

  btnMinus.addEventListener('click', () => {
    const val = parseInt(span.textContent);
    if (val > 1) span.textContent = val - 1;
  });

  btnPlus.addEventListener('click', () => {
    span.textContent = parseInt(span.textContent) + 1;
  });
});
