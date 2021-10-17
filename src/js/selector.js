const fs = require('fs');
const moment = require('moment');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const delay = ms => new Promise(res => setTimeout(res, ms));


// IMAGE Selector
var records_per_page = 300;

function onLoad() {
  fetch('http://localhost/v1/statcord')
  .then(response => response.json())
  .then(data => {
    if(!data) return;
    if(data.status === 200){
      changePage();
      var myVar = setInterval(changePage, 10000);
    } else {
      var listing_table = document.getElementById("image-selector");
      listing_table.innerHTML += `<h1>API OFFLINE</h1>`;
    }
  })
}
onLoad();

function changePage() {
  var listing_table = document.getElementById("image-selector");
  fetch('http://localhost/v1/statcord/pfp/897980361290694686')
  .then(response => response.json())
  .then(data => {
    if(data.length > 0) {
      listing_table.innerHTML = "";
      for (var i = (1-1) * records_per_page; i < (1 * records_per_page); i++) {
        listing_table.innerHTML += `
        <div class="pfp"><b>Name: </b>${data[i].caption} <b>Category: </b>${data[i].category}<button class="pfp-button" onclick="setpfp('${data[i]._id}', '${data[i].client}', '${data[i].caption}')">SET</button><button class="pfp-button" onclick="pfp('${data[i]._id}', '${data[i].client}')">Open</button></div>
        `;
      }
    } else {
      listing_table.innerHTML = `<h1>NO ANNOUNCEMENTS</h1>`;
    }
  })
}

var myVar2 = setInterval(liveView, 10000);

function liveView() {
  var image = document.getElementById("prestatus-status-image-show");
  fetch(`http://localhost/v1/statcord/pfp/${db.Client_Id}/${db.Rich_Presence.file_bannername}`)
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
  state.innerHTML = db.Rich_Presence.state;
  details.innerHTML = db.Rich_Presence.details;
}
liveView();

function SubmitConfig(event) {
  event.preventDefault();
  var message = document.getElementById("message");
  var details = document.getElementById("inputDetails3");
  var state = document.getElementById("inputState3");
  var PictureID = document.getElementById("inputPicID3");
  var PictureCaption = document.getElementById("inputPicCaption3");
  db.Rich_Presence.details = details.value;
  db.Rich_Presence.state = state.value;
  if(PictureID.value) {
    db.Rich_Presence.file_bannername = PictureID.value;
  }
  if(PictureCaption.value) {
    db.Rich_Presence.bannername = PictureCaption.value;
  }
  fs.writeFile('./config.json', JSON.stringify(db, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
  alert('Saved')
}

function pfp(id, client) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var Caption = document.getElementById("caption");

  fetch(`http://localhost/v1/statcord/pfp/${client}/${id}`)
  .then(response => response.json())
  .then(data => {
    modal.style.display = "block";
    Caption.innerHTML = `<b>Caption: </b>"${data.caption}"`;
    modalImg.src = data.image + "?width=360&height=350";
  })

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() { 
    modal.style.display = "none";
  }

  modalImg.onclick = function() { 
    modal.style.display = "none";
  }
}

function setpfp(id, client, caption) {
  var message = document.getElementById("message");
  db.Client_Id = client;
  db.Rich_Presence.file_bannername = id;
  db.Rich_Presence.bannername = caption;
  fs.writeFile('./config.json', JSON.stringify(db, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
  message.style.display = "block";
  delay(2000).then(() => {
    message.style.display = "none"; 
  })
}