document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const checkoutBtn = document.getElementById("checkout-btn");

  function renderCartSidebar() {
    loadCart();
    const container = document.getElementById("cart-container");
    const totalEl = document.getElementById("cart-total");

    if (cart.length === 0) {
      container.innerHTML = "<p>Tu carrito está vacío.</p>";
      totalEl.textContent = "";
      checkoutBtn.disabled = true;
      return;
    }

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <strong>${item.name}</strong> — $${item.price.toFixed(2)} x
        <input type="number" min="1" value="${item.qty}" />
        <button class="remove-btn" aria-label="Eliminar producto">×</button>
      `;

      div.querySelector("input").addEventListener("change", e => {
        const val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) {
          e.target.value = item.qty;
          return;
        }
        item.qty = val;
        saveCart();
        updateCartUI();
        renderCartSidebar();
      });

      div.querySelector(".remove-btn").addEventListener("click", () => {
        cart = cart.filter(p => p.id !== item.id);
        saveCart();
        updateCartUI();
        renderCartSidebar();
      });

      container.appendChild(div);
    });

    totalEl.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
  }

  cartBtn.addEventListener("click", () => {
    cartSidebar.classList.toggle("hidden");
    renderCartSidebar();
  });

  cartCloseBtn.addEventListener("click", () => {
    cartSidebar.classList.add("hidden");
  });

  checkoutBtn.addEventListener("click", () => {
    alert("Funcionalidad de compra no implementada aún.");
  });

  updateCartUI();
});
