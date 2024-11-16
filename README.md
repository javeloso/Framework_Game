la escala se mide en 1,2,3...

lo que hace que si el sprite tiene 16px y el tile 32, como utilizan el mismo factor de escala, 

# Framework para Juegos 2D Basados en Tiles con JavaScript

Este framework está diseñado para crear juegos 2D sencillos utilizando JavaScript puro y un sistema basado en tiles. La estructura del proyecto está organizada en carpetas y archivos que separan los recursos gráficos y el código.

## Estructura del Proyecto

### 1. **HTML Principal**
En la raíz del proyecto se encuentra el archivo `index.html`. Este archivo es el punto de entrada para el juego y debe incluir los scripts necesarios para cargar y arrancar el juego.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="./code/router.js"></script>
    <title>2D GAME CANVAS BASED</title>
</head>
<body>
</body>
</html>
```

Como podemos ver, basta con importar el archivo `code/router.js` para que funciona el proyecto.

### 2. **Carpeta** `assets`

Esta carpeta contiene todos los **recursos gráficos y de sonido** del juego, organizados de la siguiente manera

- `tilesets/`: Contiene los archivos gráficos de los tilesets.

- `maps/`: Contiene los mapas del juego exportados en formato JSON desde Tiled.
- `sprites/`: Almacena los sprites y animaciones de los personajes u objetos.

Estructura ejemplo:
``` bash
/assets
    /tilesets
        gbc.png
    /maps
        testMap.json
    /sprites
        player.png
```

### 3. **Carpeta `code`**

Esta carpeta contiene todo el código fuente del juego. Está dividida en subcarpetas para organizar los controladores y objetos del juego, junto con archivos que gestionan el arranque y las actualizaciones del estado del juego.

**Archivos en** `code`:

#### `router.js`
Se encarga de iniciar y montar todos los controladores y estructuras del juego. Es el encargado de conectar las diferentes partes del código.

#### `start.js` 
Este archivo contiene el código que se ejecuta al arrancar el juego, como la carga inicial de assets y el inicio del bucle principal.

#### `update.js`
Aquí está el código que se ejecuta en cada frame del juego, actualizando el estado del juego y redibujando el canvas.

### Subcarpetas en `code`:
Estas carpetas contienen toda la lógica y estan estructuradas de la siguiente manera

#### Carpeta `controllers/` 
Aquí se encuentran los controladores del framework.

##### `CanvasController`
    Contiente toda la lógica del dibujado del lienzo tal como el dibujado, o el borrado.

##### `CharacterController`
    Aquí se encontrará toda la lógica del personaje.

##### `MapController`
    Contiene toda la lóica de dibujado del mapa utilizando los tilemaps y los tilesets para dibujar el mapa indicado.

##### `KeyboardController`
    Contiene la lógica para controlar las teclas y que ocurre al pulsar una tecla

#### Carpeta `objects/` 
Almacena todos los objetos que aparecerán en el escenario, como personajes, enemigos, etc.

#### Carpeta `core/` 
Carpeta opcional donde se puede incluir la lógica compartida, como el archivo `GlobalContext.js`, que actúa como un espacio de memoria compartido para todas las clases y objetos.

Estructura ejemplo:

```bash
/code
    /controllers
        CanvasController.js
        MapController.js
        CharacterController.js
    /objects
        Player.js
    /core (o /utils)
        GlobalContext.js
    router.js
    start.js
    update.js
```

### 4. **Paths**

Para facilitar el acceso a las rutas de los recursos gráficos y de código, se define un objeto `Paths` en el código.


```javascript
const Paths = {
    tilesetPath: '../assets/tilesets/',
    mapPath: '../assets/maps/',
    codePath: '../code/'
};
```

### 5. **Controladores**

Los controladores son clases que se encargan de manejar los diferentes aspectos del juego, como el canvas, los mapas y los personajes. Ejemplos de controladores incluyen:

- `CanvasController`: Controla el canvas donde se dibuja el juego.

- `MapController`: Se encarga de cargar y dibujar el mapa basado en tiles.

- `CharacterController`: Controla la lógica y el movimiento de los personajes del juego.

Cada controlador es una clase que interactúa con otras partes del sistema a través del `GlobalContext` para acceder a datos compartidos y gestionar el estado del juego.

### 6. **Contexto Global**

Se utiliza un sistema similar a la Context API para que todas las clases y objetos puedan acceder a una instancia compartida que almacene información relevante del juego. Esto se implementa usando el patrón singleton a través del archivo `GlobalContext.js`.

```javascript
class GlobalContext {
    constructor() {
        if (!GlobalContext.instance) {
            this.store = {}; // Almacena el estado compartido
            GlobalContext.instance = this;
        }

        return GlobalContext.instance;
    }

    set(key, value) {
        this.store[key] = value;
    }

    get(key) {
        return this.store[key];
    }
}

const contextInstance = new GlobalContext();
Object.freeze(contextInstance);

export default contextInstance;
```
### 7. **Método start**

El archivo `start.js` es donde se colocará el código que se ejecuta una vez que todo el juego está listo para arrancar. Este archivo será llamado por el `router.js` una vez que todos los controladores y recursos estén cargados.

### 8. **Método update**

El archivo `update.js` gestiona el bucle principal del juego, que se ejecuta en cada frame. Aquí es donde se actualizan los estados del juego, como la posición de los personajes o el progreso en el mapa.