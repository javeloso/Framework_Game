/**
 * Esta clase va a tener una lista de las imágenes que se van a cargar en el canvas.
 */

export class Tile {
    constructor(id, posX, posY, tilesetX, tilesetY, tileset, tileSize, scale, isWalkable = true, isInteractable = false, object = null) {
      this.id = id;
      this.posX = posX;
      this.posY = posY;
      this.tilesetX = tilesetX;
      this.tilesetY = tilesetY;
      this.tileset = tileset;
      this.tileSize = tileSize;
      this.scale = scale;
      this.isWalkable = isWalkable;
      this.isInteractable = isInteractable;
      this.object = object;
    }

    getX() {
      return this.posX;
    }
    getY() {
      return this.posY;
    }
    checkWalkability() {
      return this.isWalkable;
    }
  
    /**
     * Verifica si el tile es transitable.
     * @returns {boolean} - Si el tile es transitable.
     */
    checkWalkability() {
      return this.isWalkable;
    }
  
    /**
     * Interactúa con el objeto en el tile, si existe.
     * @returns {any} - El objeto en el tile, si existe.
     */
    interact() {
      if (this.isInteractable && this.object) {
        return this.object;
      }
      return null;
    }
  
    /**
     * Dibuja el tile en el canvas.
     * @param {CanvasRenderingContext2D} ctx - El contexto del canvas.
     */
    draw(ctx) {
      const scaledTileSize = this.tileSize * this.scale;
      ctx.drawImage(
        this.tileset,
        this.tilesetX,
        this.tilesetY,
        this.tileSize,
        this.tileSize,
        this.posX * this.tileSize * this.scale,
        this.posY * this.tileSize * this.scale,
        scaledTileSize,
        scaledTileSize
      );
    }
  }
  