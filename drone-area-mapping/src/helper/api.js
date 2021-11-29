import { channels } from '../shared/constants';

const { ipcRenderer } = require('electron');

export const sendCommand = (name, value) => {
    ipcRenderer.send(channels.SET_DATA, {
        name: name,
        value: value,
    })
}