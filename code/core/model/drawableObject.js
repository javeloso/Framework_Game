import contextInstance from "../globalContext.js";
import { gameObject } from "./gameObject.js";

export class drawableObject extends gameObject {
    /**
     * Crea una instancia de drawableObject.
     * Se obtiene el contexto del canvas desde `contextInstance` para realizar el dibujo.
     */
    constructor() {
        super();
        this.ctx = contextInstance.getKey('canvasController').ctx;
    }

    /**
     * Borra el canvas completo y redibuja el objeto en su nueva posición.
     * Puede optimizarse para borrar solo el área específica del objeto.
     */
    redraw() {
        this.clearCanvas();
        this.draw();
    }
}
