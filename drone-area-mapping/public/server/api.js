const client = require("./client");
const { ipcMain } = require("electron");

const createCommand = (name, value) => {
  const obj = {
    name: name,
    value: value,
  };

  return JSON.stringify(obj);
};

ipcMain.on("startProcessing", () => {
  const command = createCommand("start", 1);

  client.sendCommand(command);
});

ipcMain.on("stopProcessing", () => {
  const command = createCommand("start", 0);

  client.sendCommand(command);
});

ipcMain.on("exportProcessing", () => {
  const command = createCommand("export", 1);

  client.sendCommand(command);
});
