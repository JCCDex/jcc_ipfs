const Path = require('path');

const ROOT_PATH = '/jpass/';

const IPNS_KEY =
  '/ipns/k2k4r8kgh5g54wt86gywt5vvi48he4vet2mdj0mh7ihg41ki6v18k2uj/';

const getFolder = (address) => {
  return ROOT_PATH + address;
};

const getPath = (address, filePath) => {
  const rootPath = getFolder(address);
  let newFilePath = Path.join(rootPath, filePath);
  //window下转斜杠
  newFilePath = newFilePath.replace(/\\/g, '/');
  return newFilePath;
};

const getIPNSPath = (address, filePath) => {
  const rootPath = IPNS_KEY + address;
  let newFilePath = Path.join(rootPath, filePath);
  //window下转斜杠
  newFilePath = newFilePath.replace(/\\/g, '/');
  return newFilePath;
};

module.exports = {
  getPath,
  getFolder,
  ROOT_PATH,
  getIPNSPath
};
