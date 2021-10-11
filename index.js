const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');

let win;
let iconpath = __dirname + '/icon.png';
let appIcon = null;

function createWindow() {
    win = new BrowserWindow({
        height: 578,
        width: 1025,
        resizable: false,
        icon: __dirname + '/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + '/src/js/preload.js'
        },
        frame: false,
        maximizable: true,
        minimizable: true,
        title: 'Discord Status Maker',
    })
    win.setTitle('Discord Status Maker');
    win.loadFile('src/html/index.html');
    
    win.on('close', function (event) { app.isQuiting = true, app.quit() })

    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                win.show()
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ])
    appIcon = new Tray(iconpath);
    appIcon.setContextMenu(contextMenu);
}

// Minimize and close window
ipcMain.on('minimize-window', () => {
    win.hide();
});

ipcMain.on('close-window', () => { win.close() });

app.whenReady().then(createWindow);
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit() } });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow() } });