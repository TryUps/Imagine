'use strict';

const { app, BrowserWindow, electron } = require('electron')
const path = require('path'),
      url = require('url'),
      fs = require('fs-extra')

let win

const createWin = () => {
    win = new BrowserWindow({
        backgroundColor: '#000',
        titleBarStyle: 'hiddenInset',
        useContentSize: false,
        transparent: false,
        title: app.getName(),
        show: false,
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
            nodeIntegration: true,
            webviewTag: true,
            experimentalFeatures: true,
            backgroundThrottling: false
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname,'system','index.html'),
        protocol: 'file',
        slashes: true
      }))
    
    app.commandLine.appendArgument("--enable-features=Metal")

    win.webContents.openDevTools({mode: 'undocked'})

    win.webContents.on('dom-ready', () => {
        return false;
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', function () {
        win = null
    })
}

app.whenReady().then(createWin)

app.on("browser-window-created", function(e, window) {
    return window.setMenu(null)
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        return app.quit()
    }
})
  
app.on('activate', function () {
    if (win === null) {
        return createWin()
    }
})
  