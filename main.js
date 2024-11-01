const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Permitir la integración de Node.js
            contextIsolation: false, // Desactivar el aislamiento del contexto para el acceso a Node.js
            enableRemoteModule: true // Habilitar el módulo remoto si es necesario
        }
    });

    // Cargar el archivo HTML
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Salir cuando todas las ventanas están cerradas (en macOS no se cierra el app al cerrar la ventana)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
