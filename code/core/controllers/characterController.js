import contextInstance from "../globalContext.js";
import keyboardController from "../controllers/keyboardController.js";
import { SpriteController } from "../controllers/spriteController.js";

export class CharacterController {
  /**
   * Constructor
   * @param {number} posX - Posición inicial en el eje X del personaje.
   * @param {number} posY - Posición inicial en el eje Y del personaje.
   */
  constructor() {
    this.posX = -1;
    this.posY = -1;
    this.lposX = -1;
    this.lposY = -1;
    this.direction = "down";
    this.spriteController = null; // Se inicializa después
    this.setupControls();
  }

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
  }

  /**
   * Inicializa el sprite del controlador de personaje.
   * @param {string} name - Nombre del archivo del sprite.
   */
  async initSpriteController(name, width, height) {
    await this.setSpriteController(name, width, height);
  }

  /**
   * Configura los controles del teclado.
   */
  setupControls() {
    keyboardController.onKeyPress("a", () => this.move("left", -1, 0));
    keyboardController.onKeyPress("d", () => this.move("right", 1, 0));
    keyboardController.onKeyPress("w", () => this.move("up", 0, -1));
    keyboardController.onKeyPress("s", () => this.move("down", 0, 1));
  }

  /**
   * Maneja el movimiento del personaje.
   * @param {string} newDirection - Dirección del movimiento.
   * @param {number} deltaX - Cambio en X.
   * @param {number} deltaY - Cambio en Y.
   */
  move(newDirection, deltaX, deltaY) {
    if (this.direction !== newDirection) {
      const [prevX, prevY] = this.getPreviousTilePosition();
      contextInstance
        .getKey("mapController")
        .drawTile(
          contextInstance
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
  
    if (
      contextInstance
        .getKey("mapController")
        .isTileWalkable(this.posX + deltaX, this.posY + deltaY)
    ) {
      this.posX += deltaX;
      this.posY += deltaY;
  
      // Llamamos a moveCanvas para ajustar la posición del mapa
      this.updateCanvasPosition();
    }
  
    this.draw();
  }
  

  updateCanvasPosition() {
    const canvasController = contextInstance.getKey("canvasController");
    const mapController = contextInstance.getKey("mapController");
  
    const canvasWidth = canvasController.getCanvas("main").width;
    const canvasHeight = canvasController.getCanvas("main").height;
    const tileSize = contextInstance.getKey("boxSize") * contextInstance.getKey("scale");
  
    const centerX = Math.floor(canvasWidth / 2);
    const centerY = Math.floor(canvasHeight / 2);
  
    const relativeMapPosition = contextInstance.getKey("relativeMapPosition");
  
    // Calculamos la nueva posición relativa del mapa
    const targetX =
      centerX - this.posX * tileSize - tileSize / 2; // Centra al personaje
    const targetY =
      centerY - this.posY * tileSize - tileSize / 2; // Centra al personaje
  
    // Calculamos la diferencia entre la posición actual y el objetivo
    const dx = targetX - relativeMapPosition.x;
    const dy = targetY - relativeMapPosition.y;
  
    // Verificamos si el mapa puede moverse
    const mapWidth = mapController.getWidth() * tileSize;
    const mapHeight = mapController.getHeight() * tileSize;
  
    const maxOffsetX = Math.min(0, canvasWidth - mapWidth);
    const maxOffsetY = Math.min(0, canvasHeight - mapHeight);
  
    // Aseguramos que no se salga de los límites del mapa
    if (relativeMapPosition.x + dx >= maxOffsetX && relativeMapPosition.x + dx <= 0) {
      contextInstance.getKey("mapController").moveCanvas(dx, 0);
      relativeMapPosition.x += dx;
    }
    if (relativeMapPosition.y + dy >= maxOffsetY && relativeMapPosition.y + dy <= 0) {
      contextInstance.getKey("mapController").moveCanvas(0, dy);
      relativeMapPosition.y += dy;
    }
  }
  
  
  
  

  /**
   * Dibuja el personaje en el canvas.
   */
  draw() {
    console.log("drawing");
    if (!this.spriteController) return;

    const sprite = this.getSprite();
    if (!sprite) return;

    const ctx = contextInstance
      .getKey("canvasController")
      .getCanvas("main")
      .getContext();
    const { posX, posY, lposX, lposY } = this.getPosition();

    contextInstance.getKey("mapController").drawTile(ctx, lposX, lposY);
    ctx.drawImage(
      sprite.image,
      sprite.sx,
      sprite.sy,
      sprite.width,
      sprite.height,
      posX * contextInstance.getKey("boxSize") * contextInstance.getKey("scale") + contextInstance.getKey("relativeMapPosition").x,
      posY * contextInstance.getKey("boxSize") * contextInstance.getKey("scale") + contextInstance.getKey("relativeMapPosition").y,
      contextInstance.getKey("boxSize") * contextInstance.getKey("scale"),
      contextInstance.getKey("boxSize") * contextInstance.getKey("scale")
    );

    contextInstance.getKey("mapController").drawOver(ctx, posX, posY);
  }

  /**
   * Obtiene el sprite correspondiente a la dirección actual.
   * @returns {Image|null}
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
   */
  async setSpriteController(name, width, height) {
    this.spriteController = new SpriteController(
      contextInstance.getKey("spritePath") + name + ".png",
      width,
      height
    );
    await this.spriteController.imageLoaded;
  }

  /**
   * Obtiene las posiciones previas del tile.
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
