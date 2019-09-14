// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const Store = require('electron-store');
const store = new Store();
let win = require('electron').remote.getCurrentWindow()

const isDark = function(){
    if(store.get('isDarkMode')){
        return false;
    }
}

ipcRenderer.on('darkModeChanges', function () {
    isDark();
})