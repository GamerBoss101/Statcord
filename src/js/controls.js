const { ipcRenderer, shell } = require('electron');
const package = require('../../package.json');

var appVersion = document.getElementById("version")
function Version () {
    fetch('http://localhost/v1/statcord/version')
    .then(response => response.json())
    .then(data => {
        if(data.version === package.version) {
            appVersion.innerHTML = "v" + package.version;
            appVersion.style.color = "chartreuse";
        } else {
            appVersion.innerHTML = "v" + package.version + " New Version Available, CLick ME!";
            appVersion.style.color = "red";
            appVersion.style.cursor = "pointer";
            appVersion.addEventListener("click", function (e) {
                e.preventDefault();
                shell.openExternal("https://github.com/GamerBoss101/Statcord/releases");
            });
        }
    })
}
Version();

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