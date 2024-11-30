/**
 * Podriamos crear la clase Tile(x,y,map) que se encargue de dibujar el tile en el canvas.
 * Estos tiles se cargarían cuando cargamos el mapa y se dibujarían en el canvas en las posiciones correspondientes.
 * Tendrían la funcion draw que se encargaría de dibujar el tile en el canvas.
 */

//Utilizar la clase map para guardar los tiles y comprobar si se puede mover a una posición.

import contextInstance from "../globalContext.js";
import CanvasController from "./canvasController.js";
import { Map } from "../model/map.js";
import { Tile } from "../model/tile.js";


let instance = null;

class MapController {
  constructor() {
    if (!instance) {
      CanvasController
      this.ctx = CanvasController.ctx;
      instance = this;
    }
    return instance;
  }

  /**
   * Infla el mapa en función de la estructura origen de los datos.
   * Utiliza varios métodos adaptador para inflar el mapa
   */
  async inflateMap() {
    const hasChunks = this.map.layers.some((layer) => layer.chunks);

    if (hasChunks) {
      await this.inflateInfiniteMap(); // Si alguna capa tiene "chunks", usa el método para mapas infinitos
    } else {
      await this.inflateFixMap(); // Si no, usa el método para mapas fijos
    }

    this.dataMap.calculate();
  }

