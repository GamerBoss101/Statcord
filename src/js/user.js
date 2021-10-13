const config = require('../../config.json');

var userCreateForm = document.getElementById("user-create-form")
var userUsername = document.getElementById("user-username");
var UserID = document.getElementById("user-id")
var userCreatebtn = document.getElementById("user-create-button")
var userCreatebox = document.getElementById("user-info-box")

function onStart () {
    if(!config.id) {
        userCreatebtn.style.display = "contents";
        userCreateForm.style.display = "contents";
    } else {
        userCreatebox.style.fontSize = "18px";
        userUsername.innerHTML = "Username: " + config.username;
        UserID.innerHTML = "ID: " + config.id;
    }
}
onStart();

function userCreate() {

}