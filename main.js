const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  ipcMain.handle("launch-game", (e, data) => {
    mainWindow.loadFile("screens/gameScreen/game.html");
    mainWindow.webContents.on("did-finish-load", () => {
      mainWindow.webContents.send("send-save-data", data);
    });
  });

  ipcMain.handle("exit-to-title", () => {
    mainWindow.loadFile("screens/titleScreen/titleScreen.html");
  });

  // and load the index.html of the app.
  mainWindow.loadFile("screens/titleScreen/titleScreen.html");
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
