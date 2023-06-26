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
    const newFilePath = getIPNSPath(address, filePath);
    try {
      sails.helpers.isValidAddress(address);
      const file = await fetch.get(newFilePath);
      sails.log(`read ${newFilePath} success: `);
      if (this.req.method === 'GET') {
        return file.data;
      }
      return {
        status: sails.config.globals.responseStatus.success.status,
        file
      };
    } catch (error) {
      sails.log(`read ${newFilePath} error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
