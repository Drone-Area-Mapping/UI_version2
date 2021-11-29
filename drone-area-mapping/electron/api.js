const { ipcMain, dialog } = require("electron"); // Load the required electron modules
const { channels } = require('../src/shared/constants'); // Channel list for the IPC renderer/main socket process

// Simulated data
const data = {
    processing: {

    },
    capturing: {
        battery: 50,
        storage: 90,
        imageAmount: 150,
        connected: true
    }
};

// Subscribe to the GET_DATA channel and handle incoming GET requests
ipcMain.on(channels.GET_DATA, (event, arg) => {
    const { header, value } = arg; // Get the header and value object from arg

    event.sender.send(channels.GET_DATA, data[header][value]); // Send the requested data back to the client
});

// Subscribe to the SET_DATA channel and handle incoming GET requests
ipcMain.on(channels.SET_DATA, (event, arg) => {
    const { name, value } = arg; // Get the command name and the requested value from arg

    console.log(`Hey there! You sent the command ${name} with the value: ${value}`); // Log the requested command to the console for now
});

// When the open-file-dialog is called, fire the native select directory window from electron
ipcMain.on('open-file-dialog', (event, arg) => {
    // Open the openDirectory native window
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(filepath => { //Fires when closed
        if (filepath) event.sender.send(arg, filepath); // If filepath is not null, send the selected filepath back to the client
    }).catch(err => console.log(err)) // Log the errors
})