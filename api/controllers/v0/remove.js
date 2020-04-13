const ipfs = require('@utils/ipfs');
const getPath = require('@utils/path').getPath;
module.exports = {
  friendlyName: 'Remove',
  description: 'Remove data with given filePath from ipfs.',
  inputs: {
    filePath: {
      description: '文件路径',
      type: 'string',
      required: false
    },
    timestamp: {
      description: '时间戳',
      type: 'number',
      required: true
    },
    sign: {
      description: '签名',
      type: 'string',
      required: true
    },
    publicKey: {
      description: '公钥',
      type: 'string',
      required: true
    }
  },
  exits: {},
  async fn({ filePath, timestamp, sign, publicKey }) {
    try {
      sails.helpers.verify('', '', filePath, timestamp, sign, publicKey);
      // 获取stat
      const address = sails.helpers.toAddress(publicKey);
      const newFilePath = getPath(address, filePath);
      await ipfs.files.rm(newFilePath, { recursive: true });
      return {
        status: sails.config.globals.responseStatus.success.status
      };
    } catch (error) {
      sails.log(`remove ${filePath} error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
