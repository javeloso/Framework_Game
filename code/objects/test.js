import contextInstance from "../core/globalContext.js";
import { CharacterController } from "../controllers/characterController.js";
import { drawableObject } from "./drawableObject.js";

export class test extends drawableObject {
  constructor(posX, posY) {
    super();
    this.characterController = new CharacterController(posX, posY, () => this.draw());
  }

  draw() {
    const { posX, posY, lposX, lposY } = this.characterController.getPosition();
    // Dibuja el tile anterior
    contextInstance.get("mapController").drawTile(lposX, lposY);

    // Dibuja el tile actual
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      posX * this.scale * 16,
      posY * this.scale * 16,
      this.scale * 16,
      this.scale * 16
    );

    this.testLookDirection(posX, posY);
  }
  
  testLookDirection(posX, posY) {
    // Dibuja la dirección
    this.ctx.fillStyle = "red";
    switch (this.characterController.getDirection()) {
      case "left":
        this.ctx.fillRect((posX - 1) * this.scale * 16, posY * this.scale * 16, this.scale * 16, this.scale * 16);
        break;
      case "right":
        this.ctx.fillRect((posX + 1) * this.scale * 16, posY * this.scale * 16, this.scale * 16, this.scale * 16);
        break;
      case "up":
        this.ctx.fillRect(posX * this.scale * 16, (posY - 1) * this.scale * 16, this.scale * 16, this.scale * 16);
        break;
      case "down":
        this.ctx.fillRect(posX * this.scale * 16, (posY + 1) * this.scale * 16, this.scale * 16, this.scale * 16);
        break;
    }
  }
  

  update() {
    super.update();
    console.log("testX");
  }
}