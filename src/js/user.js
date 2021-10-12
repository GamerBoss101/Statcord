const config = require('../../config.json');

var userUsername = document.getElementById("user-username");
var UserID = document.getElementById("user-id")
var userCreatebtn = document.getElementById("user-create-button")

function onStart () {
    if(!config.id) {
        userCreatebtn.style.display = "contents";
    }
    userUsername.innerHTML = config.username;
    UserID.innerHTML = config.id;
}

onStart();

function userCreate() {

}