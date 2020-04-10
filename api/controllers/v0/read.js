const ipfs = require('@utils/ipfs');
const getPath = require('@utils/path').getPath;

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
      const newFilePath = getPath(address, filePath);
      const files = await ipfs.files.read(newFilePath);
      const results = [];
      for await (const file of files) {
        results.push(file);
      }
      let file = JSON.parse(Buffer.concat(results).toString());
      if (this.req.method === 'GET') {
        return file.data;
      }
      return {
        status: sails.config.globals.responseStatus.success.status,
        file: file
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
