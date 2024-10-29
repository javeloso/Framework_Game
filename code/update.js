import contextInstance from "./core/globalContext.js";

class Update {
  constructor() {
    if (!Update.instance) {
      this.objects = {};
      Update.instance = this;
    }

    return Update.instance;
  }

  update() {
    const updates = Object.values(contextInstance.getUpdate()); // Obtenemos los valores

    if (updates.length == 0) {
      console.log("No hay objetos para actualizar.");
      return;
    }

    updates.forEach((updatable) => {
      if (typeof updatable.update === "function") {
        // Verificamos si tiene método update
        updatable.update();
      } else {
        console.warn("El objeto no tiene el método update:", updatable);
      }
    });
  }
}

const update = new Update();
Object.freeze(update);

export default update;