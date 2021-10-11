const find = require('find-process');

function onLoad () {
    var discordFind = document.getElementById("discord-find")
    find('name', 'Discord.exe', true)
    .then(function (list) {
        console.log(list)
        if(list.length > 0) {
            discordFind.innerHTML = "🟢 - Discord Found"
            discordFind.style.color = "#00FF49";
        } else {
            discordFind.innerHTML = "🔴 - Discord Not Found"
            discordFind.style.color = "red";
        }
    });
}

onLoad();