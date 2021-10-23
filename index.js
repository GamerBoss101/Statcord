const {app, Menu, Tray, ipcMain } = require('electron');
const fs = require('fs');
const Glasstron = require('glasstron');

let win;
let iconpath = __dirname + '/icon.png';
let appIcon = null;

async function createWindow() {
    const ID = await makeID(14);
    win = new Glasstron.BrowserWindow({
        height: 578,
        width: 1025,
        frame: false,
        maximizable: true,
        minimizable: true,
        resizable: false,
        title: 'Statcord',
        icon: __dirname + '/icon.png',
        blur: true,
        blurType: "blurbehind",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
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
            "Client_Id": "897980361290694686",
            "username": "Guest",
            "id": `${ID}`,
            "Rich_Presence": {
              "details": null,
              "state": null,
              "file_username": null,
              "bannername": null,
              "file_bannername": null
            }
        }
        let data = JSON.stringify(json, null, 2);
        fs.writeFile("config.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
    }
}

// FUNCTION
function makeID(length) { 
    var result           = [];
    var characters       = "0123456789012345678901234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz____----..";
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
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
app.on('activate', () => { if (Glasstron.BrowserWindow.getAllWindows().length === 0) { createWindow() } });