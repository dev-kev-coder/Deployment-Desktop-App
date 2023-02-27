const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

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

ipcMain.on("notify", (event, message) => {
  const options = { title: "Notification", body: message };
  const notification = new Notification(options);
  notification.show();
});

app.whenReady().then(createWindow);
