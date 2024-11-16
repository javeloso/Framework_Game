/**
 * Clase GlobalContext
 *
 * `GlobalContext` implementa un patrón Singleton para almacenar y gestionar variables y actualizaciones
 * globales en una aplicación. Al asegurarse de que solo exista una instancia de `GlobalContext`,
 * permite que cualquier parte de la aplicación pueda acceder y manipular variables globales y sus
 * actualizaciones de manera centralizada y segura.
 */

class GlobalContext {
  /**
   * constructor
   *
   * Crea una instancia única de `GlobalContext` y la almacena en `instance`.
   * Crea los objetos `store` y `update` para almacenar variables y actualizaciones globales.
   *
   * @returns {GlobalContext} - Instancia única de `GlobalContext`
   */
  constructor() {
    if (!GlobalContext.instance) {
      /**
       * `store`: Objeto para almacenar variables globales de la aplicación
       * `update`: Objeto para almacenar funciones o valores de actualización
       */
      this.store = {};
      GlobalContext.instance = this;
    }
    return GlobalContext.instance;
  }

  /**
   * setKey
   * @param {string} key - Nombre de la clave para la variable global
   * @param {*} value - Valor asignado a la clave
   *
   * Asigna un valor a la clave proporcionada en `store`, permitiendo que otras
   * partes de la aplicación accedan al valor globalmente.
   */
  setKey(key, value) {
    try {
      this.store[key] = value;
    } catch (e) {
      console.error(`Error al asignar la clave ${key} en GlobalContext`);
    }
  }

  /**
   * getKey
   * @param {string} key - Nombre de la clave de la variable global
   * @returns {*} - Valor almacenado en la clave proporcionada o `undefined` si no existe
   *
   * Obtiene el valor asociado a la clave especificada en `store`.
   */
  getKey(key) {
    if ((key in this.store)) {
        return this.store[key];
    }
    throw new Error(`Error al obtener la clave '${key}' en GlobalContext: clave no definida.`);
  }

  /**
   * removeKey
   * @param {string} key - Nombre de la clave de la variable global
   *
   * Elimina la variable global asociada a la clave proporcionada en `store`.
   */
  removeKey(key) {
    delete this.store[key];
  }
}

// Instancia única de GlobalContext, congelada para evitar modificaciones accidentales
const contextInstance = new GlobalContext();
Object.freeze(contextInstance);

export default contextInstance;
