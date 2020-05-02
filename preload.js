// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const path = require('path')
const fs = require('fs-extra')

const { ipcRenderer } = require('electron')
let win = require('electron').remote.getCurrentWindow()

const isDark = function(){
    var got = null;
    if(got === 'isDarkMode'){
        return false;
    }
}

ipcRenderer.on('darkModeChanges', function () {
    isDark();
})