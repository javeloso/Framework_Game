import contextInstance from "./core/globalContext.js";

import CanvasController from "./controllers/canvasController.js";
import MapController from "./controllers/mapController.js";
import keyboardController from "./controllers/keyboardController.js";

import { Start } from "./start.js";
import Update from "./update.js";

const Vars = {
    scale: 2,
}

const Paths = {
    tilesetPath: '../assets/tilesets/',
    mapPath: '../assets/maps/',
    codePath: '../code/'
}

window.onload = () => {
    const canvasController = new CanvasController(1000,1000);
    const mapController = new MapController(canvasController);

    contextInstance.set('canvasController', canvasController);
    contextInstance.set('mapController', mapController);
    
    for (const varName in Vars) {
        contextInstance.set(varName, Vars[varName]);
    }

    for (const path in Paths) {
        contextInstance.set(path, Paths[path]);
    }

    const startInstance = new Start();

};

keyboardController.onKeyPress("t", () => {
  console.log("La tecla T fue presionada");
});
