const net = require('net');
const { ipcMain, webContents, app } = require('electron');
const { channels } = require('../src/shared/constants');
const port = 1337;

// Create the server
const server = net.createServer();

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
        .forEach((wc) => wc.send(channels.GET_DATA, chunk.toString()));
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

  ipcMain.on(channels.SET_DATA, (event, arg) =>
    client.write(`${JSON.stringify(arg)}\n`)
  );
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    server.close(() => console.log('TCP server closed'));
    server.unref();
  }
});
