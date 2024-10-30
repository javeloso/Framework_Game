// CharacterController.js
import keyboardController from "../controllers/keyboardController.js";
import contextInstance from "../core/globalContext.js";

export class CharacterController {
  constructor(posX, posY, onMoveCallback) {
    this.posX = posX;
    this.posY = posY;
    this.lposX = posX;
    this.lposY = posY;
    this.direction = "down"; // Dirección inicial
    this.onMoveCallback = onMoveCallback;

    this.setupControls();
  }

  setupControls() {
    keyboardController.onKeyPress("a", () => this.move("left", -1, 0));   // Izquierda
    keyboardController.onKeyPress("d", () => this.move("right", 1, 0));    // Derecha
    keyboardController.onKeyPress("w", () => this.move("up", 0, -1));      // Arriba
    keyboardController.onKeyPress("s", () => this.move("down", 0, 1));     // Abajo
  }

  move(newDirection, deltaX, deltaY) {
    // Si la dirección cambia, dibuja el tile en la posición anterior usando la última dirección
    if (this.direction !== newDirection) {
      const [prevX, prevY] = this.getPreviousTilePosition();
      contextInstance.get("mapController").drawTile(prevX, prevY);
      this.direction = newDirection; // Actualiza la dirección
    }

    // Actualiza la posición anterior
    this.lposX = this.posX;
    this.lposY = this.posY;

    // Actualiza la posición actual
    if (contextInstance.get("mapController").isTileWalkable(this.posX + deltaX, this.posY + deltaY)) {
      this.posX += deltaX;
      this.posY += deltaY;
    }
    
    // Llama al callback para actualizar el dibujo del personaje
    this.onMoveCallback();
    contextInstance.get("mapController").drawLastTile(this.posX, this.posY);
  }

  // Obtiene la posición del tile adyacente en la dirección previa
  getPreviousTilePosition() {
    switch (this.direction) {
      case "left":  return [this.posX - 1, this.posY];
      case "right": return [this.posX + 1, this.posY];
      case "up":    return [this.posX, this.posY - 1];
      case "down":  return [this.posX, this.posY + 1];
      default:      return [this.posX, this.posY];
    }
  }

  getDirection() {
    return this.direction;
  }

  getPosition() {
    return { posX: this.posX, posY: this.posY, lposX: this.lposX, lposY: this.lposY };
  }
}
