export class SpriteController {
    /**
     * Crea una instancia de SpriteController.
     * @param {string} imagePath - Ruta de la imagen del spritesheet.
     * @param {number} spriteWidth - Ancho de cada sprite.
     * @param {number} spriteHeight - Alto de cada sprite.
     */
    constructor(imagePath, spriteWidth = 32, spriteHeight = 32) {
        this.imagePath = imagePath;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.image = new Image();
        this.sprites = [];

        // Promesa que se resuelve cuando la imagen está cargada
        this.imageLoaded = new Promise((resolve) => {
            this.image.onload = () => {
                this.generateSprites();
                resolve();
            };
        });
        
        // Asigna la ruta de la imagen después de establecer la promesa
        this.image.src = imagePath;
    }

    /**
     * Genera las coordenadas de cada sprite en el spritesheet y las almacena en un array.
     */
    generateSprites() {
        const rows = Math.floor(this.image.height / this.spriteHeight);
        const columns = Math.floor(this.image.width / this.spriteWidth);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                this.sprites.push({
                    x: col * this.spriteWidth,
                    y: row * this.spriteHeight,
                    width: this.spriteWidth,
                    height: this.spriteHeight,
                });
            }
        }
    }

    /**
     * Obtiene el sprite correspondiente a una posición específica en el spritesheet.
     * @param {number} x - Índice de columna del sprite.
     * @param {number} y - Índice de fila del sprite.
     * @returns {Object|null} - Objeto con la imagen y coordenadas del sprite o null si está fuera de rango.
     */
    getSpriteByPosition(x, y) {
        const index = y * Math.floor(this.image.width / this.spriteWidth) + x;
        if (index < 0 || index >= this.sprites.length) {
            console.warn("Sprite index out of range.");
            return null;
        }
        const { x: sx, y: sy, width, height } = this.sprites[index];
        
        return { image: this.image, sx, sy, width, height };
    }
}
