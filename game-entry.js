import { app, BrowserWindow, screen, } from 'electron'

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    x: width - 800,
    y: height - 600,
    transparent: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
  })

  mainWindow.loadURL('http://localhost:8000/')
  // mainWindow.webContents.openDevTools()
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
