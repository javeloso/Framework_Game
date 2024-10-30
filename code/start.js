import { test } from "./objects/test.js";

import contextInstance from "./core/globalContext.js";

export class Start {
  constructor() {
    contextInstance.get("mapController").init("testMap", "hgss.png", 1)
    .then(() => {
        this.test();
    });
  }

    test() {
        const testInstance = new test(15, 15);
        testInstance.draw();

        contextInstance.setUpdate('testInstance', testInstance);
    }
}
