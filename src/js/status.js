const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

function CheckStatus() {
    if(db.status == true){
        if(document.getElementById("console-page")){
            console.log("console PAGE");
            return;
        } else {
            rpc.setActivity({
                details: db.Rich_Presence.details,
                state: db.Rich_Presence.state,
                largeImageKey: db.Rich_Presence.file_bannername.toLowerCase(),
                largeImageText: db.Rich_Presence.bannername,
                instance: false
            })
        }
    } else {
        console.log(false);
        return;
    }
}

CheckStatus()

function StatusOn() {

}

find('name', 'Discord.exe', true)
.then(function (list) {
    if(list.length > 0) {
        rpc.login({ clientId: db.Client_Id }).then(() => {
            console.log('Signed in')
        }).catch((err) => {
            console.log(err)
        });
    } else {
        console.log("no discord")
        return;
    }
});