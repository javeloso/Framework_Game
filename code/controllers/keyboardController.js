class KeyboardController {
    constructor() {
      if (!KeyboardController.instance) {
        KeyboardController.instance = this;
        this.listeners = {}; // Objeto para almacenar los listeners de cada tecla
        this.initEventListeners(); // Inicializamos los listeners de teclado
      }
  
      return KeyboardController.instance;
    }
  
    initEventListeners() {
      window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (this.listeners[key]) {
          this.listeners[key](); // Ejecuta la función asociada a la tecla
        }
      });
    }
  
    // Método para asignar una función a una tecla específica
    onKeyPress(key, callback) {
      this.listeners[key.toLowerCase()] = callback;
    }
  }
  
  const keyboardController = new KeyboardController();
  Object.freeze(keyboardController);
  export default keyboardController;
  