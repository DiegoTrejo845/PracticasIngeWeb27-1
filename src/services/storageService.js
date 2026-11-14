// Código compartido por el profesor en la clase del 10 de noviembre.
// Guarda y lee datos de localStorage convirtiéndolos a JSON.
export const StorageService = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  },

  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      return null;
    }
  }
};
