import contextInstance from "../globalContext.js";

class CameraController {
    constructor() {
        if (!CameraController.instance) {
            CameraController.instance = this;
        }
        
        return CameraController.instance; // Retorna la instancia única
    }

/**
 * Actualiza la posición del canvas alrededor de una posición con desplazamiento, centrándola en el mapa.
 * @param {number} posX - Posición X en tiles.
 * @param {number} posY - Posición Y en tiles.
 * @param {number} dx - Desplazamiento X dentro del tile (en píxeles).
 * @param {number} dy - Desplazamiento Y dentro del tile (en píxeles).
 */
updateCanvasPosition(posX, posY, dx, dy) {
    const canvasController = contextInstance.getKey("canvasController");
    const mapController = contextInstance.getKey("mapController");
  
    const canvasWidth = canvasController.getCanvas("main").width;
    const canvasHeight = canvasController.getCanvas("main").height;
    const tileSize = contextInstance.getKey("boxSize") * contextInstance.getKey("scale");
  
    const relativeMapPosition = contextInstance.getKey("relativeMapPosition");
  
    // Calcula la posición del jugador en píxeles
    const playerPixelX = posX * tileSize + dx;
    const playerPixelY = posY * tileSize + dy;
  
    // Calcula el centro objetivo del canvas
    const targetX = Math.floor(canvasWidth / 2) - playerPixelX;
    const targetY = Math.floor(canvasHeight / 2) - playerPixelY;
  
    // Limita el desplazamiento para no exceder los bordes del mapa
    const mapWidth = mapController.getWidth() * tileSize;
    const mapHeight = mapController.getHeight() * tileSize;
  
    const maxOffsetX = Math.min(0, canvasWidth - mapWidth);
    const maxOffsetY = Math.min(0, canvasHeight - mapHeight);
  
    // Ajusta el desplazamiento relativo, pero permite el movimiento en todas las direcciones
    const newOffsetX = Math.max(maxOffsetX, Math.min(0, targetX));
    const newOffsetY = Math.max(maxOffsetY, Math.min(0, targetY));
  
    // Calcula las diferencias en posición
    const deltaX = newOffsetX - relativeMapPosition.x;
    const deltaY = newOffsetY - relativeMapPosition.y;
  
    // Mueve el canvas si es necesario
    if (deltaX !== 0 || deltaY !== 0) {
      mapController.moveCanvas(deltaX, deltaY);
      relativeMapPosition.x += deltaX;
      relativeMapPosition.y += deltaY;
    }
  }
  
  
  
}



const cameraController = new CameraController();
Object.freeze(cameraController);

export default cameraController;
  