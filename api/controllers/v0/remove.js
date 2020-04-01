const ipfs = require('@utils/ipfs');
module.exports = {
  friendlyName: 'Remove',
  description: 'Remove data with given hash from ipfs.',
  inputs: {
    hash: {
      description: '交易hash',
      type: 'string',
      required: true
    }
  },
  exits: {},
  async fn({ hash }) {
    try {
      const chunks = [];
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      const res = JSON.parse(chunks.toString());
      await ipfs.files.rm(res.path);
      return {
        success: true
      };
    } catch (error) {
      sails.log(error);
      return {
        success: false,
        msg: error.message
      };
    }
  }
};
