let cart = [];

function loadCart() {
  const stored = localStorage.getItem("valsando_cart");
  cart = stored ? JSON.parse(stored) : [];
}

function saveCart() {
  localStorage.setItem("valsando_cart", JSON.stringify(cart));
}

function updateCartUI() {
  loadCart();
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = count;
}

function addToCart(product, productImageElement = null) {
  loadCart();
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart();
  updateCartUI();
  if (productImageElement) animateAddToCart(productImageElement);
}

function removeFromCart(productId) {
  loadCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function animateAddToCart(productImageElement) {
  const cartBtn = document.getElementById("cart-btn");
  if (!productImageElement || !cartBtn) return;

  const imgClone = productImageElement.cloneNode(true);
  const imgRect = productImageElement.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  imgClone.style.position = "fixed";
  imgClone.style.left = imgRect.left + "px";
  imgClone.style.top = imgRect.top + "px";
  imgClone.style.width = imgRect.width + "px";
  imgClone.style.height = imgRect.height + "px";
  imgClone.style.transition = "all 0.8s ease-in-out";
  imgClone.style.zIndex = 1000;
  imgClone.style.borderRadius = "8px";
  imgClone.style.pointerEvents = "none";

  document.body.appendChild(imgClone);

  requestAnimationFrame(() => {
    imgClone.style.left = cartRect.left + "px";
    imgClone.style.top = cartRect.top + "px";
    imgClone.style.width = "30px";
    imgClone.style.height = "30px";
    imgClone.style.opacity = "0.5";
  });

  imgClone.addEventListener("transitionend", () => {
    imgClone.remove();
  });
}
