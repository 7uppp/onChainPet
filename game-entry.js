import { app, BrowserWindow } from 'electron'

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
  })

  mainWindow.loadURL('http://localhost:8000/')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS('::-webkit-scrollbar { display: none; }')
  })


  //hide title bar when unfocused
  mainWindow.on('blur', () => {
    mainWindow.setBackgroundColor('#00000000')
  })

  //hide title bar when focused
  mainWindow.on('focus', () => {
    mainWindow.setBackgroundColor('#00000000')
  })

}

app.whenReady().then(createWindow)

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
