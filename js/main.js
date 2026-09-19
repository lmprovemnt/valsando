document.addEventListener("DOMContentLoaded", () => {
  renderProductList(products);

  const searchInput = document.getElementById("searchInput");
  const filterType = document.getElementById("filterType");
  const filterAvailability = document.getElementById("filterAvailability");
  const filterPrice = document.getElementById("filterPrice");

  function filterAndRender() {
    let filtered = products;

    const searchText = searchInput.value.toLowerCase().trim();
    if (searchText) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));

    if (filterType.value) filtered = filtered.filter(p => p.type === filterType.value);

    if (filterAvailability.value) {
      const avail = filterAvailability.value === "true";
      filtered = filtered.filter(p => p.available === avail);
    }

    if (filterPrice.value) {
      if (filterPrice.value === "low") filtered = filtered.filter(p => p.price < 50);
      else if (filterPrice.value === "medium") filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
      else if (filterPrice.value === "high") filtered = filtered.filter(p => p.price > 100);
    }

    renderProductList(filtered);
  }

  searchInput.addEventListener("input", filterAndRender);
  filterType.addEventListener("change", filterAndRender);
  filterAvailability.addEventListener("change", filterAndRender);
  filterPrice.addEventListener("change", filterAndRender);

  updateCartUI();
});


/* ==========================================================================
   TRANSICIONES Y ANIMACIONES SENIOR
   ========================================================================== */

function initSmoothPageTransitions() {
  if (!document.startViewTransition) return;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || link.target || link.origin !== location.origin || link.hasAttribute('download')) return;
    if (link.pathname === location.pathname && link.search === location.search) return;

    e.preventDefault();
    const targetURL = link.href;

    document.startViewTransition(async () => {
      const response = await fetch(targetURL);
      const text = await response.text();
      const newDocument = new DOMParser().parseFromString(text, 'text/html');

      document.body.innerHTML = newDocument.body.innerHTML;
      document.title = newDocument.title;
      history.pushState({}, '', targetURL);

      window.scrollTo(0, 0);
      if (typeof initScrollAnimations === 'function') initScrollAnimations();
    });
  });
}

function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .section-title, .hero__content, .feature-card, .reveal-on-scroll').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothPageTransitions();
  initScrollAnimations();
});
