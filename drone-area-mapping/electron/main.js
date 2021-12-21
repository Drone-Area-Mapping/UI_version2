// Electron imports
const path = require('path'); // Check the current path of the project
const { app, BrowserWindow } = require('electron'); // Load the required electron modules
const isDev = require('electron-is-dev'); // Module to check whether we are in the dev environment or not

// Separate script section
require('./tcpServerStitching'); // Import the TCP socket server for stitching, and run it separately
require('./tcpServerTelemetry'); // Import the TCP socket server for tracking telemetry, and run it separately
require('./api'); // Import the API for communicating with our front-end client (React js in this case)

// Create a new window, our app window
const createWindow = () => {
  // Create a new Browser Window
  const win = new BrowserWindow({
    title: 'Drone Area Mapping',
    width: 1280,
    height: 720,
    icon: '../build/icon.ico',
    webPreferences: {
      nodeIntegration: true, // ! Settings this to true will enable interaction with NodeJS modules
      contextIsolation: false,
    },
  });

  win.removeMenu(); // Remove the menu bar

  // Get the current URL of the app, if it's in development, grab the localhost url, otherwise, select the index.html file in the build folder
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // If the app is in development, enable the devtools for the client
  if (isDev) win.webContents.openDevTools({ mode: 'detach' });
};

// When the app is ready create the window
app.whenReady().then(createWindow);

// When all windows are closed quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// If no window is generated, create the main app window
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
