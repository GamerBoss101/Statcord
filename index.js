const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const fs = require('fs');

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
            contextIsolation: false
        },
        frame: false,
        maximizable: true,
        minimizable: true,
        title: 'Discord Status',
    })
    win.setTitle('Discord Status');
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
            "Rich_Presence":{
                "details": "Vibing",
                "state": "Music. . .",
                "file_username": "vibing",
                "bannername": "Vibe_knight",
                "file_bannername": "vibing",
                "maxpartysize": 1,
                "countdown_start": 1, 
                "Refresh": false,
                "Refresh_time": 1000,
                "button":{
                    "label": null,
                    "url": null
                }
            },
            "Dont_Touch":{
                "updatecounter": 0
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
ipcMain.on('open-selector', () => { win.loadFile('src/html/settings.html'); });
ipcMain.on('open-image-selector', () => { win.loadFile('src/html/settings.html'); });
ipcMain.on('open-console', () => { win.loadFile('src/html/console.html'); });

app.whenReady().then(createWindow);
app.on('before-quit', function() { tray.destroy(); });
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit() } });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow() } });