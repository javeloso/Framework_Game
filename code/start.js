/**
 * Clase Start
 * 
 * La clase `Start` se encarga de inicializar el mapa y ejecutar el código necesario al inicio del juego.
 * Es el punto de arranque donde se crean instancias clave de objetos, como el objeto `test`, y se realizan 
 * las configuraciones iniciales del juego. 
 */

import { test } from "./objects/test.js";
import contextInstance from "./core/globalContext.js";

export class Start {
    /**
     * Constructor
     * 
     * Inicializa el mapa de juego llamando al método `init` en `mapController`, que carga el mapa 
     * con los recursos necesarios. Una vez que la promesa de inicialización se resuelve, llama al método `test`.
     */
    constructor() {
        contextInstance.getKey("mapController")
            .init("testMap_Interior", "hgss_interior.png", 1)
            .then(() => {
                this.test();
            });
    }

    /**
     * test
     * 
     * Crea una instancia de la clase `test` con posiciones iniciales `(15, 15)`. Llama al método `draw` 
     * de esta instancia para renderizar el objeto en el mapa.
     * 
     * Nota: La línea `contextInstance.setUpdate('testInstance', testInstance);` está comentada, pero 
     * podría usarse para almacenar la instancia `testInstance` en `contextInstance` para permitir 
     * actualizaciones globales.
     */
    test() {
        const testInstance = new test(15, 15); // Crea un nuevo objeto `test` en (15, 15)
        testInstance.draw(); // Dibuja el objeto `test` en el canvas

        // contextInstance.setUpdate('testInstance', testInstance); // Opcional: guarda la instancia en el contexto global
    }
}
