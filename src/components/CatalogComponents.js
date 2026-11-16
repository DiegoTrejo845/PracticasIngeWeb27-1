// US 1.1 — Visualización del catálogo (DUPT-10)
// Componente con tres partes: estado (constructor), plantilla (render) y comportamiento (attachEvents).
// El constructor ya está fijo porque app.js lo usa así; lo demás se completa en la historia.
export class CatalogComponent {
  /**
   * @param {string} containerId  id del elemento donde se dibuja: 'catalog-container'
   * @param {Array<{id: number, name: string, price: number, image: string}>} products
   * @param {(product: object) => void} onAddToCart  función de app.js que agrega al carrito y actualiza el contador
   */
  constructor(containerId, products, onAddToCart) {
    this.container = document.getElementById(containerId);
    this.products = products;
    this.onAddToCart = onAddToCart;
  }

  // pintar solo algunos productos (por ejemplo, el resultado de un buscador).
  render(products = this.products) {
    this.container.innerHTML = `
      <div class="catalogo">
        ${products.map(product => `
          <div class="tarjeta">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p class="precio">$${product.price.toFixed(2)}</p>
            <button class="action-btn-add" type="button" data-id="${product.id}">
              Agregar al carrito
            </button>
          </div>
        `).join('')}
      </div>
    `;

    this.attachEvents();
  }

  // DUPT-22: al hacer clic, busca el producto por su id y se lo pasa a app.js
  attachEvents() {
    this.container.querySelectorAll('.action-btn-add').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id); // data-id llega como texto

        const product = this.products.find(p => p.id === id);

        if (product) {
          this.onAddToCart(product);
        }
      });
    });
  }
}