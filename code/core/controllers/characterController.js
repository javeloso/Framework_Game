import { SpriteController } from "../controllers/spriteController.js";
import { BaseController } from "../controllers/baseController.js";

export class CharacterController extends BaseController {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.posX = -1; // Pòsición X en el mapa
    this.posY = -1; // Posición Y en el mapa

    //TODO si voy a utilizar una layer para el personaje, no necesito estas variables
    this.lposX = -1; // Posición X anterior utilizada para calcular el tile anterior
    this.lposY = -1; // Posición Y anterior

    this.dx = 0; // Desplazamiento de la posicion en X
    this.dy = 0; // Desplazamiento de la posicion en Y

    this.direction = "down";
    this.spriteController = null;
    this.setupControls();
  }

  /**
   * Establece la posición del personaje.
   * @param {number} x - Posición X.
   * @param {number} y - Posición Y.
   * 
   * Establece la posición del personaje en el mapa.
   */ 
  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }



  /**
   * Inicializa el sprite del controlador de personaje.
   * @param {string} name - Nombre del archivo del sprite.
   * @param {number} width - Ancho de cada sprite.
   * @param {number} height - Alto de cada sprite.
   * 
   * Inicializa el controlador de sprites y carga el sprite del personaje.
   */
  async initSpriteController(name, width, height) {
    await this.setSpriteController(name, width, height);
  }

  /**
   * Configura los controles del teclado.
   */
  setupControls() {
    // this.keyboardController.onKeyPress("a", () => this.move("left", -1, 0));
    // this.keyboardController.onKeyPress("d", () => this.move("right", 1, 0));
    // this.keyboardController.onKeyPress("w", () => this.move("up", 0, -1));
    // this.keyboardController.onKeyPress("s", () => this.move("down", 0, 1));

    this.keyboardController.onKeyPress("a", () => this.move("left", this.context.getKey("characterVelocity")*-1 , 0));
    this.keyboardController.onKeyPress("d", () => this.move("right", this.context.getKey("characterVelocity"), 0));
    this.keyboardController.onKeyPress("w", () => this.move("up", 0, this.context.getKey("characterVelocity")*-1));
    this.keyboardController.onKeyPress("s", () => this.move("down", 0, this.context.getKey("characterVelocity")));
  }

  /**
   * Maneja el movimiento del personaje.
   * @param {string} newDirection - Dirección del movimiento.
   * @param {number} deltaX - Cambio en X.
   * @param {number} deltaY - Cambio en Y.
   */
  move(newDirection, deltaX, deltaY) {
    let auxPosX = this.posX;
    let auxPosY = this.posY;
    let auxdx = this.dx + deltaX;
    let auxdy = this.dy + deltaY;
  
    const boxSize = this.context.getKey("boxSize");
  
    // Ajustar posición horizontal
    if (auxdx >= boxSize) {
      auxPosX += Math.floor(auxdx / boxSize);
      auxdx %= boxSize; // Mantener el residuo dentro de los límites de boxSize
    } else if (auxdx < 0) {
      auxPosX += Math.floor(auxdx / boxSize);
      auxdx = (auxdx % boxSize + boxSize) % boxSize; // Normalizar a valores positivos
    }
  
    // Ajustar posición vertical
    if (auxdy >= boxSize) {
      auxPosY += Math.floor(auxdy / boxSize);
      auxdy %= boxSize; // Mantener el residuo dentro de los límites de boxSize
    } else if (auxdy < 0) {
      auxPosY += Math.floor(auxdy / boxSize);
      auxdy = (auxdy % boxSize + boxSize) % boxSize; // Normalizar a valores positivos
    }
  

    if (this.direction !== newDirection) {
      const [prevX, prevY] = this.getPreviousTilePosition();
      this.context
        .getKey("mapController")
        .drawTile(
          this.context
            .getKey("canvasController")
            .getCanvas("main")
            .getContext(),
          prevX,
          prevY
        );
      this.direction = newDirection;
    }
  
    this.lposX = this.posX;
    this.lposY = this.posY;
  
    let tileToCheckX = auxPosX;
    let tileToCheckY = auxPosY;
  
    if (newDirection === "right" && auxdx > 0) {
      tileToCheckX = auxPosX + 1;
    } else if (newDirection === "left" && auxdx < 0) {
      tileToCheckX = auxPosX - 1;
    } else if (newDirection === "down" && auxdy > 0) {
      tileToCheckY = auxPosY + 1;
    } else if (newDirection === "up" && auxdy < 0) {
      tileToCheckY = auxPosY - 1;
    }
  
    // Comprobar si ambos tiles son transitables
    const currentTileWalkable = this.context.getKey("mapController").isTileWalkable(auxPosX, auxPosY);
    const additionalTileWalkable = this.context.getKey("mapController").isTileWalkable(tileToCheckX, tileToCheckY);
  
    if (currentTileWalkable && additionalTileWalkable) {
      this.posX = auxPosX;
      this.posY = auxPosY;
      this.dx = auxdx;
      this.dy = auxdy;
      this.direction = newDirection; // Actualizar dirección
      this.cameraController.updateCanvasPosition(this.posX, this.posY, this.dx, this.dy);
    }
  
    this.draw();
  }
  
  /**
   * Dibuja el personaje en el canvas.
   * TODO Este metodo dibujará el personaje en su propia layer
   */
  draw() {
    if (!this.spriteController) return;

    const sprite = this.getSprite();
    if (!sprite) return;

    const ctx = this.context
      .getKey("canvasController")
      .getCanvas("main")
      .getContext();
    const { posX, posY, lposX, lposY } = this.getPosition();

    this.context.getKey("mapController").drawTile(ctx, lposX, lposY);
    ctx.drawImage(
      sprite.image,
      sprite.sx,
      sprite.sy,
      sprite.width,
      sprite.height,
      posX * this.context.getKey("boxSize") * this.context.getKey("scale") + this.context.getKey("relativeMapPosition").x + (this.dx * this.context.getKey("scale")),
      posY * this.context.getKey("boxSize") * this.context.getKey("scale") + this.context.getKey("relativeMapPosition").y + (this.dy * this.context.getKey("scale")),
      this.context.getKey("boxSize") * this.context.getKey("scale"),
      this.context.getKey("boxSize") * this.context.getKey("scale")
    );

    this.context.getKey("mapController").drawOver(ctx, posX, posY);
  }

  /**
   * Obtiene el sprite correspondiente a la dirección actual.
   */
  getSprite() {
    if (!this.spriteController) return null;

    switch (this.direction) {
      case "left":
        return this.spriteController.getSpriteByPosition(2, 0);
      case "right":
        return this.spriteController.getSpriteByPosition(3, 0);
      case "up":
        return this.spriteController.getSpriteByPosition(1, 0);
      case "down":
        return this.spriteController.getSpriteByPosition(0, 0);
      default:
        return this.spriteController.getSpriteByPosition(0, 0);
    }
  }

  /**
   * Inicializa el controlador de sprites.
   * @param {string} name - Nombre del archivo del sprite.
   * @param {number} width - Ancho de cada sprite.
   * @param {number} height - Alto de cada sprite.
   * 
   * TODO Este metodo se va a tener que ir de aquí
   * no es responsabilidad de este controlador
   */
  async setSpriteController(name, width, height) {
    this.spriteController = new SpriteController(
      this.context.getKey("spritePath") + name + ".png",
      width,
      height
    );
    await this.spriteController.imageLoaded;
  }

  /**
   * Obtiene las posiciones previas del tile.
   * TODO, no se que hacer con esto
   */
  getPreviousTilePosition() {
    switch (this.direction) {
      case "left":
        return [this.posX - 1, this.posY];
      case "right":
        return [this.posX + 1, this.posY];
      case "up":
        return [this.posX, this.posY - 1];
      case "down":
        return [this.posX, this.posY + 1];
      default:
        return [this.posX, this.posY];
    }
  }

  /**
   * Obtiene las posiciones actuales y previas del personaje.
   */
  getPosition() {
    return {
      posX: this.posX,
      posY: this.posY,
      lposX: this.lposX,
      lposY: this.lposY,
    };
  }
}
