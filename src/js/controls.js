const { ipcRenderer, shell } = require('electron');
const package = require('../../package.json');

var appVersion = document.getElementById("version")
function Version () {
    fetch('https://api.bosstop.ml/v1/statcord/version')
    .then(response => response.json())
    .then(data => {
        if(data.version == package.version || data.version < package.version) {
            appVersion.innerHTML = "v" + package.version;
            appVersion.style.color = "chartreuse";
        } else {
            appVersion.innerHTML = "v" + data.version + " New Version Available";
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

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", function (e) {
    ipcRenderer.send('close-window');
}); 

var creatorButton = document.getElementById("creator")
creatorButton.addEventListener("click", function (e) {
    e.preventDefault();
    shell.openExternal("https://discord.gg/yZZttDd6XT");
});

var panelButton = document.getElementById("panel-btn")
panelButton.addEventListener("click", function (e) {
    e.preventDefault();
    shell.openExternal("https://sirblob.bosstop.ml/projects/statcord/user");
});