import { drawableObject } from "./drawableObject";
import { CharacterController } from "../controllers/characterController";
import contextInstance from "../core/globalContext";

class Character extends drawableObject {
    constructor(poxX, posY){
      if (!Character.instance) {
        super();
        this.characterController = new CharacterController(posX, posY, () => this.draw());
        this.initSpriteController();
        Character.instance = this;
      }
      return Character.instance;
    }

    async initSpriteController() {
      try {
        await this.characterController.setSpriteController("cristi", 32, 32);
        this.sprite = this.characterController.getSpriteController().getSpriteByPosition(0, 0);
      } catch (error) {
        console.error("Error initializing sprite controller:", error);
      }
    }
}

const character = new Character();
Object.freeze(character);

export default character;