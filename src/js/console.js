const fs = require('fs');
const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const moment = require('moment');

let rawdata = fs.readFileSync('./config.json');
let config = JSON.parse(rawdata);

const delay = ms => new Promise(res => setTimeout(res, ms));

//Creating a start- and endTimestamp for the initial timer
var d1 = new Date ();
// var d2 = new Date(d1);
// Adding Epochs to set the timer
// d2.setSeconds(d1.getSeconds() + config.Rich_Presence.countdown_start);

var Console = document.getElementById("console")
var statusConsole = document.getElementById("console-button-box-status")
var userConsole = document.getElementById("console-button-box-user")

function onLoad () {
    Console.innerHTML += `
    <p style="font-size: 25px;">Discord-RPC Console</p>
    <p>User: ` + config.username + `&nbsp;&nbsp;&nbsp;&nbsp; ID: ` + config.id + `</p>
    <p class="orange">Leaving this page will stop your custom status, but U can minimize this app to your tray.</p>
    `
    userConsole.innerHTML = "User: " + config.username;
    statusConsole.innerHTML = "Status: 🔴 - Offline"; 
    statusConsole.style.color = "red";
}
onLoad();

var myVar2 = setInterval(liveView, 10000);

function liveView() {
  var image = document.getElementById("prestatus-status-image-show");
  fetch(`https://api.bosstop.ml/v1/statcord/pfp/${config.Client_Id}/${config.Rich_Presence.file_bannername}`)
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
  if(config.Rich_Presence.state == null) {
    state.innerHTML = "Not Set";
  } else {
    state.innerHTML = config.Rich_Presence.state;
  }
  if(config.Rich_Presence.details == null) {
    details.innerHTML = "Not Set";
  } else {
    details.innerHTML = config.Rich_Presence.details;
  }
}
liveView();

function On() {
    find('name', 'Discord.exe', true)
    .then(function (list) {
        if(list.length > 0) {
            if(config.Rich_Presence.details == null || config.Rich_Presence.bannername == null) {
                Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: U need to set your Custom Status First<br> Go Back and Click Selector</p>`;
                return;
            }
            if(statusConsole.style.color == "chartreuse"){
                Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: Status is already On :/</p>`;
                return;
            } else {
                Console.innerHTML += `<p>[` + moment(d1).format('LTS') + `]: Setting Custom Status</p>`
                rpc.setActivity({
                    details: config.Rich_Presence.details,
                    state: config.Rich_Presence.state,
                    largeImageKey: config.Rich_Presence.file_bannername.toLowerCase(),
                    largeImageText: config.Rich_Presence.bannername,
                    instance: false,
                    startTimestamp: d1
                }).then(() => {
                    Console.innerHTML += `<p class="lightgreen">[` + moment(d1).format('LTS') + `]: Custom Status Set :)</p>`
                    statusConsole.innerHTML = "Status: 🟢 - Online" 
                    statusConsole.style.color = "chartreuse";
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
            details: config.Rich_Presence.details,
            state: config.Rich_Presence.state,
            largeImageKey: config.Rich_Presence.file_bannername.toLowerCase(),
            largeImageText: config.Rich_Presence.bannername,
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

rpc.login({ clientId: config.Client_Id }).catch((err) => {
    Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') +`]: ` + err + `</p>`
});