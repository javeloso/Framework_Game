import contextInstance from "../core/globalContext.js";

export class gameObject {
    /**
     * Crea una instancia de gameObject.
     * La escala se obtiene de `contextInstance`, permitiendo que el objeto la use en sus operaciones.
     */
    constructor() {
        this.scale = contextInstance.getKey('scale');
    }

    /**
     * Método de actualización que puede ser sobrescrito en subclases.
     * Diseñado para contener la lógica de actualización del estado del objeto.
     */
    update() {
        // Método de actualización, implementar en subclases si es necesario
    }
}
