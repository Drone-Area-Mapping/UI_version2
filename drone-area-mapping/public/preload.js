const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  doThing: () => ipcRenderer.send("sample"),
});
