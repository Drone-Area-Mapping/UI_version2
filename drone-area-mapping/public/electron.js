const path = require('path');
const net = require('net');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    title: "Drone Area Mapping",
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    },
  });

  win.removeMenu();
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const server = net.createServer(function (socket) {
  socket.on('end', () => console.log('Client disconnected 😔'));
  socket.on('data', (data) => console.log(`You sent the following: ${data}`));
  socket.write('Echo server\r\n');
});

server.listen(1337, '127.0.0.1');
