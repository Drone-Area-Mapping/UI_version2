const path = require("path");
const net = require("net");
const server = require("./server/server");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    title: "Drone Area Mapping",
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  win.removeMenu();
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const sendCommand = (string) => {
  const client = new net.Socket();
  client.connect(1337, "127.0.0.1", function () {
    console.log("Connected");
    client.write(string);
  });

  client.on("data", (data) => {
    console.log("Received: " + data);
    client.destroy();
  });

  client.on("close", () => {
    console.log("Connection closed");
  });
};

ipcMain.on("sample", () => {
  sendCommand("start");
});
