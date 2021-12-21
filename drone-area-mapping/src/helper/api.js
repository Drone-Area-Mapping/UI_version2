import { channels } from '../shared/constants';

const { ipcRenderer } = require('electron');

export const sendCommand = (process, name, value) => {
    ipcRenderer.send(channels[process].SET_DATA, {
        name: name,
        value: value,
    })
}

export const getData = (process, value) => {
    ipcRenderer.send(channels[process].GET_DATA, {
        header: process,
        value: value,
    })
}