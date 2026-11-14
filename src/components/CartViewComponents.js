// US 2.2 — Modificar y eliminar ítems (DUPT-12, Sprint 1)
// US 3.1 — Vista detallada del carrito (DUPT-13, Sprint 2)
// El constructor ya está fijo porque app.js lo usa así; lo demás se completa en las historias.
export class CartViewComponent {
  /**
   * @param {string} containerId  id del elemento donde se dibuja: 'cart-container'
   * @param {Cart} cart  la misma instancia del carrito que usa app.js
   * @param {() => void} onCartChange  updateCartBadge de app.js: llamarla después de cada cambio
   */
  constructor(containerId, cart, onCartChange) {
    this.container = document.getElementById(containerId);
    this.cart = cart;
    this.onCartChange = onCartChange;
  }

  render() {
    const items = this.cart.getItems();
    // DUPT-31: una fila por producto con nombre, precio, botones - / + y basurero (data-id en cada botón)
    // DUPT-35 a DUPT-37 (Sprint 2): subtotal por ítem, total con this.cart.getTotal() y mensaje de carrito vacío
    this.container.innerHTML = `
      <p class="placeholder">Vista del carrito pendiente: US 2.2 (DUPT-12) y US 3.1 (DUPT-13). Productos en el carrito: ${items.length}</p>
    `;
    this.attachEvents();
  }

  attachEvents() {
    // DUPT-32: cada botón llama a un método de Cart y después vuelve a pintar y avisa al contador:
    //   this.cart.updateQuantity(id, cantidad)  o  this.cart.removeItem(id)
    //   this.render();
    //   this.onCartChange();
  }
}
