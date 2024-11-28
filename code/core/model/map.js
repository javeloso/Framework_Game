import contextInstance from "../globalContext.js";
import { Tile } from "../model/tile.js";

/**
 * La clase map va a guardar en una lista todos los map que se van a dibujar en el canvas.
 * el map controller va a acceder a esta clase para dibujar los map en el canvas.
 * ademas tambien será la encargada de preguntarle a la clase Tile si se puede mover a una posición.
 * y un método para dibujar todos los tiles en el canvas.
 *
 * asi como un metodo para comprobar propiedades del tile (x,y)
 */
export class Map {
  constructor() {
    this.map = [];
    // this.loadMap();
  }

  calculate() {
    this.height = this.map.length * contextInstance.getKey("boxSize") * contextInstance.getKey("scale");
    this.width = this.map[0].length * contextInstance.getKey("boxSize") * contextInstance.getKey("scale");
  }

  /**
   * Crea un tile y lo guarda en la posición correspondiente del mapa.
   * @param {Tile} tile - La instancia del tile a agregar al mapa.
   */
  insertTile(tile) {
    const x = tile.getX();
    const y = tile.getY();

    if (!this.map[x]) {
      this.map[x] = []; // Si no existe la fila para la coordenada X, la creamos
    }
    if (this.map[x][y]) {
      this.getTile(x, y).joinTile(tile);
      return;
    }

    // Guardamos el tile en la posición correspondiente
    this.map[x][y] = tile;

    return this;
  }

  /**
   * Recupera el tile en las coordenadas (x, y).
   * @param {number} x - Coordenada X del tile.
   * @param {number} y - Coordenada Y del tile.
   * @returns {Tile|null} - El tile en las coordenadas dadas o null si no existe.
   */
  getTile(x, y) {
    if (this.map[x] && this.map[x][y]) {
      return this.map[x][y];
    }
    return null;
  }

  draw(ctx) {
    this.map.forEach((row, x) => {
      row.forEach((tile, y) => {
        tile.draw(ctx);
      });
    });
  }

  drawTile(ctx, x, y) {
    const tile = this.getTile(x, y);
    if (tile) {
      tile.draw(ctx);
    }
  }

  drawOver(ctx,x, y) {
    const tile = this.getTile(x, y);
    if (tile) {
      tile.drawOver(ctx);
    }
  }

  isTileWalkable(x, y) {
    return this.getTile(x, y).isTileWalkable();
  }

  getMetadata(x, y) {
    const tile = this.getTile(x, y);
    if (tile) {
      return tile.getMetadata();
    }
    return false;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  toString() {
    return this.map;
  }
  //checkProperties(x, y) {}
}
