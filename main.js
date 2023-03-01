const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

// Utils
const fileSystemHelper = require("./utils/fileSystemHelper");

function createWindow() {
  const options = {
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavascript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  };
  const window = new BrowserWindow(options);

  window.loadFile("index.html");
}

ipcMain.on("deploySeer", (event) => {
  fileSystemHelper.deployNewSeerFiles();
});

app.whenReady().then(createWindow);
