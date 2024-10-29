import contextInstance from "../core/globalContext.js";

let instance = null;

class MapController {
  constructor(canvasController) {
    if (!instance) {
      this.canvasController = canvasController;
      this.ctx = this.canvasController.ctx;
      instance = this;
    }
    return instance;
  }

  drawMap(scale = 1) {
    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * scale;
    const tilesPerRow = this.tileset.width / tileSize;

    this.map.layers.forEach((layer) => {
      if (layer.type === "tilelayer") {
        layer.chunks.forEach((chunk) => {
          const {
            x: chunkX,
            y: chunkY,
            width: chunkWidth,
            height: chunkHeight,
          } = chunk;
          const tileData = chunk.data;

          tileData.forEach((tileId, index) => {
            if (tileId !== 0) {
              const canvasX = (chunkX + (index % chunkWidth)) * tileSize * scale;
              const canvasY = (chunkY + Math.floor(index / chunkWidth)) * tileSize * scale;

              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY = Math.floor((tileId - 1) / tilesPerRow) * tileSize;

              this.ctx.drawImage(
                this.tileset,
                tilesetX,
                tilesetY,
                tileSize,
                tileSize,
                canvasX,
                canvasY,
                scaledTileSize,
                scaledTileSize
              );
            }
          });
        });
      } else {
        console.warn(`Layer ${layer.name} skipped. Type: ${layer.type}`);
      }
    });
  }

  redrawTile(x, y) {
    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * this.scale;
    const tilesPerRow = this.tileset.width / tileSize;

    const tileLayer = this.map.layers.find(layer => layer.type === "tilelayer");

    if (!tileLayer) {
      console.warn("No tile layer found in map.");
      return;
    }

    const tileData = tileLayer.chunks.flatMap(chunk => chunk.data);
    const chunkWidth = tileLayer.chunks[0].width;

    const tileIndex = x + y * chunkWidth;
    const tileId = tileData[tileIndex];

    if (tileId !== 0) {
      const canvasX = x * scaledTileSize;
      const canvasY = y * scaledTileSize;

      const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
      const tilesetY = Math.floor((tileId - 1) / tilesPerRow) * tileSize;

      // Limpia el cuadrado en el canvas antes de redibujar
      this.ctx.clearRect(canvasX, canvasY, scaledTileSize, scaledTileSize);

      // Dibuja la nueva imagen en el cuadrado especificado
      this.ctx.drawImage(
        this.tileset,
        tilesetX,
        tilesetY,
        tileSize,
        tileSize,
        canvasX,
        canvasY,
        scaledTileSize,
        scaledTileSize
      );
    }
  }

  async loadMap(mapName) {
    const response = await fetch(
      contextInstance.get("mapPath") + mapName + ".json"
    );
    const mapData = await response.json();
    return mapData;
  }

  async init(mapName, tileset, scale = 3) {
    this.scale = scale;
    this.map = await this.loadMap(mapName);

    const tilesetImage = new Image();
    tilesetImage.src = contextInstance.get("tilesetPath") + tileset;
    return new Promise((resolve) => {
      tilesetImage.onload = () => {
        this.tileset = tilesetImage;
        this.drawMap(scale);
        resolve();
      };
    });
  }
}

export default MapController;
