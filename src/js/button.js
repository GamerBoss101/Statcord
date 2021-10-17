
var setupButton = document.getElementById("setup")
setupButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-setup');
});

var consoleButton = document.getElementById("console")
consoleButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-console');
});

var creatorButton = document.getElementById("creator")
creatorButton.addEventListener("click", function (e) {
    e.preventDefault();
    shell.openExternal("https://discord.gg/yZZttDd6XT");
});

var selectorButton = document.getElementById("selector")
selectorButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-selector');
});