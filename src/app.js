// Programa principal: conecta los datos, el carrito y los componentes.
// Sigue la estructura que mostró el profesor en la clase del 11 de noviembre.
import { Cart } from './models/Cart.js';
import { PRODUCTS } from './data/products.js';
import { CatalogComponent } from './components/CatalogComponents.js';
import { CartViewComponent } from './components/CartViewComponents.js';

// Se ejecuta cuando el HTML ya cargó: así ningún getElementById regresa null
document.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();

  // Referencias a elementos de la UI principal
  const catalogView = document.getElementById('catalog-view');
  const cartView = document.getElementById('cart-view');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBadge = document.getElementById('cart-badge');
  const toast = document.getElementById('toast');

  // Actualiza el número del contador con la suma de las cantidades
  const updateCartBadge = () => {
    const totalItems = cart.getItems().reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  };

  // DUPT-54: muestra un aviso abajo de la pantalla y lo oculta después de 2 segundos.
  // Si se agrega otro producto antes, se reinicia el tiempo para que no parpadee.
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  };

  // Inicializar componentes
  const cartViewComponent = new CartViewComponent('cart-container', cart, updateCartBadge);

  const catalogComponent = new CatalogComponent(
    'catalog-container',
    PRODUCTS,
    (product) => {
      cart.addItem(product);   // US 2.1: se guarda en localStorage
      updateCartBadge();       // US 1.1: el contador del ícono se actualiza
      showToast(`Producto añadido al carrito: ${product.name}`); // DUPT-54
    }
  );

  // DUPT-55: muestra una sola vista ('catalog' o 'cart') y oculta la otra.
  // Al abrir el carrito lo vuelve a pintar, para que siempre tenga lo último.
  const showView = (nombre) => {
    catalogView.classList.toggle('active', nombre === 'catalog');
    cartView.classList.toggle('active', nombre === 'cart');
    if (nombre === 'cart') cartViewComponent.render();
  };

  // DUPT-55: lo que pasa cuando el usuario confirma su compra. Lo completa US 4.3 (DUPT-16)
  const onSuccess = () => {};

  // Controladores de navegación entre vistas
  openCartBtn.addEventListener('click', () => showView('cart'));
  closeCartBtn.addEventListener('click', () => showView('catalog'));

  // US 4.1 (DUPT-14): aquí va el clic del botón «Finalizar compra» (#checkout-btn),
  // que con productos termina llamando a onSuccess()

  // Renderizado inicial (al recargar, el contador muestra lo guardado)
  catalogComponent.render();
  updateCartBadge();
});
