function renderCartPage() {
  loadCart();

  const cartContainer = document.getElementById("cart-container");
  const cartTotalEl = document.getElementById("cart-total");
  const continueBtn = document.getElementById("continue-btn");

  if (!cartContainer || !cartTotalEl || !continueBtn) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    cartTotalEl.textContent = "";
    continueBtn.style.display = "none";
    return;
  }

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <strong>${item.name}</strong> — $${item.price.toFixed(2)} x
      <input type="number" min="1" value="${item.qty}" />
      <button class="remove-btn">Eliminar</button>
    `;

    const qtyInput = itemDiv.querySelector("input");
    qtyInput.addEventListener("change", e => {
      let newQty = parseInt(e.target.value);
      if (isNaN(newQty) || newQty < 1) {
        e.target.value = item.qty;
        return;
      }
      item.qty = newQty;
      saveCart();
      updateCartUI();
      renderCartPage();
    });

    itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
      cart = cart.filter(p => p.id !== item.id);
      saveCart();
      updateCartUI();
      renderCartPage();
    });

    cartContainer.appendChild(itemDiv);
  });

  cartTotalEl.textContent = `Total a pagar: $${total.toFixed(2)}`;
  continueBtn.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  updateCartUI();
});
