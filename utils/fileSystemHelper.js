// Electron Packages
const { dialog } = require("electron");

// Node js apis
const fs = require("fs");
const path = require("path");

// Utils
const { displayMessage } = require("./messageBoxHelper");

// Constants
const deploymentDestinationPath = "C:\\Users\\recod\\Desktop\\Temp\\target";
const productionBackUpPath = "C:\\Users\\recod\\Desktop\\Temp\\backup";

const fileSystemHelper = {
  async deployNewSeerFiles() {
    try {
      const { canceled, filePaths: folderPaths } = await openFileExplorer(
        "Select SEER code to deploy"
      );

      // if (!canceled) return folderPaths[0]; // only one folder path is allowed to be selected
      if (!canceled) {
        const [isTransferSuccesful, message] = transferSeerFiles(
          folderPaths[0],
          deploymentDestinationPath
        );

        if (isTransferSuccesful) displayMessage(message, ["OK"]);
        else displayMessage(`An error has occured: ${message}.`, ["OK"]);
      } else {
        displayMessage("No folder has been selected", ["OK"]);
      }

      return "Canceled";
    } catch (error) {
      console.log(error);
    }
  },
};

function openFileExplorer(title) {
  const dialogOptions = {
    title,
    properties: ["openDirectory"],
  };
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog(dialogOptions)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

function transferSeerFiles(sourcePath, destinationPath) {
  const hasSeerProjectFiles = containsSeerCode(sourcePath);
  if (!hasSeerProjectFiles)
    return [false, "Folder Does not contain files for SEER production."];

  const [backupSuccessful, message] = createBackUp(
    sourcePath,
    productionBackUpPath
  );
  if (!backupSuccessful) return [false, message];

  copyDirectory(sourcePath, destinationPath);

  return [true, "Transfer Complete"];
}

function containsSeerCode(folderPath) {
  const filesToFind = [
    "favicon-32x32.png",
    "Global.asax",
    "Icon.png",
    "package.json",
    "packages.config",
    "Web.config",
  ];

  const containsSeerFiles = containsDesiredFiles(folderPath, filesToFind);

  const foldersToFind = [
    "App_Browsers",
    "assets",
    "bin",
    "Content",
    "fonts",
    "Img",
    "Models",
    "Rotativa",
    "Scripts",
    "Views",
  ];

  const containsSeerFolders = containsDesiredFolders(folderPath, foldersToFind);

  if (!containsSeerFiles || !containsSeerFolders) return false;

  return true;
}

function containsDesiredFiles(folderPath, files) {
  let filePath;

  for (let file of files) {
    filePath = `${folderPath}\\${file}`;

    if (!fs.existsSync(filePath)) return false;
  }

  return true;
}

function containsDesiredFolders(folderPath, folders) {
  let combinedFolderPath;

  for (const desiredFolder of folders) {
    combinedFolderPath = folderPath + "/" + desiredFolder;

    if (!fs.existsSync(combinedFolderPath)) return false;
  }

  return true;
}

function createBackUp(sourceFolder, backUpFolder) {
  try {
    const timestamp = Date.now();
    const sourceFolderCopy = path.join(backUpFolder, `${timestamp}`);

    fs.mkdirSync(sourceFolderCopy);

    copyDirectory(sourceFolder, sourceFolderCopy);

    return [true, "success"];
  } catch (e) {
    return [false, e.message];
  }
}

function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const currentSource = path.join(source, file);
    const currentTarget = path.join(target, file);

    if (fs.lstatSync(currentSource).isDirectory()) {
      copyDirectory(currentSource, currentTarget);
    } else {
      fs.copyFileSync(currentSource, currentTarget);
    }
  }
}

module.exports = fileSystemHelper;
