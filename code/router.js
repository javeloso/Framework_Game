/**
 * Clase Router
 * 
 * La clase `Router` es el punto de entrada de la aplicación y gestiona las rutas del juego. 
 * Se encarga de inicializar los componentes esenciales, como los controladores de Canvas, 
 * Mapas y Teclado, además de gestionar variables globales y rutas de recursos.
 */

import contextInstance from "./core/globalContext.js";

import CanvasController from "./core/controllers/canvasController.js";
import MapController from "./core/controllers/mapController.js";
import keyboardController from "./core/controllers/keyboardController.js";

import { Start } from "./start.js";

/**
 * Vars: Define las variables globales del juego que son accesibles desde cualquier parte del código.
 * Paths: Define las rutas de acceso a los recursos del juego.
 */

const Vars = {
    scale: 2, // Factor de escala de los gráficos en el juego
}

const Paths = {
    tilesetPath: 'assets/tilesets/',    
    mapPath: 'assets/maps/',            
    spritePath: 'assets/sprites/',      
    codePath: 'code/',                  
    controllerPath: 'core/controllers/',
    
    // Rutas de los modelos
    modelPath: 'core/model/',
    canvasModelPath: 'core/model/canvas.js',
    mapModelPath: 'core/model/map.js',
    tileModelPath: 'core/model/tile.js',
    gameObjectModelPath: 'core/model/gameObject.js',
    drawableObjectModelPath: 'core/model/drawableObject.js',

    // Rutas de los controladores
    cameraControllerPath: 'core/controllers/cameraController.js',
    characterControllerPath: 'core/controllers/characterController.js',
    keyboardControllerPath: 'core/controllers/keyboardController.js',
    mapControllerPath: 'core/controllers/mapController.js',
    spriteControllerPath: 'core/controllers/spriteController.js'    
}

/**
 * Evento `window.onload`
 * 
 * Este evento se ejecuta cuando la ventana ha cargado completamente. Inicia el juego
 * configurando el Canvas y el Mapa, e inicializa las variables y rutas en el contexto global
 * `contextInstance`, permitiendo que sean accesibles desde cualquier parte del juego.
 */

window.onload = () => {

    /**
     * Inicialización del Canvas y Mapa
     * 
     * Crea una instancia de `CanvasController` con el tamaño especificado para el canvas 
     * y una instancia de `MapController` que utiliza el canvas para la renderización.
     * Ambos controladores se almacenan en `contextInstance` para su acceso global.
     */
    const canvasController = new CanvasController(); // Dimensiones del canvas
    canvasController.createCanvas('main', window.innerWidth, window.innerHeight);
    canvasController.getCanvas('main').create();
    
    const mapController = new MapController(canvasController); // Controlador de mapa que usa el canvas

    contextInstance.setKey('canvasController', canvasController);

    contextInstance.setKey('mapController', mapController);
    contextInstance.setKey('relativeMapPosition', { x: 0, y: 0 });
    
    // Asigna las variables globales en `Vars` al contexto global `contextInstance`
    for (const varName in Vars) {
        contextInstance.setKey(varName, Vars[varName]);
    }

    // Asigna las rutas definidas en `Paths` al contexto global `contextInstance`
    for (const path in Paths) {
        contextInstance.setKey(path, Paths[path]);
    }

    /**
     * Instancia de Start
     * 
     * Crea una instancia de la clase `Start`, que gestiona todas las operaciones iniciales del juego,
     * asegurando que todos los elementos estén preparados y configurados antes de comenzar.
     */
    const startInstance = new Start();
    window.addEventListener('resize', function () {
        contextInstance.getKey('mapController').resizeWindow()
    });

    document.addEventListener('fullscreenchange', function () {
        console.log('Cambio de estado de pantalla completa detectado.');
        onResizeOrFullscreen();
    });
};

/**
 * Prueba de teclado
 * 
 * Se añade un evento de prueba al controlador de teclado `keyboardController`, 
 * configurando una función que se ejecuta cuando se presiona la tecla "L".
 */


keyboardController.onKeyPress("L", () => {
    contextInstance.getKey("mapController")
    .init("testMap2", "hgss_interior.png", 1)
    .then(() => {
        this.test();
    });
});

keyboardController.onKeyPress("K", () => {
    contextInstance.getKey("mapController")
    .init("testMap", "hgss.png", 1)
    .then(() => {
        this.test();
    });
});

keyboardController.onKeyPress("ArrowLeft", () => {
    contextInstance.getKey("mapController").moveCanvas(96, 0); // Mover a la derecha
});

keyboardController.onKeyPress("ArrowRight", () => {
    contextInstance.getKey("mapController").moveCanvas(-96, 0); // Mover a la izquierda
});

keyboardController.onKeyPress("ArrowUp", () => {
    contextInstance.getKey("mapController").moveCanvas(0, 96); // Mover hacia abajo
});

keyboardController.onKeyPress("ArrowDown", () => {
    contextInstance.getKey("mapController").moveCanvas(0, -96); // Mover hacia arriba
});
