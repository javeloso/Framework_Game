/**
 * Podriamos crear la clase Tile(x,y,map) que se encargue de dibujar el tile en el canvas.
 * Estos tiles se cargarían cuando cargamos el mapa y se dibujarían en el canvas en las posiciones correspondientes.
 * Tendrían la funcion draw que se encargaría de dibujar el tile en el canvas.
 */

//Utilizar la clase map para guardar los tiles y comprobar si se puede mover a una posición.

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

  /**
   * Comprueba si un tile en una posición dada es transitable.
   * @param {number} x - Coordenada x del tile.
   * @param {number} y - Coordenada y del tile.
   * @returns {boolean} - Verdadero si el tile es transitable; falso si no lo es.
   */
  isTileWalkable(x, y) {
    const tileSize = this.map.tilewidth;
    const tilesPerRow = this.tileset.width / tileSize;
    let walkable = true;

    this.map.layers.forEach((layer) => {
      if (layer.type === "tilelayer" && layer.name === "metadata") {
        layer.chunks.forEach((chunk) => {
          const { x: chunkX, y: chunkY, width: chunkWidth, height: chunkHeight } = chunk;
          const tileData = chunk.data;

          tileData.forEach((tileId, index) => {
            if (tileId === 1) {
              const canvasX = chunkX + (index % chunkWidth);
              const canvasY = chunkY + Math.floor(index / chunkHeight);
              if (canvasX === x && canvasY === y) {
                walkable = false;
              }
            }
          });
        });
      }
    });

    return walkable;
  }

  /**
   * Dibuja un tile específico en las coordenadas dadas del canvas.
   * Podriamos crear una clase Tile, que tenga un método draw, y que se encargue de dibujar el tile en el canvas.
   * 
   * @param {number} x - Coordenada x del tile.
   * @param {number} y - Coordenada y del tile.
   */
  drawTile(x, y) {

    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * this.scale;
    const tilesPerRow = this.tileset.width / tileSize;

    this.map.layers.forEach((layer) => {
      if (layer.type === "tilelayer" && layer.name !== "metadata") {
        layer.chunks.forEach((chunk) => {
          const { x: chunkX, y: chunkY, width: chunkWidth, height: chunkHeight } = chunk;
          const tileData = chunk.data;

          tileData.forEach((tileId, index) => {
            if (tileId !== 0) {
              const canvasX = (chunkX + (index % chunkWidth)) * tileSize * this.scale;
              const canvasY = (chunkY + Math.floor(index / chunkHeight)) * tileSize * this.scale;
              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY = Math.floor((tileId - 1) / tilesPerRow) * tileSize;

              if (canvasX === x * tileSize * this.scale && canvasY === y * tileSize * this.scale) {
                this.ctx.drawImage(this.tileset, tilesetX, tilesetY, tileSize, tileSize, canvasX, canvasY, scaledTileSize, scaledTileSize);
              }
            }
          });
        });
      }
    });
  }

  /**
   * Dibuja la capa de tiles sobrepuesta para la última posición dada en el canvas.
   * @param {number} x - Coordenada x del tile.
   * @param {number} y - Coordenada y del tile.
   */
  drawLastTile(x, y) {
    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * this.scale;
    const tilesPerRow = this.tileset.width / tileSize;

    this.map.layers.forEach((layer) => {
      if (layer.type === "tilelayer" && layer.name.includes("over")) {
        layer.chunks.forEach((chunk) => {
          const { x: chunkX, y: chunkY, width: chunkWidth, height: chunkHeight } = chunk;
          const tileData = chunk.data;

          tileData.forEach((tileId, index) => {
            if (tileId !== 0) {
              const canvasX = (chunkX + (index % chunkWidth)) * tileSize * this.scale;
              const canvasY = (chunkY + Math.floor(index / chunkHeight)) * tileSize * this.scale;
              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY = Math.floor((tileId - 1) / tilesPerRow) * tileSize;

              if (canvasX === x * tileSize * this.scale && canvasY === y * tileSize * this.scale) {
                this.ctx.drawImage(this.tileset, tilesetX, tilesetY, tileSize, tileSize, canvasX, canvasY, scaledTileSize, scaledTileSize);
              }
            }
          });
        });
      }
    });
  }

  /**
   * Dibuja el mapa completo en el canvas.
   * @param {number} scale - Escala del mapa.
   */
  drawMap(scale = 1) {
    this.scale = scale;
    const tileSize = this.map.tilewidth;
    const scaledTileSize = tileSize * this.scale;
    const tilesPerRow = this.tileset.width / tileSize;

    this.map.layers.forEach((layer) => {
      if (layer.type === "tilelayer" && layer.name !== "metadata") {
        layer.chunks.forEach((chunk) => {
          const { x: chunkX, y: chunkY, width: chunkWidth, height: chunkHeight } = chunk;
          const tileData = chunk.data;

          tileData.forEach((tileId, index) => {
            if (tileId !== 0) {
              const canvasX = (chunkX + (index % chunkWidth)) * tileSize * this.scale;
              const canvasY = (chunkY + Math.floor(index / chunkHeight)) * tileSize * this.scale;
              const tilesetX = ((tileId - 1) % tilesPerRow) * tileSize;
              const tilesetY = Math.floor((tileId - 1) / tilesPerRow) * tileSize;

              this.ctx.drawImage(this.tileset, tilesetX, tilesetY, tileSize, tileSize, canvasX, canvasY, scaledTileSize, scaledTileSize);
            }
          });
        });
      }
    });
  }

  /**
   * Carga un mapa desde el servidor.
   * @param {string} mapName - Nombre del mapa a cargar.
   * @returns {Promise<Object>} - Promesa que se resuelve con los datos del mapa.
   */
  async loadMap(mapName) {
    const response = await fetch(contextInstance.getKey("mapPath") + mapName + ".json");
    return response.json();
  }

  /**
   * Inicializa el mapa y lo dibuja en el canvas.
   * @param {string} mapName - Nombre del mapa.
   * @param {string} tileset - Nombre del archivo de tileset.
   * @param {number} scale - Escala del mapa.
   * @returns {Promise<void>} - Promesa que se resuelve cuando el mapa ha sido cargado.
   */
  async init(mapName, tileset, scale = 3) {
    this.scale = scale;
    this.map = await this.loadMap(mapName);

    const tilesetImage = new Image();
    tilesetImage.src = contextInstance.getKey("tilesetPath") + tileset;
    
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
