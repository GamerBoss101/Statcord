const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        height: 578,
        width: 1025,
        resizable: true,
        icon: __dirname + '/js.png',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        frame: false,
        maximizable: true,
        minimizable: true,
        title: 'Discord Status',
    })
    win.setTitle('Discord Status');
    win.loadFile('src/html/index.html');
}

app.whenReady().then(createWindow);

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