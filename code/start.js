import { test } from "./objects/test.js";

import contextInstance from "./core/globalContext.js";

export class Start {
  constructor() {
    contextInstance.get("mapController").init("hojaverde", "hgss.png", 1)
    .then(() => {
        this.test();
    });
  }

    test() {
        const testInstance = new test(30, 1);
        testInstance.draw(contextInstance.get("canvasController").ctx);

        contextInstance.setUpdate('testInstance', testInstance);
    }
}
