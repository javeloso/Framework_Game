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

  /*
   * drawTile(x, y)
   * Dibuja el tile correspondiente del mapa en ñas coordenadas x, y
   *
   * @param {number} x - Coordenada x del tile
   * @param {number} y - Coordenada y del tile
   * @returns {void}
   */

  drawTile(x, y) {
    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * this.scale;
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
              const canvasX =
                (chunkX + (index % chunkWidth)) * tileSize * this.scale;
              const canvasY =
                (chunkY + Math.floor(index / chunkHeight)) *
                tileSize *
                this.scale;

              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY =
                Math.floor((tileId - 1) / tilesPerRow) * tileSize;

              if (
                canvasX === x * tileSize * this.scale &&
                canvasY === y * tileSize * this.scale
              ) {
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
          });
        });
      } else {
        console.warn(`Layer ${layer.name} skipped. Type: ${layer.type}`);
      }
    });
  }

  /*
   * drawMap(scale = 1)
   * Dibuja el mapa en el canvas
   *
   * @param {number} scale - Escala del mapa
   * @returns {void}
   */

  drawMap(scale = 1) {
    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * this.scale;
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
              const canvasX =
                (chunkX + (index % chunkWidth)) * tileSize * scale;
              const canvasY =
                (chunkY + Math.floor(index / chunkHeight)) * tileSize * scale;

              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY =
                Math.floor((tileId - 1) / tilesPerRow) * tileSize;

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
    console.log("Map drawn at time " + Date.now());
  }

  /*
   * loadMap(mapName)
   * Carga el mapa desde el servidor
   *
   * @param {string} mapName - Nombre del mapa a cargar
   * @returns {Promise} - Promesa que se resuelve con los datos del mapa
   */

  async loadMap(mapName) {
    const response = await fetch(
      contextInstance.get("mapPath") + mapName + ".json"
    );
    const mapData = await response.json();
    return mapData;
  }

  /*
   * init(mapName, tileset, scale = 3)
   * Inicializa el mapa y lo dibuja en el canvas
   *
   * @param {string} mapName - Nombre del mapa a cargar
   * @param {string} tileset - Nombre del tileset a cargar
   * @param {number} scale - Escala del mapa
   * @returns {Promise} - Promesa que se resuelve cuando el mapa ha sido cargado
   */

  async init(mapName, tileset, scale = 3) {
    console.log("Loading map..." + Date.now());
    this.scale = scale;
    this.map = await this.loadMap(mapName);

    const tilesetImage = new Image();
    tilesetImage.src = contextInstance.get("tilesetPath") + tileset;
    return new Promise((resolve) => {
      tilesetImage.onload = () => {
        this.tileset = tilesetImage;
        console.log("Map loaded at time " + Date.now());
        this.drawMap(scale);
        resolve();
      };
    });
  }
}

export default MapController;
