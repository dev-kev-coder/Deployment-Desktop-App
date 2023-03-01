// Electron Packages
const { dialog } = require("electron");

const fileSystemHelper = {
  async deployNewSeerFiles() {
    const selectedFolder = await openFileExplorer(); // this line awaits for the promise to resolve or reject
    console.log(selectedFolder);
  },
};

const openFileExplorer = () => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

module.exports = fileSystemHelper;
