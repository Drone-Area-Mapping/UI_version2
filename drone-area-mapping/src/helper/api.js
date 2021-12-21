import { channels } from '../shared/constants';

const { ipcRenderer } = require('electron');

export const sendCommand = (process, name, value) => {
    ipcRenderer.send(channels[process].SET_DATA, {
        name: name,
        value: value,
    })
}