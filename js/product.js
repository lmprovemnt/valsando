function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const products = [
  { id: "1", name: "Producto Alpha", price: 59.99, description: "Calidad premium y diseño moderno.", image: "https://via.placeholder.com/600x400?text=Alpha" },
  { id: "2", name: "Producto Beta", price: 79.99, description: "Características técnicas avanzadas.", image: "https://via.placeholder.com/600x400?text=Beta" },
  // Más productos...
];

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromUrl();
  const product = products.find(p => p.id === productId);

  if (!product) {
    alert("Producto no encontrado");
    window.location.href = "products.html";
    return;
  }

  document.getElementById("product-main-image").src = product.image;
  document.getElementById("product-main-image").alt = product.name;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("product-description").textContent = product.description;

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("quantity").value);
    if (isNaN(qty) || qty < 1) {
      alert("Ingrese una cantidad válida");
      return;
    }
    addToCart({ ...product, qty }, document.getElementById("product-main-image"));
    alert(`Añadiste ${qty} unidad(es) de ${product.name} al carrito.`);
  });
});
