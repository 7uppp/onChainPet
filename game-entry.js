import { app, BrowserWindow } from 'electron'


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  })



  mainWindow.loadURL('http://localhost:8000/')

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS('::-webkit-scrollbar { display: none; }')
  })
}



app.whenReady().then(createWindow)



app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
