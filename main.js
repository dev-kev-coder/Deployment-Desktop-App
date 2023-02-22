const { app, BrowserWindow } = require("electron");

const createDesktopWindow = () => {
  const options = {
    width: 800,
    height: 600,
  };
  const window = new BrowserWindow(options);
  window.loadFile("index.html");
};

const runApplication = () => {
  createDesktopWindow();

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createDesktopWindow();
  });
};

app.whenReady().then(runApplication);
