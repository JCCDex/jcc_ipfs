const ipfs = require('../../../utils/ipfs');
const getPath = require('../../../utils/path').getPath;
module.exports = {
  friendlyName: 'Remove',
  description: 'Remove data with given filePath from ipfs.',
  inputs: {
    filePath: {
      description: '文件路径',
      type: 'string',
      required: false
    },
    address: {
      description: '钱包地址',
      type: 'string',
      required: true
    }
  },
  exits: {},
  async fn({ filePath, address }) {
    try {
      // sails.helpers.verify('', '', filePath, timestamp, sign, publicKey);
      // 获取stat
      // const address = sails.helpers.toAddress(publicKey);
      sails.helpers.isValidAddress(address);
      const newFilePath = getPath(address, filePath);
      await ipfs.files.rm(newFilePath, { recursive: true });
      return {
        status: sails.config.globals.responseStatus.success.status
      };
    } catch (error) {
      sails.log(`remove ${address} ${filePath} error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
