import contextInstance from "../globalContext.js";
import cameraController from "./cameraController.js";
import keyboardController from "./keyboardController.js";

export class BaseController {
    constructor() {
        this.context = contextInstance;
        this.cameraController = cameraController
        this.keyboardController = keyboardController;

    }
}