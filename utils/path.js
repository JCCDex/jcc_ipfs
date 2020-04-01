const getFolder = (address) => {
  return '/jpass/' + address;
};

const getPath = (address, name) => {
  return getFolder(address) + '/' + name;
};

module.exports = {
  getPath,
  getFolder
};
