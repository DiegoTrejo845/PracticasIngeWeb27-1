// US 4.4 — Ventana modal reutilizable en lugar de alert (DUPT-58, Sprint 2)
// El profesor pidió el 19 de noviembre que ningún aviso use alert: todo va en una ventana modal
// hecha con HTML, CSS y JavaScript. Los id son los de su ejemplo: customModal, modalTitle,
// modalMessage y modalBtn.
//
// Se usa una etiqueta <dialog>: con showModal() la página de atrás queda bloqueada hasta que
// se cierre, y la tecla Esc la cierra sola. Los botones están dentro de un <form method="dialog">,
// así que al presionarlos el navegador cierra la ventana y guarda su value en dialog.returnValue.
export class ModalComponent {
  /**
   * @param {string} dialogId  id del <dialog> en index.html: 'customModal'
   */
  constructor(dialogId) {
    this.dialog = document.getElementById(dialogId);
    this.title = document.getElementById('modalTitle');
    this.message = document.getElementById('modalMessage');
    this.acceptBtn = document.getElementById('modalBtn');
    this.cancelBtn = document.getElementById('modalCancelBtn');
  }

  // DUPT-60: abre la ventana y regresa una promesa que se cumple cuando el usuario la cierra:
  // true si presionó el botón de aceptar; false si canceló o presionó Esc.
  open(titulo, mensaje, { conCancelar, textoAceptar, textoCancelar, tipo }) {
    if (this.dialog.open) this.dialog.close();   // por si ya había una abierta

    this.title.textContent = titulo;     // textContent: el texto nunca se interpreta como HTML
    this.message.textContent = mensaje;
    this.acceptBtn.textContent = textoAceptar;
    this.cancelBtn.textContent = textoCancelar;
    this.cancelBtn.hidden = !conCancelar;
    this.dialog.dataset.tipo = tipo;     // 'info', 'exito' o 'peligro': solo cambia el color (CSS)

    this.dialog.returnValue = '';
    this.dialog.showModal();

    // En una confirmación el foco queda en Cancelar, la opción segura
    (conCancelar ? this.cancelBtn : this.acceptBtn).focus();

    return new Promise(resolve => {
      this.dialog.addEventListener('close', () => {
        resolve(this.dialog.returnValue === 'aceptar');
      }, { once: true });   // once: el escuchador se borra solo después de usarse
    });
  }

  // Aviso con un solo botón (en lugar de alert)
  mostrar(titulo, mensaje, tipo = 'info') {
    return this.open(titulo, mensaje, {
      conCancelar: false, textoAceptar: 'Aceptar', textoCancelar: '', tipo,
    });
  }

  // Pregunta con Aceptar y Cancelar (en lugar de confirm). Se usa con await:
  //   if (await modal.confirmar('Eliminar', '¿Seguro?')) { ... }
  confirmar(titulo, mensaje, { textoAceptar = 'Aceptar', textoCancelar = 'Cancelar', tipo = 'info' } = {}) {
    return this.open(titulo, mensaje, {
      conCancelar: true, textoAceptar, textoCancelar, tipo,
    });
  }
}
