// CharacterController.js
import keyboardController from "../controllers/keyboardController.js";
import contextInstance from "../core/globalContext.js";

export class CharacterController {
  constructor(posX, posY, onMoveCallback) {
    this.posX = posX;
    this.posY = posY;
    this.lposX = posX;
    this.lposY = posY;
    this.direction = "down";
    this.onMoveCallback = onMoveCallback;

    this.setupControls();
  }

  setupControls() {
    keyboardController.onKeyPress("a", () => this.move("left", -1, 0));
    keyboardController.onKeyPress("d", () => this.move("right", 1, 0));
    keyboardController.onKeyPress("w", () => this.move("up", 0, -1));
    keyboardController.onKeyPress("s", () => this.move("down", 0, 1));
  }

  move(direction, deltaX, deltaY) {
    // Si la dirección cambia, dibuja el tile en la posición anteriora
    if (this.direction !== direction) {
      contextInstance.get("mapController").drawTile(this.lposX, this.lposY);
      this.direction = direction; // Actualiza la dirección
    }

    // Guarda la posición anterior antes de mover
    this.lposX = this.posX;
    this.lposY = this.posY;

    // Actualiza la posición
    this.posX += deltaX;
    this.posY += deltaY;

    // Dibuja el nuevo tile en la nueva posición
    contextInstance.get("mapController").drawTile(this.posX, this.posY);

    // Llama al callback para actualizar el dibujo del personaje
    this.onMoveCallback();
  }

  getDirection() {
    return this.direction;
  }

  getPosition() {
    return { posX: this.posX, posY: this.posY, lposX: this.lposX, lposY: this.lposY };
  }
}
