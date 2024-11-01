/**
 * Clase CharacterController
 * 
 * `CharacterController` es responsable de gestionar el control del personaje, incluyendo su posición, 
 * dirección y el sprite que se muestra en función de sus movimientos. La clase permite manejar los 
 * eventos de teclado para mover al personaje y actualizar su posición y apariencia en el mapa.
 */

import keyboardController from "../controllers/keyboardController.js";
import { SpriteController } from "../controllers/spriteController.js";
import contextInstance from "../core/globalContext.js";

export class CharacterController {
    /**
     * Constructor
     * @param {number} posX - Posición inicial en el eje X del personaje.
     * @param {number} posY - Posición inicial en el eje Y del personaje.
     * @param {function} onMoveCallback - Función de callback que se llama cada vez que el personaje se mueve.
     * 
     * Inicializa la posición y dirección del personaje, y configura los controles para manejar el movimiento.
     */
    constructor(posX, posY, onMoveCallback) {
        this.posX = posX;    // Posición actual X del personaje
        this.posY = posY;    // Posición actual Y del personaje
        this.lposX = posX;   // Última posición X del personaje
        this.lposY = posY;   // Última posición Y del personaje
        this.direction = "down"; // Dirección inicial
        this.onMoveCallback = onMoveCallback;

        this.setupControls();
    }

    /**
     * setupControls
     * 
     * Configura los controles del teclado para mover el personaje en diferentes direcciones.
     */
    setupControls() {
        keyboardController.onKeyPress("a", () => this.move("left", -1, 0));   // Izquierda
        keyboardController.onKeyPress("d", () => this.move("right", 1, 0));    // Derecha
        keyboardController.onKeyPress("w", () => this.move("up", 0, -1));      // Arriba
        keyboardController.onKeyPress("s", () => this.move("down", 0, 1));     // Abajo
    }

    /**
     * move
     * @param {string} newDirection - Nueva dirección del movimiento.
     * @param {number} deltaX - Desplazamiento en el eje X.
     * @param {number} deltaY - Desplazamiento en el eje Y.
     * 
     * Actualiza la posición del personaje, dibuja el tile en la última posición si la dirección cambia, 
     * y llama a la función de callback `onMoveCallback` después de moverse.
     */
    move(newDirection, deltaX, deltaY) {
        // Dibuja el tile en la posición anterior si la dirección cambia
        if (this.direction !== newDirection) {
            const [prevX, prevY] = this.getPreviousTilePosition();
            contextInstance.getKey("mapController").drawTile(prevX, prevY);
            this.direction = newDirection; // Actualiza la dirección
        }

        // Actualiza la última posición
        this.lposX = this.posX;
        this.lposY = this.posY;

        // Verifica si el tile de destino es accesible antes de actualizar la posición
        if (contextInstance.getKey("mapController").isTileWalkable(this.posX + deltaX, this.posY + deltaY)) {
            this.posX += deltaX;
            this.posY += deltaY;
        }
        
        this.onMoveCallback(); // Llama al callback para actualizar el personaje
        contextInstance.getKey("mapController").drawLastTile(this.posX, this.posY);
    }

    /**
     * getPreviousTilePosition
     * @returns {[number, number]} - Coordenadas X e Y del tile adyacente en la última dirección.
     * 
     * Retorna la posición del tile anterior en función de la última dirección del personaje.
     */
    getPreviousTilePosition() {
        switch (this.direction) {
            case "left":  return [this.posX - 1, this.posY];
            case "right": return [this.posX + 1, this.posY];
            case "up":    return [this.posX, this.posY - 1];
            case "down":  return [this.posX, this.posY + 1];
            default:      return [this.posX, this.posY];
        }
    }

    /**
     * getSpriteTest
     * @returns {Image} - Sprite del personaje en función de su dirección actual.
     * 
     * Obtiene el sprite que corresponde a la dirección actual del personaje.
     */
    getSpriteTest() {
        switch (this.direction) {
            case "left":  return this.spriteController.getSpriteByPosition(2, 0);
            case "right": return this.spriteController.getSpriteByPosition(3, 0);
            case "up":    return this.spriteController.getSpriteByPosition(1, 0);
            case "down":  return this.spriteController.getSpriteByPosition(0, 0);
            default:      return this.spriteController.getSpriteByPosition(0, 0);
        }
    }

    /**
     * getDirection
     * @returns {string} - Dirección actual del personaje.
     */
    getDirection() {
        return this.direction;
    }

    /**
     * getPosition
     * @returns {Object} - Posición actual y última posición del personaje.
     * 
     * Retorna un objeto con las posiciones actuales y anteriores del personaje.
     */
    getPosition() {
        return { posX: this.posX, posY: this.posY, lposX: this.lposX, lposY: this.lposY };
    }

    /**
     * setSpriteController
     * @param {string} name - Nombre del archivo del sprite.
     * @param {number} width - Ancho de cada sprite.
     * @param {number} height - Alto de cada sprite.
     * 
     * Asigna un `SpriteController` al personaje, cargando el archivo de sprite y ajustando el tamaño de cada frame.
     */
    async setSpriteController(name, width, height) {
        this.spriteController = new SpriteController(contextInstance.getKey("spritePath") + name + ".png", width, height);
        await this.spriteController.imageLoaded;
    }

    /**
     * getSpriteController
     * @returns {SpriteController} - Instancia de `SpriteController` asociada al personaje.
     */
    getSpriteController() {
        return this.spriteController;
    }
}
