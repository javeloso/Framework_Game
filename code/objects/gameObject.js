import contextInstance from "../core/globalContext.js";

export class gameObject{
    constructor(posX, posY){
        this.x = posX;
        this.y = posY;
    }
    draw(ctx){
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x * contextInstance.get('scale') * 16, 
            this.y * contextInstance.get('scale') * 16, 
            contextInstance.get('scale') * 16, 
            contextInstance.get('scale') * 16);
    }
    update(){
        this.x++;
        this.y++;
    }
}