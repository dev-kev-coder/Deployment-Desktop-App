// Electron
const { ipcRenderer, contextBridge } = require("electron");

const apiOptions = {
  seerApi: {
    async deploySeer() {
      ipcRenderer.send("deploySeer");
      const data = await listenForEventAndResolve("fileSelected");
      return data;
    },
    revertSeer() {},
    nuclearOption() {},
  },

  sqlServerApi: {},
};

// Wraps listener in a promise in order to resolve it in react
function listenForEventAndResolve(eventType) {
  return new Promise((resolve, reject) => {
    ipcRenderer.on(eventType, (event, data) => {
      resolve(data);
    });
  });
}

contextBridge.exposeInMainWorld("electron", apiOptions);
