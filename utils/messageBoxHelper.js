const { dialog, BrowserWindow } = require("electron");

const displayMessage = (message, buttons, type = "none") => {
  const parentWindow = BrowserWindow.getFocusedWindow();

  let options = {
    message,
    type,
    buttons,
  };
  dialog.showMessageBoxSync(parentWindow, options);
};

module.exports = {
  displayMessage,
};
