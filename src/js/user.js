const fs = require('fs');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

var userCreateForm = document.getElementById("user-create-form")
var userUsername = document.getElementById("user-username");
var UserID = document.getElementById("user-id")
var userCreatebtn = document.getElementById("user-create-button")
var userCreatebox = document.getElementById("user-info-box")

function onStart () {
    if(!db.id) {
        userCreatebtn.style.display = "contents";
        userCreateForm.style.display = "contents";
    } else {
        userCreatebox.style.fontSize = "18px";
        userUsername.innerHTML = "Username: " + db.username;
        UserID.innerHTML = "ID: " + db.id;
    }
}
onStart();

function userCreate() {

}