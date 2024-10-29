import { gameObject } from "./gameObject.js";

export class test extends gameObject{
    constructor(posX, posY){
        super(posX, posY);
    }
    draw(ctx){
        super.draw(ctx);
    }
    update(){
        super.update();
        console.log("testX");
    }
}