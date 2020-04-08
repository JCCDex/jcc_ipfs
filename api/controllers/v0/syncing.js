const ipfs = require('@utils/ipfs');

module.exports = {
  friendlyName: 'Syncing',

  description: 'Syncing from ipfs.',

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
      const stat = await ipfs.files.stat(res.path);
      stat.cid = stat.cid.toString();
      return {
        status: sails.config.globals.responseStatus.success.status,
        results: [stat]
      };
    } catch (error) {
      sails.log(`syncing ${hash} error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status
      };
    }
  }
};
