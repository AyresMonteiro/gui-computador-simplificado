const {app, BrowserWindow} = require('electron');

/**
 *  Uncomment these lines to able the auto-reload. 
*/
// require("electron-reload")(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`),
// });

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    resizable: false,
    height: 600,
    frame: false
  });

  win.loadFile('index.html');
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
});
