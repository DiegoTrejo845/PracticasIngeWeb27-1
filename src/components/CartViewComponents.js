// US 2.2 — Modificar y eliminar ítems (DUPT-12, Sprint 1)
// US 3.1 — Vista detallada del carrito (DUPT-13, Sprint 2): subtotal por ítem, desglose con envío
//          y mensaje de carrito vacío con botón para volver (DUPT-35 a DUPT-37).
// El diseño de las filas viene de la ventana del carrito que hizo Yael.
export class CartViewComponent {
  /**
   * @param {string} containerId  id del elemento donde se dibuja: 'cart-container'
   * @param {Cart} cart  la misma instancia del carrito que usa app.js
   * @param {object} opciones
   * @param {() => void} opciones.onCartChange  updateCartBadge de app.js: llamarla después de cada cambio
   * @param {ModalComponent} opciones.modal  ventana modal de US 4.4 para confirmar antes de eliminar
   */
  constructor(containerId, cart, { onCartChange, modal }) {
    this.container = document.getElementById(containerId);
    this.cart = cart;
    this.onCartChange = onCartChange;
    this.modal = modal;
  }

  render() {
    const items = this.cart.getItems();

    // DUPT-37 (US 3.1) completa este mensaje con el botón para volver al catálogo
    if (items.length === 0) {
  this.container.innerHTML = `
    <div class="vacio">
      <p>Tu carrito está vacío.</p>
    </div>
  `;
  return;
}

    // DUPT-31: una fila por producto
    // DUPT-32: botones - / + y eliminar; cada uno lleva su acción y el id del producto
    // DUPT-33: el total se calcula con getTotal() cada vez que se vuelve a pintar
    this.container.innerHTML = `
      <div class="cart-items">
        ${items.map(item => `
          <div class="item-carrito">
            <div class="item-info">
              <h3>${item.name}</h3>
              <p>Precio: $${item.price.toFixed(2)}</p>
              <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
              </div>

            <div class="cantidad">
              <button class="action-btn" type="button" data-action="restar" data-id="${item.id}"
                aria-label="Quitar uno de ${item.name}">−</button>
              <span>${item.quantity}</span>
              <button class="action-btn" type="button" data-action="sumar" data-id="${item.id}"
                aria-label="Agregar uno de ${item.name}">+</button>
              <button class="action-btn-delete" type="button" data-action="eliminar" data-id="${item.id}"
                aria-label="Eliminar ${item.name} del carrito">
                <svg class="icon-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="resumen">
            <p>Subtotal de productos: $${this.cart.getTotal().toFixed(2)}</p>
            <h3>Total de la compra: $${this.cart.getTotal().toFixed(2)}</h3>
            </div>
    `;

    this.attachEvents();
  }

  // DUPT-32: cada botón cambia el carrito (Cart.js lo guarda en localStorage de inmediato),
  // vuelve a pintar la vista y avisa a app.js para que actualice el contador (DUPT-33)
  attachEvents() {
    this.container.querySelectorAll('[data-action]').forEach(button => {
      // async: para poder esperar (await) la respuesta de la ventana modal
      button.addEventListener('click', async (e) => {
        const action = e.currentTarget.dataset.action;
        const id = Number(e.currentTarget.dataset.id); // data-id llega como texto
        const item = this.cart.getItems().find(i => i.id === id);

        if (!item) return;

        // DUPT-61 (US 4.4): antes de quitar un producto se pide confirmación en la ventana modal.
        // También con "−" cuando queda uno, porque en ese caso Cart.js lo elimina.
        const quitaProducto = action === 'eliminar' || (action === 'restar' && item.quantity === 1);

        if (quitaProducto) {
          const acepta = await this.modal.confirmar(
            'Eliminar producto',
            `¿Quieres quitar «${item.name}» de tu carrito?`,
            { textoAceptar: 'Eliminar', tipo: 'peligro' }
          );
          if (!acepta) return;   // canceló o presionó Esc: el carrito no cambia
        }

        if (action === 'sumar') {
          this.cart.updateQuantity(id, item.quantity + 1);
        }

        if (action === 'restar') {
          this.cart.updateQuantity(id, item.quantity - 1); // si llega a 0, Cart.js lo elimina
        }

        if (action === 'eliminar') {
          this.cart.removeItem(id);
        }

        this.render();
        this.onCartChange();
      });
    });
  }
}