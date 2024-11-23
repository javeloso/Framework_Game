export class Canvas {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.canvas = document.createElement('canvas');

        const ratio = window.devicePixelRatio || 1;

        // Configuración del tamaño del canvas para alta resolución
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.imageRendering = 'pixelated'; // Previene la borrosidad en gráficos pixelados

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false; // Evita suavizado de imágenes en el canvas
    }

    setWidth(width) {
        this.width = width;
        this.canvas.width = width;
    }

    getWidth() {
        return this.width;
    }

    setHeight(height) {
        this.height = height;
        this.canvas.height = height;
    }

    getHeight() {
        return this.height;
    }

    getContext(){
        return this.canvas.getContext('2d');
    }

    create() {
        document.body.appendChild(this.canvas); // Añade el canvas al DOM
    }
}