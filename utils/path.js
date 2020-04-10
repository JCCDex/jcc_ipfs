const Path = require('path');

const getFolder = (address) => {
  return '/jpass/' + address;
};

const getPath = (address, filePath) => {
  const rootPath = getFolder(address);
  let newFilePath = Path.join(rootPath, filePath);
  //window下转斜杠
  newFilePath = newFilePath.replace(/\\/g, '/');
  return newFilePath;
};

module.exports = {
  getPath,
  getFolder
};
