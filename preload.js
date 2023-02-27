const { ipcRenderer, contextBridge } = require("electron");

const apiOptions = {
  notificationApi: {
    sendNotifications(message) {
      ipcRenderer.send("notify", message);
    },
  },
};

contextBridge.exposeInMainWorld("electron", apiOptions);
