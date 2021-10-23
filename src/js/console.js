const fs = require('fs');
const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const moment = require('moment');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const delay = ms => new Promise(res => setTimeout(res, ms));

//Creating a start- and endTimestamp for the initial timer
var d1 = new Date ();
// var d2 = new Date(d1);
// Adding Epochs to set the timer
// d2.setSeconds(d1.getSeconds() + db.Rich_Presence.countdown_start);

var Console = document.getElementById("console")
var statusConsole = document.getElementById("console-button-box-status")
var userConsole = document.getElementById("console-button-box-user")

function onLoad () {
    Console.innerHTML += `
    <p style="font-size: 25px;">Discord-RPC Console</p>
    <p>User: ` + db.username + `&nbsp;&nbsp;&nbsp;&nbsp; ID: ` + db.id + `</p>
    <p class="orange">Leaving this page will stop your custom status, but you can minimize this app to your tray.</p>
    `
    userConsole.innerHTML = "User: " + db.username;
    statusConsole.innerHTML = "Status: 🔴 - Offline"; 
    statusConsole.style.color = "red";
}
onLoad();

var myVar2 = setInterval(liveView, 10000);

function liveView() {
  var image = document.getElementById("prestatus-status-image-show");
  fetch(`https://api.bosstop.ml/v1/statcord/pfp/${db.Client_Id}/${db.Rich_Presence.file_bannername}`)
  .then(response => response.json())
  .then(data => {
    if(data.status === 404) {
      image.src = "../images/Custom-Image.png"
    } else {
      image.src = data.image + "?width=110&height=100"
    }
  })
  var state = document.getElementById("prestatus-status-state");
  var details = document.getElementById("prestatus-status-details");
  if(db.Rich_Presence.state == null) {
    state.innerHTML = "Not Set";
  } else {
    state.innerHTML = db.Rich_Presence.state;
  }
  if(db.Rich_Presence.details == null) {
    details.innerHTML = "Not Set";
  } else {
    details.innerHTML = db.Rich_Presence.details;
  }
}
liveView();

function On() {
    find('name', 'Discord.exe', true)
    .then(function (list) {
        if(list.length > 0) {
            if(db.Rich_Presence.details == null || db.Rich_Presence.bannername == null) {
                Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: U need to set your Custom Status First<br> Go Back and Click Selector</p>`;
                return;
            }
            if(statusConsole.style.color == "chartreuse"){
                Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: Status is already On :/</p>`;
                return;
            } else {
                Console.innerHTML += `<p>[` + moment(d1).format('LTS') + `]: Setting Custom Status</p>`
                rpc.setActivity({
                    details: db.Rich_Presence.details,
                    state: db.Rich_Presence.state,
                    largeImageKey: db.Rich_Presence.file_bannername.toLowerCase(),
                    largeImageText: db.Rich_Presence.bannername,
                    instance: false,
                    startTimestamp: d1
                }).then(() => {
                    db.Status = true;
                    Console.innerHTML += `<p class="lightgreen">[` + moment(d1).format('LTS') + `]: Custom Status Set :)</p>`
                    statusConsole.innerHTML = "Status: 🟢 - Online" 
                    statusConsole.style.color = "chartreuse";
                    fs.writeFile('./db.json', JSON.stringify(db, null, 2), function writeJSON(err) {
                        if (err) return console.log(err);
                    });
                })
            }
        } else {
            Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: Discord is not active or Could not be found</p>`;
        }
    });
}

async function Update() {
    if(statusConsole.style.color == "chartreuse"){
        Console.innerHTML += `<p class="orange">[` + moment(d1).format('LTS') + `]: Updating status</p>`;
        statusConsole.innerHTML = "Status: 🟠 - Updating"
        statusConsole.style.color = "orange";
        await delay(5000);
        rpc.setActivity({
            details: db.Rich_Presence.details,
            state: db.Rich_Presence.state,
            largeImageKey: db.Rich_Presence.file_bannername.toLowerCase(),
            largeImageText: db.Rich_Presence.bannername,
            instance: false,
            startTimestamp: d1
        }).then(() => {
            Console.innerHTML += `<p class="lightgreen">[` + moment(d1).format('LTS') + `]: Status Updated :)</p>`
            statusConsole.innerHTML = "Status: 🟢 - Online" 
            statusConsole.style.color = "chartreuse";
        })
    } else {
        Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: Custom Status has not been turned on :/</p>`;
        return;
    }
}

function Off() {
    if(statusConsole.style.color == "chartreuse"){
        rpc.clearActivity().then(() => {
            Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') +`]: Turning Off :(</p>`
            statusConsole.innerHTML = "Status: 🔴 - Offline" 
            statusConsole.style.color = "red";
        })
    } else {
        Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: Custom Status is already Off :/</p>`;
        return;   
    }
}

rpc.login({ clientId: db.Client_Id }).catch((err) => {
    Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') +`]: ` + err + `</p>`
});