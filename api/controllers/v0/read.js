const { getIPNSPath } = require('../../../utils/path');
const fetch = require('../../../utils/fetch');

module.exports = {
  friendlyName: 'Read',
  description: 'Read data with given filePath from ipfs.',
  inputs: {
    filePath: {
      description: '文件路径',
      type: 'string',
      required: true
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
      sails.helpers.isValidAddress(address);
      const newFilePath = getIPNSPath(address, filePath);
      const file = await fetch.get(newFilePath);
      if (this.req.method === 'GET') {
        return file.data;
      }
      return {
        status: sails.config.globals.responseStatus.success.status,
        file
      };
    } catch (error) {
      sails.log(`read ${filePath} error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
