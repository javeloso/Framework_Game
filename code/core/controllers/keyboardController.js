/**
 * Clase KeyboardController
 * 
 * `KeyboardController` es una clase Singleton que gestiona los eventos de teclado en la aplicación. 
 * Permite asignar funciones de callback a teclas específicas y ejecutarlas cuando dichas teclas se presionan.
 */

class KeyboardController {
  constructor() {
      if (!KeyboardController.instance) {
          KeyboardController.instance = this;
          this.listeners = {}; // Objeto para almacenar los listeners de cada tecla
          this.initEventListeners(); // Inicializamos los listeners de teclado
      }
      
      return KeyboardController.instance; // Retorna la instancia única
  }

  /**
   * initEventListeners
   * 
   * Inicializa el evento `keydown` en la ventana para detectar pulsaciones de teclas.
   * Cuando una tecla se presiona, verifica si existe una función asignada a esa tecla 
   * en `this.listeners` y, en caso afirmativo, la ejecuta.
   */
  initEventListeners() {
      window.addEventListener("keydown", (event) => {
          const key = event.key.toLowerCase();
          if (this.listeners[key]) {
              this.listeners[key](); // Ejecuta la función asociada a la tecla
          }
      });
  }

  /**
   * onKeyPress
   * 
   * Método para asignar una función de callback a una tecla específica.
   * @param {string} key - Tecla a la cual se asigna el callback (no distingue entre mayúsculas y minúsculas).
   * @param {function} callback - Función que se ejecutará al presionar la tecla.
   */
  onKeyPress(key, callback) {
      this.listeners[key.toLowerCase()] = callback;
  }
}

// Crear una instancia única de KeyboardController y congelarla para evitar modificaciones
const keyboardController = new KeyboardController();
Object.freeze(keyboardController);

export default keyboardController;
