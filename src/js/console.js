const fs = require('fs');
const moment = require('moment');

const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const delay = ms => new Promise(res => setTimeout(res, ms));

//Creating a start- and endTimestamp for the initial timer
var d1 = new Date ();
// var d2 = new Date(d1);
// Adding Epochs to set the timer
// d2.setSeconds(d1.getSeconds() + db.Rich_Presence.countdown_start);

var StatusContainer = document.getElementById("panel-container")
var statusConsole = document.getElementById("console-button-box-status")
var userConsole = document.getElementById("console-button-box-user")

var title = document.getElementById("prestatus-status-title");
var state = document.getElementById("prestatus-status-state");
var details = document.getElementById("prestatus-status-details");
var banner = document.getElementById("prestatus-status-image-show");

function onLoad () {
  UserCheck()
  getCLients()
  statusConsole.innerHTML = "Status: 🔴 - Offline"; 
  statusConsole.style.color = "red";
}
onLoad();

function ConnectCheck() {
  if(db.connectID == null) {
    StatusContainer.style.display = "none";
    document.getElementById("connect-id-display").style.fontSize = "15px";
    document.getElementById("connect-id-display").style.left = "2.5%";
    document.getElementById("connect-id-display").style.top = "2.5%";
    document.getElementById("connect-id-display").innerHTML = "Connect to your account using the Connect ID provided in Statcord Panel.";
  } else {
    document.getElementById("connect-id-display").style.left = "2.5%";
    document.getElementById("connect-id-display").style.top = "5%";
    document.getElementById("connect-id-display").style.fontSize = "18px";
    document.getElementById("connect-id-display").innerHTML = "Connect ID: " + db.connectID;
    return;
  }
}

ConnectCheck();

function ConnectID() {
  if(document.getElementById("connect-input").value.length > 1){
    db.connectID = document.getElementById("connect-input").value;
    reload()
  } else {
    return;
  }
  fs.writeFile('./config.json', JSON.stringify(db, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

async function reload() {
  await delay(2000);
  location.reload();
}

function getCLients() {
  if(db.connectID){
    fetch(`https://api.bosstop.ml/v1/statcord/user/connect/${db.connectID}`)
    .then(response => response.json())
    .then(data => {
      if(data.status == 404){
        return;
      } else {
        db.Client_Id = data.clientid;
        
      }
      fs.writeFile('./config.json', JSON.stringify(db, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
      });
    })
  } else {
    return;
  }
}

function UserCheck() {
  if(StatusContainer.style.display = "block") {
    if(db.connectID == null) {
      return;
    } else {
      fetch(`https://api.bosstop.ml/v1/statcord/user/connect/${db.connectID}`)
      .then(response => response.json())
      .then(data => {
        if(data.status == 404){
          return;
        } else {
          if(data.user) {
            document.getElementById("console-button-box-user").innerHTML = "User: " + data.username;
          } else {
            document.getElementById("console-button-box-user").innerHTML = "User: Guest";
          }
        }
      })
    }
  } else {
    return;
  }
}


var myVar2 = setInterval(liveView, 5000);

function liveView() {
  if(db.connectID){
    fetch(`https://api.bosstop.ml/v1/statcord/user/connect/${db.connectID}`)
    .then(response => response.json())
    .then(data => {
      if(data.status) {
        return;
      } else {
        if(data.clientid == "897980361290694686") {
          title.innerHTML = "<b>LIFE</b>"
          banner.src = `https://api.bosstop.ml/v1/statcord/pfp/image/${data.clientid}/${data.bannerid}?width=110&height=100`
          state.innerHTML = data.state;
          details.innerHTML = data.details;
          if(data.button1 == true) {
            document.getElementById("prestatus-status-btn1").style.display = "block";
            document.getElementById("prestatus-status-btn1").innerHTML = data.button1Label;
          } else {
            document.getElementById("prestatus-status-btn1").style.display = "none";
          }
          if(data.button2 == true) {
            document.getElementById("prestatus-status-btn2").style.display = "block";
            document.getElementById("prestatus-status-btn2").innerHTML = data.button2Label;
          } else {
            document.getElementById("prestatus-status-btn2").style.display = "none";
          }
        } else {
          title.innerHTML = "<b>CUSTOM</b>"
          banner.src = `https://api.bosstop.ml/v1/statcord/pfp/image/${data.clientid}/${data.bannerid}?width=110&height=100`
          state.innerHTML = data.state;
          details.innerHTML = data.details;
        }
      }
    })
  } else {
    return;
  }
}
liveView();

function On() {
  find('name', 'Discord.exe', true)
  .then(function (list) {
    if(list.length > 0) {
      if(statusConsole.style.color == "chartreuse"){
        alert("Status is already On :/")
        return;
      } else {
        fetch(`https://api.bosstop.ml/v1/statcord/user/connect/${db.connectID}`)
        .then(response => response.json())
        .then(data => {
          if(data.status) {
            return;
          } else {
            rpc.setActivity({
              details: data.details,
              state: data.state,
              largeImageKey: data.bannerid.toLowerCase(),
              largeImageText: data.bannercaption,
              instance: false,
              startTimestamp: d1
            }).then(() => {
              statusConsole.innerHTML = "Status: 🟢 - Online" 
              statusConsole.style.color = "chartreuse";
            })
          }
        })
      }
    } else {
      alert("Discord is not active or Could not be found")
      return;
    }
  });
}

async function Update() {
  if(statusConsole.style.color == "chartreuse"){
    statusConsole.innerHTML = "Status: 🟠 - Updating"
    statusConsole.style.color = "orange";
    await delay(5000);
    fetch(`https://api.bosstop.ml/v1/statcord/user/connect/${db.connectID}`)
    .then(response => response.json())
    .then(data => {
      if(data.status) {
        return;
      } else {
        if(data.clientid == db.Client_Id) {
          rpc.setActivity({
            details: data.details,
            state: data.state,
            largeImageKey: data.bannerid.toLowerCase(),
            largeImageText: data.bannercaption,
            instance: false,
            startTimestamp: d1
          }).then(() => {
            statusConsole.innerHTML = "Status: 🟢 - Online" 
            statusConsole.style.color = "chartreuse";
          })
        } else {
          getCLients()
          location.reload();
        }
      }
    })
  } else {
    alert("You must click the on button first!")
  }
}

function Off() {
  if(statusConsole.style.color == "chartreuse"){
    rpc.clearActivity().then(() => {
      statusConsole.innerHTML = "Status: 🔴 - Offline" 
      statusConsole.style.color = "red";
    })
  } else {
    return;   
  }
}

rpc.login({ clientId: db.Client_Id }).then(() => {
  console.log('Signed in')
}).catch((err) => {
return;
});