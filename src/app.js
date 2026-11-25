
// Programa principal: conecta los datos, el carrito y los componentes.
// Sigue la estructura que mostró el profesor en la clase del 11 de noviembre.
import { Cart } from './models/Cart.js';
import { PRODUCTS } from './data/products.js';
import { CatalogComponent } from './components/CatalogComponents.js';
import { CartViewComponent } from './components/CartViewComponents.js';
import { ModalComponent } from './components/ModalComponent.js';

// Se ejecuta cuando el HTML ya cargó.
document.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();

  // Referencias a elementos de la UI principal
  const emptyCartBtn = document.getElementById('empty-cart-btn');
  const catalogView = document.getElementById('catalog-view');
  const cartView = document.getElementById('cart-view');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  // US — Vaciar todos los productos del carrito.
emptyCartBtn.addEventListener('click', async () => {
  const items = cart.getItems();

  // Si el carrito está vacío, mostrar un aviso.
  if (items.length === 0) {
    await modal.mostrar(
      'Carrito vacío',
      'No hay productos para eliminar.',
      'info'
    );
    return;
  }

  // Confirmar antes de eliminar todos los productos.
  const acepta = await modal.confirmar(
    'Vaciar carrito',
    '¿Estás seguro de que deseas eliminar todos los productos?',
    {
      textoAceptar: 'Sí, vaciar carrito',
      textoCancelar: 'Cancelar',
      tipo: 'peligro'
    }
  );

  if (!acepta) return;

  // Vaciar el carrito y actualizar la pantalla.
  cart.clear();
  updateCartBadge();
  cartViewComponent.render();

  showToast('Se eliminaron todos los productos del carrito.');
});

  const cartBadge = document.getElementById('cart-badge');
  const checkoutBtn = document.getElementById('checkout-btn');
  const toast = document.getElementById('toast');
  const botonTema = document.getElementById('boton-tema');
  const inputBusqueda = document.getElementById('inputBusqueda');

  // US — Cambiar entre modo claro y oscuro.
  botonTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');

    if (document.body.classList.contains('modo-oscuro')) {
      botonTema.textContent = '☀️ Modo claro';
      localStorage.setItem('modoTema', 'oscuro');
    } else {
      botonTema.textContent = '🌙 Modo oscuro';
      localStorage.setItem('modoTema', 'claro');
    }
  });

  // Recuperar el tema guardado.
  if (localStorage.getItem('modoTema') === 'oscuro') {
    document.body.classList.add('modo-oscuro');
    botonTema.textContent = '☀️ Modo claro';
  }

  // Actualiza el número del contador con la suma de las cantidades.
  const updateCartBadge = () => {
    const totalItems = cart.getItems().reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    cartBadge.textContent = totalItems;
  };

  // DUPT-54: muestra un aviso abajo de la pantalla.
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2000);
  };

  // Inicializar componentes.
  const modal = new ModalComponent('customModal');

  const cartViewComponent = new CartViewComponent('cart-container', cart, {
    onCartChange: updateCartBadge,
    modal,
  });

  const catalogComponent = new CatalogComponent(
    'catalog-container',
    PRODUCTS,
    (product) => {
      cart.addItem(product);
      updateCartBadge();
      showToast(`Producto añadido al carrito: ${product.name}`);
    }
  );

  // DUPT-55: muestra una sola vista.
  const showView = (nombre) => {
    catalogView.classList.toggle('active', nombre === 'catalog');
    cartView.classList.toggle('active', nombre === 'cart');

    if (nombre === 'cart') {
      cartViewComponent.render();
    }
  };

  // US 4.3 — Compra exitosa.
  const onSuccess = async () => {
    // Vaciar el carrito y actualizar localStorage.
    cart.clear();

    // Actualizar el contador y la vista del carrito.
    updateCartBadge();
    cartViewComponent.render();

    // Regresar al catálogo.
    showView('catalog');

    // Mostrar confirmación de compra exitosa.
    await modal.mostrar(
      '¡Compra exitosa!',
      'Tu compra se ha realizado correctamente.',
      'exito'
    );
  };

  // Abrir y cerrar el carrito.
  openCartBtn.addEventListener('click', () => showView('cart'));
  closeCartBtn.addEventListener('click', () => showView('catalog'));

  // US 4.1 — Finalizar compra mediante ventana modal.
  checkoutBtn.addEventListener('click', async () => {
    const items = cart.getItems();

    // Si el carrito está vacío, mostrar un aviso.
    if (items.length === 0) {
      await modal.mostrar(
        'Carrito vacío',
        'Tu carrito está vacío.',
        'info'
      );
      return;
    }

    // Obtener el total de la compra.
    const total = cart.getTotal().toFixed(2);

    // Solicitar confirmación antes de continuar.
    const acepta = await modal.confirmar(
      'Confirmar compra',
      `¿Deseas confirmar tu compra por un total de $${total}?`,
      {
        textoAceptar: 'Confirmar compra',
        textoCancelar: 'Seguir comprando',
        tipo: 'info'
      }
    );

    if (!acepta) return;

    await onSuccess();
  });

  // Renderizado inicial del catálogo.
  catalogComponent.render();

  // Actualizar el contador al cargar la página.
  updateCartBadge();

  // US — Búsqueda de productos.
  inputBusqueda.addEventListener('input', (e) => {
    const textoBusqueda = e.target.value.toLowerCase().trim();

    const productosFiltrados = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(textoBusqueda)
    );

    catalogComponent.render(productosFiltrados);
  });

}); // Fin de DOMContentLoaded
