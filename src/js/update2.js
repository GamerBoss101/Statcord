const uaup = require('uaup-js');


//This is Optional
const defaultStages = {
    Launch: "Launching..." // When Launching the Application.
};

const updateOptions = {
    gitRepo: "Electron-App", // [Required] Your Repo Name
    gitUsername: "GamerBoss101",  // [Required] Your GitHub Username.

    appName: "eletron-app", //[Required] The Name of the app archive and the app folder.
    appExecutableName: "eletron-app.exe", //[Required] The Executable of the Application to be Run after updating.

    progressBar: document.getElementById("download"), // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
    label: document.getElementById("download-label"), // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
    stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
};

uaup.Update(updateOptions);