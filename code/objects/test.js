import keyboardController from "../controllers/keyboardController.js";
import contextInstance from "../core/globalContext.js";

import { drawableObject } from "./drawableObject.js";

export class test extends drawableObject {
  constructor(posX, posY) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.lposX = posX; // Inicializar las propiedades lposX y lposY
    this.lposY = posY;

    keyboardController.onKeyPress("a", () => {
      this.lposX = this.posX;
      this.lposY = this.posY;
      this.posX -= 1;
      this.draw();
    });
    keyboardController.onKeyPress("d", () => {
        this.lposX = this.posX;
        this.lposY = this.posY;
      this.posX += 1;
      this.draw();
    });
    keyboardController.onKeyPress("w", () => {
        this.lposX = this.posX;
        this.lposY = this.posY;
      this.posY -= 1;
      this.draw();
    });
    keyboardController.onKeyPress("s", () => {
        this.lposX = this.posX;
        this.lposY = this.posY;
      this.posY += 1;
      this.draw();
    });
  }

  draw() {
    contextInstance.get("mapController").redrawTile(this.lposX, this.lposY);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      this.posX * this.scale * 16,
      this.posY * this.scale * 16,
      this.scale * 16,
      this.scale * 16
    );
    console.log(this.posX + " " + this.posY + " " + this.lposX + " " + this.lposY);
  }

  update() {
    super.update();
    console.log("testX");
  }
}
