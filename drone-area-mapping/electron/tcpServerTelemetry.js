const net = require('net');
const { ipcMain, webContents, app } = require('electron');
const { channels } = require('../src/shared/constants');
const port = 1338;

// Create the server
const server = net.createServer();

// // On Windows Only...
// const { spawn } = require('child_process');
// const bat = spawn('cmd.exe');

// bat.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// bat.stderr.on('data', (data) => {
//   console.error(data.toString());
// });

// bat.on('exit', (code) => {
//   console.log(`Child exited with code ${code}`);
// });

// Listen to a port defined by the user
server.listen(port, () =>
    console.log(`TCP socket server up and running on port ${port} 🙉`)
);

server.on('connection', (client) => {
    console.log('A new connection has been established.');

    client.on('data', (chunk) => {
        if (chunk.toString() === 'exit') client.end();
        else
            webContents
                .getAllWebContents()
                .forEach((wc) => wc.send(channels.telemetry.GET_DATA, chunk.toString()));
    }); // Send the requested data back to the client);

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    client.on('end', () => {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    client.on('error', (err) => {
        console.log(`Error: ${err}`);
    });

    ipcMain.on(channels.telemetry.SET_DATA, (event, arg) =>
        client.write(`${arg.value}\n`)
    );
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        server.close(() => console.log('TCP server closed'));
        server.unref();
    }
});

const child = require('child_process').execFile;
const path = require('path')

const parentDir = path.resolve(process.cwd(), 'electron\\childProcesses\\run.bat');

child(parentDir, (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data.toString());
});