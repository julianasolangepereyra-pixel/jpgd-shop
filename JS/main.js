const hamburger       = document.querySelector('.nav-hamburger');
const navLinks        = document.querySelector('.nav-links');
const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
const carritoResponsive = document.getElementById('carritoResponsive');
const drawerBackdrop  = document.getElementById('drawerBackdrop');
const navCartBtn      = document.getElementById('navCartBtn');
const carritoResponsiveClose = document.getElementById('carritoResponsiveClose');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function isMobile() {
  return window.innerWidth <= 782;
}

/* ── FUNCIONES GENERALES DE PANELES ── */
function openMenu() {
  if (!mobileMenuDrawer || !drawerBackdrop || !hamburger) return;
  mobileMenuDrawer.classList.add('is-open');
  mobileMenuDrawer.setAttribute('aria-hidden', 'false');
  drawerBackdrop.classList.add('is-active');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!mobileMenuDrawer || !drawerBackdrop || !hamburger) return;
  mobileMenuDrawer.classList.remove('is-open');
  mobileMenuDrawer.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.classList.remove('is-open');
  if (!carritoResponsive || !carritoResponsive.classList.contains('is-open')) {
    drawerBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

function openCart() {
  if (!carritoResponsive || !drawerBackdrop) return;
  carritoResponsive.classList.add('is-open');
  carritoResponsive.setAttribute('aria-hidden', 'false');
  drawerBackdrop.classList.add('is-active');
  if (navCartBtn) navCartBtn.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (!carritoResponsive || !drawerBackdrop) return;
  carritoResponsive.classList.remove('is-open');
  carritoResponsive.setAttribute('aria-hidden', 'true');
  if (navCartBtn) navCartBtn.classList.remove('is-active');
  if (!mobileMenuDrawer || !mobileMenuDrawer.classList.contains('is-open')) {
    drawerBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

function closeAll() {
  closeMenu();
  closeCart();
  if (drawerBackdrop) drawerBackdrop.classList.remove('is-active');
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
      carritoResponsive && carritoResponsive.classList.contains('is-open') ? closeCart() : openCart();
    }
  });
}

/* ── CERRAR CARRITO ── */
if (carritoResponsiveClose) {
  carritoResponsiveClose.addEventListener('click', closeCart);
}

/* ── CERRAR MENÚ ── */
if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', closeMenu);
}

/* ── BACKDROP ── */
if (drawerBackdrop) {
  drawerBackdrop.addEventListener('click', closeAll);
}

/* ── ESC ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAll();
});

/* ── LINKS DEL MENÚ RESPONSIVE ── */
if (mobileMenuDrawer) {
  mobileMenuDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ── DESKTOP: CERRAR NAV AL CLICKEAR FUERA ── */
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

/* ── CHECKOUT: VALIDACIÓN DE CAMPOS OBLIGATORIOS ── */
const checkoutForm = document.querySelector('.checkout-formulario');

if (checkoutForm) {
  const paymentRadios = Array.from(checkoutForm.querySelectorAll('input[name="metodo-pago"]'));
  const paymentSections = {
    tarjeta: document.getElementById('campos-tarjeta'),
    transferencia: document.getElementById('campos-transferencia'),
    mercadopago: document.getElementById('campos-mercadopago'),
  };

  function updatePaymentValidation() {
    const selectedMethod = paymentRadios.find(radio => radio.checked)?.value || 'tarjeta';

    paymentRadios.forEach(radio => {
      radio.closest('.metodo-pago-opcion')?.classList.toggle('metodo-pago-opcion--activa', radio.checked);
    });

    Object.entries(paymentSections).forEach(([method, section]) => {
      if (!section) return;
      const isActive = method === selectedMethod;
      section.classList.toggle('pago-panel--activo', isActive);
      section.querySelectorAll('input, select, textarea, button').forEach(field => {
        field.disabled = !isActive;
      });
    });
  }

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', updatePaymentValidation);
  });

  updatePaymentValidation();
}

/* ── CARRUSEL 3D DE CATEGORÍA ── */
const carruselPista = document.getElementById('carruselPista');

