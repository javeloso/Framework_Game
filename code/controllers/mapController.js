import contextInstance from "../core/globalContext.js";

let instance = null;

class MapController {
  constructor(canvasController) {
    if (!instance) {
      this.canvasController = canvasController;
      this.ctx = this.canvasController.ctx;
      instance = this; // Asignamos la instancia para que sea única
    }
    return instance;
  }

  drawMap(map, tileset, scale = 1) {
    const tileSize = map.tilewidth;
    const scaledTileSize = tileSize * scale;
    const tilesPerRow = tileset.width / tileSize;

    map.layers.forEach((layer) => {
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
              const canvasX =
                (chunkX + (index % chunkWidth)) * tileSize * scale;
              const canvasY =
                (chunkY + Math.floor(index / chunkWidth)) * tileSize * scale;

              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY =
                Math.floor((tileId - 1) / tilesPerRow) * tileSize;

              this.ctx.drawImage(
                tileset,
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

  async loadMap(mapName) {
    const response = await fetch(
      contextInstance.get("mapPath") + mapName + ".json"
    );
    const mapData = await response.json();
    return mapData;
  }

  async init(mapName, tileset, scale = 3) {
    const map = await this.loadMap(mapName);

    const tilesetImage = new Image();
    tilesetImage.src = contextInstance.get("tilesetPath") + tileset;
    return new Promise((resolve) => {
      tilesetImage.onload = () => {
        this.drawMap(map, tilesetImage, scale);
        resolve();
      };
    });
  }
}

export default MapController;