  /**
   * Método adaptador para inflar un mapa con estructura de "chunks".
   */
  async inflateInfiniteMap() {
    const tileSize = this.map.tilewidth;
    const tilesPerRow = this.tileset.width / tileSize;

    this.dataMap = new Map();

    contextInstance.setKey("boxSize", this.map.tilewidth);

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
              const posX = chunkX + (index % chunkWidth);
              const posY = chunkY + Math.floor(index / chunkHeight);

              // Coordenadas del tile en el tileset
              const tilesetX = (tileId - 1) % tilesPerRow;
              const tilesetY = Math.floor((tileId - 1) / tilesPerRow);
              let tile;
              if (layer.name.includes("over")) {
                tile = new Tile(
                  posX,
                  posY,
                  [], // Asume una capa "underPositions"
                  [[tilesetX, tilesetY]], // Puedes agregar capas "overPositions" si las hay
                  0 // Metadata del tile (se puede ajustar según el mapa)
                );
              } else if (layer.name == "metadata") {
                tile = new Tile(
                  posX,
                  posY,
                  [], // Asume una capa "underPositions"
                  [], // Puedes agregar capas "overPositions" si las hay
                  tileId // Metadata del tile (se puede ajustar según el mapa)
                );
              } else {
                tile = new Tile(
                  posX,
                  posY,
                  [[tilesetX, tilesetY]], // Asume una capa "underPositions"
                  [], // Puedes agregar capas "overPositions" si las hay
                  0 // Metadata del tile (se puede ajustar según el mapa)
                );
              }
              this.dataMap.insertTile(tile);
            }
          });
        });
      }
    });
  }

  /**
   * Método adaptador para inflar un mapa con estructura de "mapa fijo".
   */
  async inflateFixMap() {
    const tileSize = this.map.tilewidth;
    const tilesPerRow = this.tileset.width / tileSize;

    this.dataMap = new Map();
    contextInstance.setKey("boxSize", this.map.tilewidth);

    this.map.layers.forEach((layer) => {
      if (layer.type === "tilelayer") {
        // Procesar los tiles de esta capa
        layer.data.forEach((tileId, index) => {
          const posX = index % layer.width;
          const posY = Math.floor(index / layer.width);
          const tilesetX = (tileId - 1) % tilesPerRow;
          const tilesetY = Math.floor((tileId - 1) / tilesPerRow);
          let tile = null;
          if (layer.name === "metadata") {
            if (tileId !== 0) {
              tile = new Tile(posX, posY, [], [], tileId);
            }
          } else if (layer.name.includes("over")) {
            tile = new Tile(posX, posY, [], [[tilesetX, tilesetY]], 0);
          } else {
            tile = new Tile(posX, posY, [[tilesetX, tilesetY]], [], 0);
          }
          if (tile !== null) {
            this.dataMap.insertTile(tile);
          }
        });
      }
    });
  }

  /**
   * Dibuja el mapa en el canvas.
   * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas.
   */
  draw(ctx) {
    this.dataMap.draw(ctx);
  }

  /**
   * Dibuja un tile en el canvas.
   * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas.
   * @param {number} X - Coordenada X del tile.
   * @param {number} Y - Coordenada Y del tile.
   */
  drawTile(ctx, X, Y) {
    this.dataMap.drawTile(ctx, X, Y);
  }

  /**
   * Dibuja la parte `over` de un tile en el canvas.
   * @param {CanvasRenderingContext2D} ctx - Contexto 2D del canvas.
   * @param {number} X - Coordenada X del tile.
   * @param {number} Y - Coordenada Y del tile.
   */
  drawOver(ctx, X, Y) {
    this.dataMap.drawOver(ctx, X, Y);
  }

  /**
   * Comprueba si una posición es transitable.
   * @param {number} X - Coordenada X.
   * @param {number} Y - Coordenada Y.
   * @returns {boolean} - `true` si la posición es transitable, `false` en caso contrario.
   */
  isTileWalkable(X, Y) {
    return this.dataMap.isTileWalkable(X, Y);
  }

  /**
   * Devuelve el ancho del mapa en píxeles.
   * @returns {number} - Ancho del mapa.
   */
  getHeight() {
    return this.dataMap.getHeight();
  }

  /**
   * Devuelve el alto del mapa en píxeles.
   * @returns {number} - Alto del mapa.
   */
  getWidth() {
    return this.dataMap.getWidth();
  }

  resizeWindow() {
    const canvas = [contextInstance.getKey("canvasController").getCanvas("main"),
      contextInstance.getKey("canvasController").getCanvas("events"),
      contextInstance.getKey("canvasController").getCanvas("interface")
      ];
    const ctx = contextInstance.getKey("canvasController").getContext("main");


    canvas.forEach((canvas) => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
    });

    this.draw(ctx);
    // this.imageData = ctx.getImageData(0, 0, auxCanvas.width, auxCanvas.height);
    contextInstance
      .getKey("canvasController")
      .getContext("main")
      .putImageData(this.imageData, 0, 0);
  }

  /**
   * Carga un mapa desde el servidor.
   * @param {string} mapName - Nombre del mapa a cargar.
   * @returns {Promise<Object>} - Promesa que se resuelve con los datos del mapa.
   */
  async loadMap(mapName) {
    try {
      const response = await fetch(
        contextInstance.getKey("mapPath") + mapName + ".json"
      );
      if (!response.ok) {
        throw new Error(`Error loading map: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Failed to load map:", error);
      throw error; // Re-lanza el error para manejarlo en el método `init`.
    }
  }

  /**
   * Inicializa el mapa y lo dibuja en el canvas.
   * @param {string} mapName - Nombre del mapa.
   * @param {string} tileset - Nombre del archivo de tileset.
   * @param {number} scale - Escala del mapa.
   * @returns {Promise<void>} - Promesa que se resuelve cuando el mapa ha sido cargado.
   */
  async init(mapName, tileset, scale) {
    this.scale = scale;
    try {
      this.map = await this.loadMap(mapName);

      const tilesetImage = new Image();
      tilesetImage.src = contextInstance.getKey("tilesetPath") + tileset;

      contextInstance.setKey("tileSize", this.map.tilewidth);
      contextInstance.setKey("scale", scale);

      return new Promise((resolve, reject) => {
        tilesetImage.onload = async () => {
          try {
            contextInstance.setKey("tileset", tilesetImage);
            this.tileset = tilesetImage;
            await this.inflateMap();
            let auxCanvas = contextInstance
              .getKey("canvasController")
              .createCanvas(
                "aux",
                this.dataMap.getWidth(),
                this.dataMap.getHeight()
              );
            let ctx = auxCanvas.getContext("2d");
            await this.draw(auxCanvas.getContext());
            this.imageData = ctx.getImageData(
              0,
              0,
              auxCanvas.width,
              auxCanvas.height
            );
            contextInstance
              .getKey("canvasController")
              .getContext("main")
              .putImageData(this.imageData, 0, 0);

            this.posX = 0;
            this.posY = 0;

            resolve();
          } catch (inflateError) {
            console.error("Error inflating map:", inflateError);
            reject(inflateError);
          }
        };

        tilesetImage.onerror = (error) => {
          console.error("Error loading tileset image:", error);
          reject(error);
        };
      });
    } catch (error) {
      console.error("Failed to initialize map:", error);
      throw error;
    }
  }

  moveCanvas(dx, dy) {

    const canvas = contextInstance.getKey("canvasController").getCanvas("main");

    this.posX = Math.max(
      Math.min(this.posX + dx, 0),
      canvas.width - this.imageData.width
    );
    this.posY = Math.max(
      Math.min(this.posY + dy, 0),
      canvas.height - this.imageData.height
    );

    // Limpiar el canvas
    contextInstance
      .getKey("canvasController")
      .getContext("main")
      .clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

    // Dibujar la imagen desplazada
    contextInstance
      .getKey("canvasController")
      .getContext("main")
      .putImageData(this.imageData, this.posX, this.posY);
    const currentPosition = contextInstance.getKey("relativeMapPosition") || {
      x: 0,
      y: 0,
    };

    contextInstance.setKey("relativeMapPosition", {
      x: Math.max(
        Math.min(currentPosition.x + dx, 0),
        canvas.width - this.imageData.width
      ),
      y: Math.max(
        Math.min(currentPosition.y + dy, 0),
        canvas.height - this.imageData.height
      ),
    });

  }

  /**
   * Devuelve una representación en forma de cadena de los datos del mapa.
   * @returns {string} - Representación en cadena de los datos del mapa.
   */
  toString() {
    return this.dataMap.toString();
  }
}

export default MapController;
