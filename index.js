const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const fs = require('fs');
const UIDGenerator = require('uid-generator');
const package = require('./package.json');

// CLASS
const uidgen = new UIDGenerator();

let win;
let iconpath = __dirname + '/icon.png';
let appIcon = null;

async function createWindow() {
    const ID = await uidgen.generate();
    win = new BrowserWindow({
        height: 578,
        width: 1025,
        resizable: false,
        icon: __dirname + '/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false,
        maximizable: true,
        minimizable: true,
        title: 'Statcord',
    })
    win.setTitle('Statcord');
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

    if(!fs.existsSync(`config.json`)) {
        const json = {
            "Client_Id": "896551646308499537",
            "username": "Guest",
            "id": "Guest",
            "Rich_Presence": {
              "details": "Vibing",
              "state": "Music. . .",
              "file_username": "vibing",
              "bannername": "Vibe_knight",
              "file_bannername": "vibing"
            }
        }
        let data = JSON.stringify(json, null, 2);
        fs.writeFile("config.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
    }
}

// IPCMAIN Functions
ipcMain.on('minimize-window', () => { win.hide() });
ipcMain.on('close-window', () => { win.close() });
ipcMain.on('open-main', () => { win.loadFile('src/html/index.html'); });
ipcMain.on('open-settings', () => { win.loadFile('src/html/settings.html'); });
ipcMain.on('open-setup', () => { win.loadFile('src/html/setup.html'); });
ipcMain.on('open-selector', () => { win.loadFile('src/html/selector.html'); });
ipcMain.on('open-console', () => { win.loadFile('src/html/console.html'); });

// APP Functions
app.whenReady().then(createWindow);
app.on('before-quit', function() { tray.destroy(); });
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit() } });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow() } });