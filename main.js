// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron') ;
const path = require('path');
const ipc = require('electron').ipcMain;
const Store = require('electron-store');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('app.html');

  mainWindow.setMenu(null);

  // Open the DevTools.;
  mainWindow.webContents.openDevTools();

  // Init the Electron file storage utility
  Store.initRenderer();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


ipc.on('invokeAction', (event, data) => {
  console.log("Got IPC message!");
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
