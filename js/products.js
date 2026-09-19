const products = [
  { id: "1", name: "Producto Alpha", type: "Electrónico", price: 59.99, available: true, description: "Calidad premium y diseño moderno.", image: "https://via.placeholder.com/300x150?text=Alpha" },
  { id: "2", name: "Producto Beta", type: "Electrónico", price: 79.99, available: true, description: "Características técnicas avanzadas.", image: "https://via.placeholder.com/300x150?text=Beta" },
  { id: "3", name: "Producto Gamma", type: "Accesorio", price: 39.99, available: true, description: "Económico y eficiente.", image: "https://via.placeholder.com/300x150?text=Gamma" }
  // Añade más productos según tu catálogo
];

function renderProductList(productsToRender) {
  const productListEl = document.getElementById("product-list");
  productListEl.innerHTML = "";

  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="add-cart-btn">Agregar al carrito</button>
    `;

    card.querySelector("img").addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    card.querySelector(".add-cart-btn").addEventListener("click", () => {
      addToCart(product, card.querySelector("img"));
    });

    productListEl.appendChild(card);
  });
}
