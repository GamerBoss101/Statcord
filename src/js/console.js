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

var settingsDetails = document.getElementById("console-settings-box-details")
var settingsState = document.getElementById("console-settings-box-state")
var settingsPicturename = document.getElementById("console-settings-box-picturename")
var Console = document.getElementById("console")
var statusConsole = document.getElementById("console-button-box-status")
var userConsole = document.getElementById("console-button-box-user")

function onLoad () {
    Console.innerHTML += `
    <p style="font-size: 25px;">Discord-RPC Console</p>
    <p>User: ` + config.username + `&nbsp;&nbsp;&nbsp;&nbsp; ID: ` + config.id + `</p>
    <p class="orange">Leaving this page will stop your custom status</p>
    `
    userConsole.innerHTML = "User: " + config.username;
    statusConsole.innerHTML = "Status: 🔴 - Offline"; 
    statusConsole.style.color = "red";
    settingsDetails.innerHTML = "Details: " + config.Rich_Presence.details;
    settingsState.innerHTML = "State: " + config.Rich_Presence.state;
    settingsPicturename.innerHTML = "Picture: " + config.Rich_Presence.file_bannername;
}
onLoad();

var myVar = setInterval(updateConfig, 20000);

function updateConfig () {
    settingsDetails.innerHTML = "Details: " + config.Rich_Presence.details;
    settingsState.innerHTML = "State: " + config.Rich_Presence.state;
    settingsPicturename.innerHTML = "Picture: " + config.Rich_Presence.file_bannername;
}

function On() {
    if(statusConsole.style.color == "chartreuse"){
        Console.innerHTML += `<p class="red">[` + moment(d1).format('LTS') + `]: Status is already On :/</p>`;
        return;
    } else {
        Console.innerHTML += `<p>[` + moment(d1).format('LTS') + `]: Setting Custom Status</p>`
        rpc.setActivity({
            details: config.Rich_Presence.details,
            state: config.Rich_Presence.state,
            largeImageKey: config.Rich_Presence.file_bannername,
            largeImageText: config.Rich_Presence.bannername,
            instance: false,
            startTimestamp: d1
        }).then(() => {
            Console.innerHTML += `<p class="lightgreen">[` + moment(d1).format('LTS') + `]: Custom Status Set :)</p>`
            statusConsole.innerHTML = "Status: 🟢 - Online" 
            statusConsole.style.color = "chartreuse";
        })
    }
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
            largeImageKey: config.Rich_Presence.file_bannername,
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
    Console.innerHTML += `<p class="red">` + err + `</p>`
});