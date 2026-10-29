// Task 3 - cart badge and mini cart (plain JavaScript, no libraries)

// N = 43  ->  a product may be added at most (N mod 4) + 2 = (43 mod 4) + 2 = 5 times
const N = 43;
const MAX_PER_PRODUCT = (N % 4) + 2;

// The cart is an array of { name, price } objects.
// Adding the same product twice puts two entries in the array.
const cart = [];

// ----- elements already on the page -----
const addButtons = document.querySelectorAll('.add-eqt');          // the "+" (Add to Cart) buttons
const cartLink   = document.getElementById('cart-toggle');         // the cart icon
const badge      = document.getElementById('cart-badge');
const panel      = document.getElementById('mini-cart');
const listEl     = document.getElementById('mini-cart-list');
const emptyEl    = document.getElementById('mini-cart-empty');
const totalEl    = document.getElementById('mini-cart-total');

// ----- helpers -----

// "£70.00" -> 70
function parsePrice(text) {
  return Number(text.replace(/[^0-9.]/g, ''));
}

// 70 -> "£70.00"
function formatPrice(value) {
  return '£' + value.toFixed(2);
}

// Read name and price from the card that contains the clicked button.
function readProduct(button) {
  const card = button.closest('.EQT-card, .product-product-card');
  return {
    name: card.querySelector('.eqt-title, .product-title').textContent.trim(),
    price: parsePrice(card.querySelector('.eqt-price, .product-price').textContent)
  };
}

// How many of this product are in the cart right now?
function countInCart(name) {
  return cart.filter(function (item) { return item.name === name; }).length;
}

// ----- add to cart -----
function addToCart(button) {
  const product = readProduct(button);
  if (countInCart(product.name) >= MAX_PER_PRODUCT) return;   // safety net, button is disabled anyway
  cart.push(product);
  render();
}

// ----- remove from cart -----
function removeFromCart(index) {
  cart.splice(index, 1);
  render();
}

// ----- keep every "+" button in sync with the cart -----
function updateButtons() {
  addButtons.forEach(function (button) {
    const name = readProduct(button).name;
    if (countInCart(name) >= MAX_PER_PRODUCT) {
      button.textContent = 'Limit reached';
      button.disabled = true;
      button.classList.add('is-limit');
      button.setAttribute('aria-label', 'Limit reached for ' + name);
    } else {
      button.textContent = '+';
      button.disabled = false;
      button.classList.remove('is-limit');
      button.setAttribute('aria-label', 'Add ' + name + ' to cart');
    }
  });
}

// ----- redraw badge, list, total and buttons from the cart array -----
function render() {
  // list
  listEl.replaceChildren();
  cart.forEach(function (item, index) {
    const li = document.createElement('li');
    li.className = 'mini-cart-item';

    const name = document.createElement('span');
    name.className = 'mini-cart-name';
    name.textContent = item.name;

    const price = document.createElement('span');
    price.className = 'mini-cart-price';
    price.textContent = formatPrice(item.price);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'mini-cart-remove';
    remove.textContent = 'Remove';
    remove.dataset.index = index;
    remove.setAttribute('aria-label', 'Remove ' + item.name + ' from cart');

    li.append(name, price, remove);
    listEl.append(li);
  });
  emptyEl.hidden = cart.length > 0;

  // total, calculated with reduce()
  const total = cart.reduce(function (sum, item) { return sum + item.price; }, 0);
  totalEl.textContent = formatPrice(total);

  // badge on the cart icon
  badge.textContent = cart.length;
  badge.hidden = cart.length === 0;
  cartLink.setAttribute('aria-label', 'Cart, ' + cart.length + (cart.length === 1 ? ' item' : ' items'));

  updateButtons();
}

// ----- open / close the mini cart -----
function setOpen(open) {
  panel.hidden = !open;
  cartLink.setAttribute('aria-expanded', String(open));
}

// ----- events -----
addButtons.forEach(function (button) {
  button.addEventListener('click', function () { addToCart(button); });
});

// Clicking the cart icon toggles the panel instead of following the link
// (the panel has its own CHECKOUT link, and with no JavaScript the icon still goes to checkout.html).
cartLink.addEventListener('click', function (event) {
  event.preventDefault();
  setOpen(panel.hidden);
});

// One listener on the list handles every Remove button (event delegation).
listEl.addEventListener('click', function (event) {
  const button = event.target.closest('.mini-cart-remove');
  if (!button) return;
  const index = Number(button.dataset.index);
  removeFromCart(index);

  // keep keyboard focus inside the panel after the row disappears
  const next = listEl.querySelectorAll('.mini-cart-remove')[index] ||
               listEl.querySelectorAll('.mini-cart-remove')[index - 1];
  (next || cartLink).focus();
});

// Escape closes the panel and returns focus to the cart icon
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !panel.hidden) {
    setOpen(false);
    cartLink.focus();
  }
});

// first draw (sets button labels, hides the badge)
render();