
var setupButton = document.getElementById("setup")
setupButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-setup');
});