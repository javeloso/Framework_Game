let instance = null;

class CanvasController {
    constructor(width = 800, height = 600) {
        if(!instance) {
        this.canvas = document.createElement('canvas');
        const ratio = window.devicePixelRatio || 1; // Escala según la densidad de píxeles del dispositivo

        // Ajustar el tamaño interno del canvas
        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;

        

        // Establecer el tamaño CSS del canvas
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.style.imageRendering = 'pixelated'; // Para evitar borrosidad
        this.ctx = this.canvas.getContext('2d');
        
        this.ctx.imageSmoothingEnabled = false;

        document.body.appendChild(this.canvas);
        instance = this;
        }
        return instance;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

export default CanvasController;