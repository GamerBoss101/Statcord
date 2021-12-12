const { app, Menu, Tray, ipcMain, autoUpdater, dialog } = require('electron');
require('update-electron-app')()
const fs = require('fs');
const Glasstron = require('glasstron');
const log = require('electron-log');

let win;
let iconpath = __dirname + '/icon.png';
let appIcon = null;

async function createWindow() {
    win = new Glasstron.BrowserWindow({
        height: 775,
        width: 360,
        frame: false,
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
            "connectID": null,
            "Client_Id": null
        }
        let data = JSON.stringify(json, null, 2);
        fs.writeFile("config.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
    }
}

const server = 'https://statcord-gamerboss101.vercel.app'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
    autoUpdater.checkForUpdates()
    log.warn("Checked for Updates . . .")
}, 10000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})

// IPCMAIN Functions
ipcMain.on('minimize-window', () => { win.hide() });
ipcMain.on('close-window', () => { win.close() });
ipcMain.on('open-main', () => { win.loadFile('src/html/index.html'); });
// ipcMain.on('open-console', () => { win.loadFile('src/html/console.html'); });
ipcMain.on('open-updater', () => { win.loadFile('src/html/update.html'); });

app.whenReady().then(createWindow);
app.on('before-quit', function() { Tray.destroy(); });
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit() } });
app.on('activate', () => { if (Glasstron.BrowserWindow.getAllWindows().length === 0) { createWindow(); autoUpdater.checkForUpdatesAndNotify(); } });