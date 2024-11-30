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
    // Escala de todos los gráficos del juego
    scale: 3,
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
     * Instancia de CanvasController
     * Vamos a crear tres Canvas, utilizando el CanvasController para gestionarlos.
     * También vamos a añadirlos al DOM con el metodo Create de cada Canvas.
     */
    const canvasController = new CanvasController();
    canvasController.createCanvas('main', window.innerWidth, window.innerHeight);
    canvasController.createCanvas('interface', window.innerWidth, window.innerHeight);
    canvasController.createCanvas('events', window.innerWidth, window.innerHeight);
    canvasController.getCanvas('main').create();
    canvasController.getCanvas('events').create();
    canvasController.getCanvas('interface').create();

    // Añadimos el canvasController al contexto global
    //TODO que todas las clases accedan a la clase canvasController y no al contexto
    contextInstance.setKey('canvasController', canvasController);


    
    /**
     * Instancia de MapController
     * Vamos a crear una instancia de MapController, que se encargará de gestionar el mapa del juego.
     */    
    const mapController = new MapController(canvasController);

    // Añadimos el mapController al contexto global
    //TODO que todas las clases accedan a la clase mapController y no al contexto
    contextInstance.setKey('mapController', mapController);

    /**
     * Añadimos todo al contexto global
     * La posicion relativa del mapa se utiliza para mover el mapa en la pantalla
     */
    contextInstance.setKey('relativeMapPosition', { x: 0, y: 0 });
    for (const varName in Vars) {
        contextInstance.setKey(varName, Vars[varName]);
    }
    for (const path in Paths) {
        contextInstance.setKey(path, Paths[path]);
    }

    /**
     * Instancia de Start
     * Inicializa el juego llamando a la clase `Start`.
     */
    const startInstance = new Start();

    /**
     * Evento `resize` y `fullscreenchange`
     * 
     * Estos eventos se ejecutan cuando la ventana cambia de tamaño o entra/sale del modo pantalla completa.
     * Llama a la función `onResizeOrFullscreen` para ajustar el tamaño del canvas.
     */
    window.addEventListener('resize', function () {
        contextInstance.getKey('mapController').resizeWindow()
    });
    document.addEventListener('fullscreenchange', function () {
        console.log('Cambio de estado de pantalla completa detectado.');
        onResizeOrFullscreen();
    });
};

//-------------------------------------PRUEBAS-------------------------------------------

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
