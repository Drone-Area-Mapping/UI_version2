const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  startProcessing: () => ipcRenderer.send("startProcessing"),
  stopProcessing: () => ipcRenderer.send("stopProcessing"),
  exportProcessing: () => ipcRenderer.send("exportProcessing"),
});
