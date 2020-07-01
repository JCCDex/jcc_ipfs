const getPath = require('../../../utils/path').getPath;
const ipfs = require('../../../utils/ipfs');
const Path = require('path');

module.exports = {
  friendlyName: 'List',
  description: 'Query all datas with given address from ipfs.',
  inputs: {
    address: {
      description: '钱包地址',
      type: 'string',
      required: true
    },
    path: {
      description: '路径',
      type: 'string',
      required: false
    }
  },
  exits: {},
  async fn({ address, path }) {
    try {
      path = path || '';
      path = Path.join('/', path + '/').replace(/\\/g, '/');
      sails.helpers.isValidAddress(address);
      const newFilePath = getPath(address, path);
      const files = await ipfs.files.ls(newFilePath);
      const results = [];
      for await (const file of files) {
        let isDir = file.type === 1; //是否为目录
        let filePath = path + file.name + (isDir ? '/' : '');
        results.push({
          path: {
            ...Path.parse(filePath),
            filePath: filePath
          },
          size: file.size,
          isDir: isDir
        });
        sails.log(file);
      }
      return {
        status: sails.config.globals.responseStatus.success.status,
        files: results
      };
    } catch (error) {
      sails.log(`fetch ${address} list error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