if (carruselPista) {
  const tarjetas = Array.from(carruselPista.querySelectorAll('.carrusel-3d__tarjeta'));
  const total    = tarjetas.length;
  const nombreEl = document.getElementById('carruselNombre');
  const precioEl = document.getElementById('carruselPrecio');
  const badgeEl  = document.getElementById('carruselBadge');
  const tallesEl = document.getElementById('carruselTalles');
  let actual = 0;

  function renderCarrusel() {
    tarjetas.forEach((tarjeta, i) => {
      tarjeta.classList.remove('carrusel-3d__tarjeta--actual', 'carrusel-3d__tarjeta--prev', 'carrusel-3d__tarjeta--next');
      const offset = (i - actual + total) % total;
      if (offset === 0) tarjeta.classList.add('carrusel-3d__tarjeta--actual');
      else if (offset === 1) tarjeta.classList.add('carrusel-3d__tarjeta--next');
      else if (offset === total - 1) tarjeta.classList.add('carrusel-3d__tarjeta--prev');
    });

    const datos = tarjetas[actual].dataset;
    nombreEl.textContent = datos.nombre;
    precioEl.textContent = datos.precio;

    if (datos.badge) {
      badgeEl.textContent = datos.badge;
      badgeEl.classList.remove('oculto');
    } else {
      badgeEl.classList.add('oculto');
    }

    tallesEl.innerHTML = '';
    if (datos.talles) {
      tallesEl.classList.remove('oculto');
      datos.talles.split(',').forEach((talle, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'carrusel-categoria__talle' + (i === 0 ? ' carrusel-categoria__talle--activo' : '');
        btn.textContent = talle;
        btn.addEventListener('click', () => {
          tallesEl.querySelectorAll('.carrusel-categoria__talle').forEach(b => b.classList.remove('carrusel-categoria__talle--activo'));
          btn.classList.add('carrusel-categoria__talle--activo');
        });
        tallesEl.appendChild(btn);
      });
    } else {
      tallesEl.classList.add('oculto');
    }
  }

  function moverCarrusel(delta) {
    actual = (actual + delta + total) % total;
    renderCarrusel();
  }

  document.querySelector('.carrusel-3d__flecha--prev').addEventListener('click', () => moverCarrusel(-1));
  document.querySelector('.carrusel-3d__flecha--next').addEventListener('click', () => moverCarrusel(1));

  tarjetas.forEach((tarjeta, i) => {
    tarjeta.addEventListener('click', e => {
      if (tarjeta.classList.contains('carrusel-3d__tarjeta--actual')) return;
      e.preventDefault();
      const offset = (i - actual + total) % total;
      moverCarrusel(offset === 1 ? 1 : -1);
    });
  });

  renderCarrusel();
}

/* ── CARRITO FUNCIONAL ── */
const CART_KEY = 'jpgdShopCart';

/* Lee el carrito guardado en el navegador. */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

/* Guarda el carrito y actualiza la interfaz. */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

/* Convierte un precio escrito como "$38.000" en número. */
function parsePrice(priceText) {
  return Number(String(priceText).replace(/[^\d]/g, '')) || 0;
}

/* Muestra números como precios argentinos. */
function formatPrice(price) {
  return `$${Number(price).toLocaleString('es-AR')}`;
}

/* Convierte rutas relativas de imágenes en rutas absolutas. */
function resolveAsset(src) {
  if (!src) return '';
  return new URL(src, window.location.href).href;
}

/* Identifica cada producto por nombre + talle. */
function cartItemKey(item) {
  return `${item.id}-${item.size || 'unico'}`;
}

/* Agrega un producto o suma cantidad si ya existía. */
function addToCart(item) {
  const cart = getCart();
  const key = cartItemKey(item);
  const existing = cart.find(cartItem => cartItemKey(cartItem) === key);

  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  saveCart(cart);
}

/* Cambia la cantidad de un producto del carrito. */
function updateCartQuantity(key, quantity) {
  const nextQuantity = Math.max(1, Number(quantity) || 1);
  const cart = getCart().map(item => (
    cartItemKey(item) === key ? { ...item, quantity: nextQuantity } : item
  ));
  saveCart(cart);
}

/* Elimina un producto completo del carrito. */
function removeFromCart(key) {
  saveCart(getCart().filter(item => cartItemKey(item) !== key));
}

