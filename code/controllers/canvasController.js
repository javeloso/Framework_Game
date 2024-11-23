import { Canvas } from "../core/model/canvas.js";

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
     * @param {number} width - Ancho en píxeles del canvas (por defecto 1000).
     * @param {number} height - Alto en píxeles del canvas (por defecto 1000).
     * 
     * Crea y configura el elemento canvas si aún no existe una instancia. Ajusta el tamaño del canvas
     * en función del ratio de píxeles del dispositivo para asegurar gráficos claros y nítidos en pantallas de alta resolución.
     */
    constructor() {
        if (!instance) {

            this.canvasList = {}
            instance = this;
        }
        return instance;
    }

    createCanvas(name, width, height) {
        const canvas = new Canvas(width, height);
        try {
            this.canvasList[name] = canvas
        } catch (e) {
            console.error(`Error al asignar la clave ${key} en GlobalContext`);
        }
    }

    getCanvas(name) {
        if ((name in this.canvasList)) {
            return this.canvasList[name];
        }
        throw new Error(`Error al obtener la clave '${name}' en la lista de lienzos: clave no definida.`);    
    }

    getContext(name) {
        if ((name in this.canvasList)) {
            return this.canvasList[name].getContext();
        }
        throw new Error(`Error al obtener la clave '${name}' en la lista de lienzos: clave no definida.`);    
    }

    /**
     * clear
     * 
     * Limpia el canvas borrando todo el contenido renderizado.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * drawImage
     * @param {HTMLImageElement} image - Imagen o spritesheet a dibujar.
     * @param {number} sx - Coordenada x de origen en la imagen.
     * @param {number} sy - Coordenada y de origen en la imagen.
     * @param {number} sWidth - Ancho de la sección a recortar de la imagen.
     * @param {number} sHeight - Alto de la sección a recortar de la imagen.
     * @param {number} dx - Coordenada x en el canvas donde se dibujará la imagen.
     * @param {number} dy - Coordenada y en el canvas donde se dibujará la imagen.
     * @param {number} dWidth - Ancho para escalar la imagen en el canvas.
     * @param {number} dHeight - Alto para escalar la imagen en el canvas.
     * 
     * Dibuja una sección de la imagen en el canvas en una posición específica y permite escalarla.
     */
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    getContext() {
        return this.ctx;
    }
}

export default CanvasController;
