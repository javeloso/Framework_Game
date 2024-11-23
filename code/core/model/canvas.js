export class Canvas {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.canvas = document.createElement('canvas');

        const ratio = window.devicePixelRatio || 1;

        // Configuración del tamaño del canvas para alta resolución
        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.style.imageRendering = 'pixelated'; // Previene la borrosidad en gráficos pixelados

        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false; // Evita suavizado de imágenes en el canvas
    }

    getContext(){
        return this.canvas.getContext('2d');
    }

    create() {
        document.body.appendChild(this.canvas); // Añade el canvas al DOM
    }
}