import contextInstance from "../core/globalContext.js";
import { CharacterController } from "../controllers/characterController.js";
import { drawableObject } from "./drawableObject.js";

/**
 * Representa a un jugador en el juego, que extiende de drawableObject.
 * Esta clase maneja la inicialización del sprite, la posición del jugador
 * y el dibujo del jugador en el canvas.
 */
export class test extends drawableObject {
  /**
   * Crea una instancia de Player.
   * @param {number} posX - Posición inicial en el eje X del jugador.
   * @param {number} posY - Posición inicial en el eje Y del jugador.
   */
  constructor(posX, posY, name = "") {
    super();
    this.characterController = new CharacterController(posX, posY, () => this.draw());
    this.initSpriteController();
    this.initSpriteController().then(() => {
      this.draw(contextInstance.getKey("canvasController").getCanvas("main").getContext());
    });
  }

  /**
   * Inicializa el controlador de sprites.
   * Carga el sprite del personaje y lo asigna a la instancia.
   * @returns {Promise<void>} - Promesa que se resuelve cuando el sprite ha sido cargado.
   */
  async initSpriteController() {
    try {
      await this.characterController.setSpriteController("cristi", 32, 32);
      // Una vez cargada, se asigna el sprite
      this.sprite = this.characterController.getSpriteController().getSpriteByPosition(0, 0);
    } catch (error) {
      console.error("Error initializing sprite controller:", error);
    }
  }

  /**
   * Dibuja el jugador en el canvas.
   * También dibuja el tile correspondiente en la posición actual del jugador.
   * Actualiza la posición del sprite antes de dibujarlo.
   */
  draw() {
    this.sprite = this.characterController.getSpriteTest();
    if (!this.sprite) return;
  
    const { posX, posY, lposX, lposY } = this.characterController.getPosition();
    contextInstance.getKey("mapController").drawTile(contextInstance.getKey("canvasController").getCanvas("main").getContext(),lposX, lposY);
    
    //this.testLookDirection(posX, posY);

    contextInstance.getKey("canvasController").getCanvas("main").getContext().drawImage(
      this.sprite.image,
      this.sprite.sx, 
      this.sprite.sy, 
      this.sprite.width, 
      this.sprite.height,
      posX * this.scale * contextInstance.getKey("boxSize") + contextInstance.getKey("relativeMapPosition").x, 
      posY * this.scale * contextInstance.getKey("boxSize") + contextInstance.getKey("relativeMapPosition").y, 
      this.scale * contextInstance.getKey("boxSize"), 
      this.scale * contextInstance.getKey("boxSize")
    );
  }
  

  /**
   * Dibuja un rectángulo que indica la dirección que está mirando el jugador.
   * @param {number} posX - Posición X actual del jugador.
   * @param {number} posY - Posición Y actual del jugador.
   */
  testLookDirection(posX, posY) {
    contextInstance.getKey("canvasController").getCanvas("main").getContext().fillStyle = "red";
    const directionOffset = {
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
    };

    const direction = this.characterController.getDirection();
    const offset = directionOffset[direction];

    if (offset) {
      contextInstance.getKey("canvasController").getCanvas("main").getContext().fillRect(
        (posX + offset.x) * this.scale * contextInstance.getKey("boxSize"),
        (posY + offset.y) * this.scale * contextInstance.getKey("boxSize"),
        this.scale * contextInstance.getKey("boxSize"),
        this.scale * contextInstance.getKey("boxSize")
      );
    }
  }

  /**
   * Actualiza el estado del jugador.
   * Este método se puede extender para actualizar la lógica del jugador en cada frame.
   */
  update() {
    super.update();
    //console.log("Player updated at position:", this.characterController.getPosition());
  }
}
