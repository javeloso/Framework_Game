import contextInstance from "../core/globalContext.js";
import { CharacterController } from "../core/controllers/characterController.js";
import { drawableObject } from "../core/model/drawableObject.js";

export class test extends drawableObject {
    /**
     * Crea una instancia de test.
     * @param {number} posX - Posición inicial X.
     * @param {number} posY - Posición inicial Y.
     * @param {string} name - Nombre del sprite.
     */
    constructor() {
        super();
        this.characterController = new CharacterController();
        this.characterController.initSpriteController("cristi", 32, 32);
    }

    setPosition(x, y) {
        this.characterController.setPosition(x, y);
    }

    draw() {
        this.characterController.draw();
    }
}
