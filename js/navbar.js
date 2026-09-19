document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // Marcar link activo según URL
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (link.href === window.location.href || window.location.href.includes(link.getAttribute('href'))) {
      link.classList.add("active");
    }
  });

  // Aquí puedes añadir eventos para abrir carrito lateral o redirigir si tienes carrito
});
