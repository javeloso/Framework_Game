import contextInstance from "../core/globalContext.js";

export class gameObject{
    constructor(){
        this.scale = contextInstance.get('scale');
    }
    update(){
    }
}