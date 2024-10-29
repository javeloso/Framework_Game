import contextInstance from "../core/globalContext.js";

import { gameObject } from "./gameObject.js";

export class drawableObject extends gameObject{
    constructor(){
        super();
        this.ctx = contextInstance.get('canvasController').ctx
    }
    update(){
    }
    redraw(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.draw();
    }
}