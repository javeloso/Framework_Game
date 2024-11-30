import { Canvas } from "../model/canvas.js";

/**
 * Clase CanvasController
 * 
 * `CanvasController` es un controlador de canvas que gestiona la creación, configuración y 
 * renderización en un único elemento canvas en la página. Implementa un patrón singleton para 
 * asegurar que solo exista una instancia de canvas en la aplicación.
 */

let instance = null;

class CanvasController {
    /**
     * Constructor
     * @param {number} width - Ancho en píxeles del canvas.
     * @param {number} height - Alto en píxeles del canvas.
     */
    constructor() {
        if (!instance) {
            // Inicializa la lista de canvas
            this.canvasList = {}
            instance = this;
        }
        return instance;
    }

    /**
     * createCanvas
     * @param {string} name - Nombre del canvas.
     * @param {number} width - Ancho en píxeles del canvas.
     * @param {number} height - Alto en píxeles del canvas.
     * @returns {Canvas} - Objeto Canvas creado.
     * 
     * Crea un nuevo canvas con el nombre especificado y lo añade a la lista de canvas.
     * Si ya existe un canvas con el mismo nombre, lanza un error.
     */
    createCanvas(name, width, height) {
        const canvas = new Canvas(width, height);
        try {
            this.canvasList[name] = canvas
            return canvas;
        } catch (e) {
            console.error(`Error al asignar la clave ${key} en GlobalContext`);
        }
    }

    /**
     * getCanvas
     * @param {string} name - Nombre del canvas.
     * @returns {Canvas} - Objeto Canvas.
     * 
     * Obtiene un canvas de la lista de canvas por su nombre.
     * Si no existe un canvas con el nombre especificado, lanza un error.
     */
    getCanvas(name) {
        if ((name in this.canvasList)) {
            return this.canvasList[name];
        }
        throw new Error(`Error al obtener la clave '${name}' en la lista de lienzos: clave no definida.`);    
    }

    /**
     * getContext
     * @param {string} name - Nombre del canvas.
     * @returns {CanvasRenderingContext2D} - Contexto 2D del canvas.
     * 
     * Obtiene el contexto 2D de un canvas de la lista de canvas por su nombre.
     * Si no existe un canvas con el nombre especificado, lanza un error.
     */
    getContext(name) {
        if ((name in this.canvasList)) {
            return this.canvasList[name].getContext();
        }
        throw new Error(`Error al obtener la clave '${name}' en la lista de lienzos: clave no definida.`);    
    }

    /**
     * getHeight
     * @param {string} name - Nombre del canvas.
     * @returns {number} - Alto del canvas.
     * 
     * Obtiene el alto de un canvas de la lista de canvas por su nombre.
     * Si no existe un canvas con el nombre especificado, lanza un error.
     */
    getHeight(name) {
        return this.canvasList[name].getHeight();
    }

    /**
     * getWidth
     * @param {string} name - Nombre del canvas.
     * @returns {number} - Ancho del canvas.
     * 
     * Obtiene el ancho de un canvas de la lista de canvas por su nombre.
     * Si no existe un canvas con el nombre especificado, lanza un error.
     */
    getWidth(name) {
        return this.canvasList[name].getWidth();
    }

    /**
     * clear
     * @param {string} name - Nombre del canvas.
     * 
     * Limpia el canvas especificado.
     * Si no existe un canvas con el nombre especificado, lanza un error.
     */
    clear(name) {
        this.getContext(name).clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default CanvasController;