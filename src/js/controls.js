const { ipcRenderer } = require('electron');

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", function (e) {
    ipcRenderer.send('close-window');
}); 