/* Calcula el total a pagar. */
function getCartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/* Cuenta la cantidad total de unidades. */
function getCartCount(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/* Dibuja el círculo con número sobre el ícono del carrito. */
function renderCartBadge(cart) {
  if (!navCartBtn) return;

  let badge = navCartBtn.querySelector('.carrito-contador');
  const count = getCartCount(cart);
  const previousCount = Number(navCartBtn.dataset.cartCount || 0);

  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'carrito-contador';
    badge.setAttribute('aria-label', 'Cantidad de productos en el carrito');
    navCartBtn.appendChild(badge);
  }

  badge.textContent = count > 99 ? '99+' : count;
  badge.hidden = count === 0;
  navCartBtn.classList.toggle('has-items', count > 0);
  navCartBtn.dataset.cartCount = count;

  if (count > previousCount) {
    badge.classList.remove('carrito-contador--pop');
    void badge.offsetWidth;
    badge.classList.add('carrito-contador--pop');
  }
}

function buildDeleteIcon() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
      <path d="M10 11v6M14 11v6"></path>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
    </svg>
  `;
}

/* Dibuja los productos dentro del carrito responsive lateral. */
function renderCarritoResponsive(cart) {
  const itemsContainer = document.querySelector('.carrito-responsive__items');
  const totalText = document.querySelector('.carrito-responsive__total-text');
  if (!itemsContainer) return;

  if (!cart.length) {
    itemsContainer.innerHTML = '<p class="cart-empty-message">Tu carrito está vacío.</p>';
    if (totalText) totalText.textContent = 'TOTAL $0';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => {
    const key = cartItemKey(item);
    return `
      <div class="carrito-responsive__item" data-cart-key="${key}">
        <img class="carrito-responsive__item-img" src="${item.image}" alt="${item.name}" />
        <div class="carrito-responsive__item-info">
          <p>${item.name}</p>
          <p>${item.size ? `Talle ${item.size}` : 'Edición limitada'}</p>
          <p>${formatPrice(item.price)}</p>
        </div>
        <div class="carrito-responsive__item-qty">
          <button type="button" aria-label="Restar" data-cart-action="decrease">−</button>
          <span>${item.quantity}</span>
          <button type="button" aria-label="Sumar" data-cart-action="increase">+</button>
        </div>
        <button class="carrito-responsive__item-delete" type="button" aria-label="Eliminar ${item.name}" data-cart-action="remove">
          ${buildDeleteIcon()}
        </button>
      </div>
    `;
  }).join('');

  if (totalText) totalText.textContent = `TOTAL ${formatPrice(getCartTotal(cart))}`;
}

function renderCartPage(cart) {
  const list = document.querySelector('.carrito-lista');
  if (!list) return;

  const header = list.querySelector('.carrito-lista__encabezados')?.outerHTML || '';
  const countText = document.querySelector('.carrito-encabezado__cantidad');
  const summaryRows = document.querySelectorAll('.carrito-resumen__fila');
  const total = getCartTotal(cart);
  const count = getCartCount(cart);

  if (countText) countText.textContent = `${count} producto${count === 1 ? '' : 's'}`;

  if (!cart.length) {
    list.innerHTML = `${header}<p class="cart-empty-message cart-empty-message--page">Tu carrito está vacío.</p>`;
  } else {
    list.innerHTML = header + cart.map(item => {
      const key = cartItemKey(item);
      return `
        <article class="carrito-item" data-cart-key="${key}">
          <div class="carrito-item__producto">
            <a href="${item.url || '#'}" class="carrito-item__imagen-link">
              <img src="${item.image}" alt="${item.name}" class="carrito-item__imagen" />
            </a>
            <div class="carrito-item__descripcion">
              <h2 class="carrito-item__nombre">
                <a href="${item.url || '#'}">${item.name}</a>
              </h2>
              <dl class="carrito-item__meta">
                <div>
                  <dt>Talle</dt>
                  <dd>${item.size || 'Único'}</dd>
                </div>
                <div>
                  <dt>SKU</dt>
                  <dd>${item.id.toUpperCase()}</dd>
                </div>
              </dl>
            </div>
          </div>
          <p class="carrito-item__precio-unitario" data-label="Precio unitario">${formatPrice(item.price)}</p>
          <div class="carrito-item__cantidad" data-label="Cantidad">
            <div class="selector-cantidad__control" role="group" aria-label="Cantidad del producto">
              <button class="selector-cantidad__btn" type="button" aria-label="Restar" data-cart-action="decrease">−</button>
              <input class="selector-cantidad__input" type="number" value="${item.quantity}" min="1" max="10" aria-label="Cantidad" data-cart-action="input" />
              <button class="selector-cantidad__btn" type="button" aria-label="Sumar" data-cart-action="increase">+</button>
            </div>
          </div>
          <p class="carrito-item__subtotal" data-label="Subtotal">${formatPrice(item.price * item.quantity)}</p>
          <button class="carrito-item__eliminar" type="button" aria-label="Eliminar ${item.name}" data-cart-action="remove">
            ${buildDeleteIcon()}
          </button>
        </article>
        <div class="carrito-separador" role="separator"></div>
      `;
    }).join('');
  }

  if (summaryRows[0]) {
    summaryRows[0].querySelector('dt').textContent = `Subtotal (${count} producto${count === 1 ? '' : 's'})`;
    summaryRows[0].querySelector('dd').textContent = formatPrice(total);
  }

  if (summaryRows[2]) {
    summaryRows[2].querySelector('dd').textContent = formatPrice(total);
  }
}

function renderCart() {
  const cart = getCart();
  renderCartBadge(cart);
  renderCarritoResponsive(cart);
  renderCartPage(cart);
}

/* Lee texto de un selector; si no existe, usa un valor de respaldo. */
function getSelectedText(selector, fallback = '') {
  return document.querySelector(selector)?.textContent.trim() || fallback;
}

/* Lee texto dentro de un contenedor puntual. */
function getTextWithin(root, selector, fallback = '') {
  return root.querySelector(selector)?.textContent.trim() || fallback;
}

/* Talle elegido en las cards del home. */
function getSelectedSizeFromCard(card) {
  return card.querySelector('.size-tag.selected')?.textContent.trim() || 'Único';
}

/* Talle elegido en la sección cápsula. */
function getSelectedCapsulaSize() {
  return getSelectedText('.capsula-ficha__talle--activo', 'Único');
}

/* Talle elegido en producto.html. */
function getSelectedProductSize() {
  const checked = document.querySelector('input[name="talle"]:checked');
  return checked ? checked.value.toUpperCase() : 'Único';
}

/* Cantidad elegida en producto.html. */
function getCurrentProductQuantity() {
  const input = document.querySelector('#cantidad');
  return Math.max(1, Number(input?.value) || 1);
}

/* Arma el producto desde la página de detalle. */
function getProductDetailItem() {
  const name = getSelectedText('.producto-info__nombre', 'Producto JPGD');
  const img = document.querySelector('.galeria__imagen-activa');

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    price: parsePrice(getSelectedText('.producto-info__precio')),
    size: getSelectedProductSize(),
    quantity: getCurrentProductQuantity(),
    image: resolveAsset(img?.getAttribute('src')),
    url: resolveAsset('producto.html')
  };
}

/* Arma el producto desde la tarjeta activa del carrusel. */
function getCurrentCarruselItem() {
  const current = document.querySelector('.carrusel-3d__tarjeta--actual');
  if (!current) return null;

  const img = current.querySelector('img');
  const name = current.dataset.nombre || getSelectedText('#carruselNombre', 'Producto JPGD');

  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    price: parsePrice(current.dataset.precio || getSelectedText('#carruselPrecio')),
    size: getSelectedText('.carrusel-categoria__talle--activo', 'Único'),
    image: resolveAsset(img?.getAttribute('src')),
    url: resolveAsset('producto.html')
  };
}

/* Muestra "Agregado" por un momento en botones con texto. */
function showAddedFeedback(button) {
  const textEl = button.querySelector('span') || button;
  const original = textEl.textContent.trim();
  if (!original || button.querySelector('img')) return;

  textEl.textContent = 'Agregado';
  window.setTimeout(() => {
    textEl.textContent = original;
  }, 1200);
}

/* En mobile abre el carrito responsive después de agregar. */
function openCartAfterAdd() {
  if (carritoResponsive && isMobile()) {
    openCart();
  }
}

/* Conecta todos los botones y tarjetas que agregan productos. */
function bindAddButtons() {
  document.querySelectorAll('.btn-carrito').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      if (!card) return;

      const name = getTextWithin(card, 'h3', 'Producto JPGD');
      const img = card.querySelector('.product-img-wrapper img');
      addToCart({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        price: parsePrice(card.querySelector('.product-price')?.textContent),
        size: getSelectedSizeFromCard(card),
        image: resolveAsset(img?.getAttribute('src')),
        url: resolveAsset('html/producto.html')
      });
      openCartAfterAdd();
    });
  });

  document.querySelectorAll('.capsula-ficha__agregar').forEach(button => {
    button.addEventListener('click', () => {
      addToCart({
        id: 'capsula-01',
        name: 'Cápsula #01',
        price: 50000,
        size: '',
        image: resolveAsset('../Assets/fotos/capsula-1/Cápsula.png'),
        url: resolveAsset('capsula.html')
      });
      showAddedFeedback(button);
      openCartAfterAdd();
    });
  });

  document.querySelectorAll('.carrusel-categoria__agregar').forEach(button => {
    button.addEventListener('click', () => {
      const item = getCurrentCarruselItem();
      if (!item) return;

      addToCart(item);
      showAddedFeedback(button);
      openCartAfterAdd();
    });
  });

  document.querySelectorAll('.carrusel-3d__tarjeta').forEach(tarjeta => {
    tarjeta.addEventListener('click', event => {
      if (!tarjeta.classList.contains('carrusel-3d__tarjeta--actual')) return;
      event.preventDefault();

      const item = getCurrentCarruselItem();
      if (!item) return;

      addToCart(item);
      openCartAfterAdd();
    }, true);
  });

  document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(getProductDetailItem());
      openCartAfterAdd();
    });
  });

  document.querySelectorAll('.btn-comprar-ahora').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(getProductDetailItem());
    });
  });
}

/* Conecta botones de sumar, restar y eliminar del carrito. */
function bindCartControls() {
  document.addEventListener('click', event => {
    const action = event.target.closest('[data-cart-action]');
    if (!action) return;

    const itemEl = action.closest('[data-cart-key]');
    if (!itemEl) return;

    const key = itemEl.dataset.cartKey;
    const cart = getCart();
    const item = cart.find(cartItem => cartItemKey(cartItem) === key);
    if (!item) return;

    if (action.dataset.cartAction === 'increase') {
      updateCartQuantity(key, item.quantity + 1);
    }

    if (action.dataset.cartAction === 'decrease') {
      updateCartQuantity(key, item.quantity - 1);
    }

    if (action.dataset.cartAction === 'remove') {
      removeFromCart(key);
    }
  });

  document.addEventListener('change', event => {
    if (event.target.dataset.cartAction !== 'input') return;
    const itemEl = event.target.closest('[data-cart-key]');
    if (!itemEl) return;
    updateCartQuantity(itemEl.dataset.cartKey, event.target.value);
  });
}

/* Conecta + y - del selector de cantidad en producto.html. */
function bindProductQuantityControls() {
  const productQuantityInput = document.querySelector('#cantidad');
  if (!productQuantityInput) return;

  document.querySelectorAll('.selector-cantidad').forEach(control => {
    if (!control.contains(productQuantityInput)) return;

    const [minusBtn, plusBtn] = control.querySelectorAll('.selector-cantidad__btn');

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        productQuantityInput.value = Math.max(1, Number(productQuantityInput.value) - 1);
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        productQuantityInput.value = Math.min(10, Number(productQuantityInput.value) + 1);
      });
    }
  });
}

/* Permite cambiar el talle seleccionado en las cards del home. */
function bindCardSizeControls() {
  document.querySelectorAll('.product-card .size-tag').forEach(size => {
    size.addEventListener('click', () => {
      const card = size.closest('.product-card');
      card.querySelectorAll('.size-tag').forEach(tag => tag.classList.remove('selected'));
      size.classList.add('selected');
    });
  });
}

/* ── SELECTOR DE TALLE FICHA CÁPSULA ── */
document.querySelectorAll('.capsula-ficha__talle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.capsula-ficha__talle').forEach(b => b.classList.remove('capsula-ficha__talle--activo'));
    btn.classList.add('capsula-ficha__talle--activo');
  });
});

renderCart();
bindAddButtons();
bindCartControls();
bindProductQuantityControls();
bindCardSizeControls();
