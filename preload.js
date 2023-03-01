const { ipcRenderer, contextBridge } = require("electron");

const apiOptions = {
  seerApi: {
    deploySeer() {
      ipcRenderer.send("deploySeer");
    },
    revertSeer() {},
    nuclearOption() {},
  },

  sqlServerApi: {},
};

contextBridge.exposeInMainWorld("electron", apiOptions);
