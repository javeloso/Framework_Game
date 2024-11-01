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
    constructor(width = 1000, height = 1000) {
        if (!instance) {
            // Crear el elemento canvas y ajustar dimensiones según el dispositivo
            this.canvas = document.createElement('canvas');
            const ratio = window.devicePixelRatio || 1;

            // Configuración del tamaño del canvas para alta resolución
            this.canvas.width = width * ratio;
            this.canvas.height = height * ratio;

            // Configuración de estilo CSS para mantener el tamaño visual
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
            this.canvas.style.imageRendering = 'pixelated'; // Previene la borrosidad en gráficos pixelados
            
            this.ctx = this.canvas.getContext('2d');
            this.ctx.imageSmoothingEnabled = false; // Evita suavizado de imágenes en el canvas

            document.body.appendChild(this.canvas); // Añade el canvas al DOM
            instance = this;
        }
        return instance;
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
}

export default CanvasController;
