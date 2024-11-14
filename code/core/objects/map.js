import { Tile } from "../core/objects/Tile.js"; // Importa la clase Tile

/**
 * La clase map va a guardar en una lista todos los tiles que se van a dibujar en el canvas.
 * el map controller va a acceder a esta clase para dibujar los tiles en el canvas.
 * ademas tambien será la encargada de preguntarle a la clase Tile si se puede mover a una posición.
 * y un método para dibujar todos los tiles en el canvas.
 * 
 * asi como un metodo para comprobar propiedades del tile (x,y)
 */
class Map {
  constructor() {
    this.tiles = [];
  }

  /**
   * Crea un tile y lo guarda en la posición correspondiente del mapa.
   * @param {Tile} tile - La instancia del tile a agregar al mapa.
   */
  createTile(tile) {
    const x = tile.getX();
    const y = tile.getY();

    if (!this.tiles[x]) {
      this.tiles[x] = []; // Si no existe la fila para la coordenada X, la creamos
    }
    
    // Guardamos el tile en la posición correspondiente
    this.tiles[x][y] = tile;
  }

  /**
   * Recupera el tile en las coordenadas (x, y).
   * @param {number} x - Coordenada X del tile.
   * @param {number} y - Coordenada Y del tile.
   * @returns {Tile|null} - El tile en las coordenadas dadas o null si no existe.
   */
  getTile(x, y) {
    if (this.tiles[x] && this.tiles[x][y]) {
      return this.tiles[x][y];
    }
    return null;
  }

  draw(){}

  isWalkable(x, y) {}

  //checkProperties(x, y) {}
}

export default MapController;
