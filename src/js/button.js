
var setupButton = document.getElementById("setup")
setupButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-setup');
});

var consoleButton = document.getElementById("console")
consoleButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-console');
});