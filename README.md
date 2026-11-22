# Carrito con LocalStorage — Práctica 1 y 2

Tienda en línea de Ingeniería Web 2027/1 (IPN-UPIITA): catálogo de productos, carrito que se guarda en `localStorage`, vista detallada del carrito y finalización de la compra con ventanas modales (sin `alert`).

- Tablero en Jira: [DUPT board](https://ingeweb.atlassian.net/jira/software/projects/DUPT/boards/34)
- Entregas: Sprint 1 el martes 17 de noviembre de 2026; sprints 2 y 3 el jueves 26 de noviembre de 2026.

## Equipo

| Integrante | GitHub | Historias de la práctica 2 |
| --- | --- | --- |
| Diego Uriel Pérez Trejo | DiegoTrejo845 | US 4.4 ventana modal, US 4.3 confirmación de compra, DUPT-54 y DUPT-55 |
| Yael | eyael.paa | US 3.1 vista del carrito, US 4.1 finalizar compra y DUPT-57 |

## Cómo correrlo

1. Abre la carpeta del repositorio en VS Code.
2. Instala la extensión **Live Server** (VS Code la sugiere al abrir el proyecto).
3. Clic derecho en `index.html` → **Open with Live Server**.

Abrir `index.html` con doble clic no funciona: los módulos (`import` / `export`) necesitan un servidor.

## Estructura

```text
├── index.html                 vistas del catálogo y del carrito
├── css/styles.css             estilos (una sección por historia)
├── public/assets/             imágenes de los productos (WebP)
└── src/
    ├── app.js                 programa principal: conecta todo y cambia de vista
    ├── components/
    │   ├── CatalogComponents.js   catálogo (US 1.1)
    │   ├── CartViewComponents.js  vista del carrito (US 2.2 y 3.1)
    │   └── ModalComponent.js      ventana modal en lugar de alert (US 4.4)
    ├── data/products.js       arreglo de productos (US 1.1)
    ├── models/Cart.js         lógica del carrito (US 2.1, código del profesor)
    └── services/storageService.js   lectura y escritura en localStorage
```

## Qué historia toca qué archivo

| Historia | Jira | Archivos |
| --- | --- | --- |
| US 1.1 Catálogo | DUPT-10 | `src/data/products.js`, `src/components/CatalogComponents.js`, `public/assets/`, sección de catálogo en `css/styles.css` |
| US 2.1 Persistencia | DUPT-11 | `src/models/Cart.js`, `src/services/storageService.js` |
| US 2.2 Modificar y eliminar | DUPT-12 | `src/components/CartViewComponents.js`, sección del carrito en `css/styles.css` |
| US 3.1 Vista del carrito | DUPT-13 | `src/components/CartViewComponents.js`, `src/utils/resumen.js`, `src/app.js` (ruta `#carrito`) |
| US 4.1 Finalizar compra | DUPT-14 | clic de `#checkout-btn` en `src/app.js` |
| US 4.3 Confirmación de compra | DUPT-16 | `onSuccess()` en `src/app.js` |
| US 4.4 Ventana modal | DUPT-58 | `src/components/ModalComponent.js`, `<dialog>` en `index.html` |
| Cabecera fija y aviso | DUPT-54 | `index.html`, `src/app.js`, `css/styles.css` |
| Botón “Finalizar compra” y equipo | DUPT-55 | `index.html`, `src/app.js`, `README.md` |
| Buscador y modo oscuro | DUPT-57 | `index.html`, `src/app.js`, `css/styles.css`, `src/data/products.js` |

El profesor quitó el formulario de checkout el 19 de noviembre (US 4.2 quedó en el backlog de Jira) y pidió que todos los avisos fueran ventanas modales.

`app.js`, `index.html` y `css/styles.css` los tocan varias historias: avisen en el chat del equipo antes de cambiarlos.

## Cómo trabajamos

1. Nadie sube directo a `main`: todo entra por *pull request* con la aprobación del otro.
2. Una rama por historia, con su clave: `DUPT-11-persistencia-localstorage`.
3. Commits con la clave de la subtarea: `DUPT-28 incrementa la cantidad si el producto ya existe`.
4. En Jira, la tarjeta se mueve a “En curso”, “En revisión” y “Listo” según avanza.

```bash
# Empezar una historia
git switch main
git pull
git switch -c DUPT-xx-descripcion

# Guardar avance
git add .
git commit -m "DUPT-yy qué hice"
git push                 # la primera vez: git push -u origin DUPT-xx-descripcion

# Traer lo nuevo de main a tu rama
git fetch
git merge origin/main
```
