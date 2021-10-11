const { ipcRenderer } = require('electron');

var settingsButton = document.getElementById("settings")
settingsButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-settings');
});

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", function (e) {
    ipcRenderer.send('close-window');
}); 

var backButton = document.getElementById("back-btn")
backButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-main');
}); 