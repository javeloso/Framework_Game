import contextInstance from "../globalContext.js";

export class Tile {
  constructor(posX, posY, underPositions, overPositions, metadata) {
    this.posX = posX;
    this.posY = posY;

    this.underPositions = underPositions;
    this.overPositions = overPositions;

    this.ctx = contextInstance.getKey("canvasController").getContext();
    this.tileset = contextInstance.getKey("tileset");
    this.tileSize = contextInstance.getKey("tileSize");
    this.scale = contextInstance.getKey("scale");

    this.scaledTileSize = this.tileSize * this.scale;

    this.metadata = metadata;
  }

  joinTile(tile) {
    if (this.posX === tile.getX() && this.posY === tile.getY()) {
      this.overPositions = this.overPositions.concat(tile.getOverPositions());
      this.underPositions = this.underPositions.concat(tile.getUnderPositions());
      if (this.metadata !== tile.getMetadata()) {
        this.metadata = tile.getMetadata();
      }
    }
  }

  getX() {
    return this.posX;
  }
  getY() {
    return this.posY;
  }

  getMetadata() {
    return this.metadata;
  }

  isTileWalkable() {
    console.log(this);
    return this.metadata === 0;
  }

  getOverPositions() {
    return this.overPositions;
  }

  getUnderPositions() {
    return this.underPositions;
  }

  /**
   * Dibuja el tile en el canvas.
   * @param {CanvasRenderingContext2D} ctx - El contexto del canvas.
   */
  draw() {
    for (let i = 0; i < this.underPositions.length; i++) {
      this.ctx.drawImage(
        this.tileset, // Imagen del tileset
        this.underPositions[i][0] * this.tileSize, // Coordenada X en el tileset
        this.underPositions[i][1] * this.tileSize, // Coordenada Y en el tileset
        this.tileSize, // Ancho del tile en el tileset
        this.tileSize, // Alto del tile en el tileset
        this.posX * this.scaledTileSize, // Coordenada X en el canvas
        this.posY * this.scaledTileSize, // Coordenada Y en el canvas
        this.scaledTileSize, // Ancho escalado
        this.scaledTileSize // Alto escalado
      );
    }
    this.drawOver();
  }

  drawOver() {
    for (let i = 0; i < this.overPositions.length; i++) {
      this.ctx.drawImage(
        this.tileset, // Imagen del tileset
        this.overPositions[i][0] * this.tileSize, // Coordenada X en el tileset
        this.overPositions[i][1] * this.tileSize, // Coordenada Y en el tileset
        this.tileSize, // Ancho del tile en el tileset
        this.tileSize, // Alto del tile en el tileset
        this.posX * this.scaledTileSize, // Coordenada X en el canvas
        this.posY * this.scaledTileSize, // Coordenada Y en el canvas
        this.scaledTileSize, // Ancho escalado
        this.scaledTileSize // Alto escalado
      );
    }

    
  }
}
