const DiscordRPC = require('discord-rpc');
const fs = require('fs');
const config = require('./config.json');
require('colors');

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
rpc.config = config;

//Creating a start- and endTimestamp for the initial timer
var d1 = new Date ();
var d2 = new Date(d1);
// Adding Epochs to set the timer
d2.setSeconds(d1.getSeconds() + config.Rich_Presence.countdown_start);

//Fancy banner for in the console...
var banner = `
______ _                       _           ____________  _____ 
|  _  (_)                     | |          | ___ \\ ___ \\/  __ \\
| | | |_ ___  ___ ___  _ __ __| |  ______  | |_/ / |_/ /| /  \\/
| | | | / __|/ __/ _ \\| '__/ _\` | |______| |    /|  __/ | |    
| |/ /| \\__ \\ (_| (_) | | | (_| |          | |\\ \\| |    | \\__/\\
|___/ |_|___/\\___\\___/|_|  \\__,_|          \\_| \\_\\_|     \\____/
                                                               
`;

rpc.on('ready', () => {
	console.clear();
	console.log(banner.green);
	console.log("Setting RPC activity...".cyan);

	//TODO Probably add enable/disable options in config.json

	const json = {
		"Client_Id": "896551646308499537",
		"Client_Secret": "c_Jc1EIPUVJUEBGGo_eY-dzR1U5XnKtK",
		"Rich_Presence":{
			"details": "I am Studing",
			"state": "Brain Hurt",
			"username": "SirBlob",
			"file_username": "study",
			"bannername": "Studing . .",
			"file_bannername": "study",
			"maxpartysize": 1,
			"countdown_start": 3600, 
			"Refresh": false,
			"Refresh_time": 50,
			"button":{
				"label": "Click ME!",
				"url": "http://get.insultsite.tk/"
			}
		},
		"Dont_Touch":{
			"updatecounter": 2
		}
	}

	let data = JSON.stringify(json, null, 2);
	fs.writeFile("test.json", data, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	}); 
	
	//Sets the initial Rich Presence
	rpc.setActivity({
		details: config.Rich_Presence.details,
		state: config.Rich_Presence.state,
		largeImageKey: config.Rich_Presence.file_bannername,
		largeImageText: config.Rich_Presence.bannername,
		// smallImageKey: config.Rich_Presence.file_username,
		smallImageText: config.Rich_Presence.username,
		instance: false,
		// partySize: 0,
		// partyMax: config.Rich_Presence.maxpartysize,
		startTimestamp: d1,
		endTimestamp: d2,
		buttons: [{
			label: config.Rich_Presence.button.label,
			url: config.Rich_Presence.button.url
		}]
	}).then(console.clear(), console.log(banner), console.log(`RPC has been set! If it doesn’t set immediately please wait for it to refresh (if set) or just re-node app.js`.cyan)).catch(err => { });
	
	if (config.Rich_Presence.Refresh) {
		// Activity can only be set every 15 seconds
		setInterval(() => {
		//Create random party size every update
		var partysize = Math.floor(Math.random() * (config.Rich_Presence.maxpartysize - 0 + 1)) + 0;
		//Resetting the timer
		var t1 = new Date();
		var t2 = new Date ( t1 );
		t2.setSeconds(t1.getSeconds() + config.Rich_Presence.countdown_start);
		//Setting the activity again with updated values	
		rpc.setActivity({
			details: config.Rich_Presence.details,
			state: config.Rich_Presence.state,
			largeImageKey: config.Rich_Presence.file_bannername,
			largeImageText: config.Rich_Presence.bannername,
			// smallImageKey: config.Rich_Presence.file_username,
			smallImageText: config.Rich_Presence.username,
			instance: false,
			// partySize: partysize,
			// partyMax: config.Rich_Presence.maxpartysize,
			endTimestamp: d2,
			buttons: [{
				label: config.Rich_Presence.button.label,
				url: config.Rich_Presence.button.url
			}]
		}).then(console.clear(), console.log(banner), console.log(`Updated the RPC ${++config.Dont_Touch.updatecounter} time(s)!`.white)).catch(err => {});
	  }, (config.Rich_Presence.Refresh_time * 1000));
	}
});
rpc.login({ clientId: config.Client_Id, clientSecret: config.Client_Secret }).catch(console.error);