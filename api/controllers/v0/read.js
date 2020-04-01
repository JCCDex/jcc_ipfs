const ipfs = require('@utils/ipfs');

module.exports = {
  friendlyName: 'Read',
  description: 'Read data with given hash from ipfs.',
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
      const files = await ipfs.get(hash);
      const results = [];
      for await (file of files) {
        const content = [];
        for await (const chunk of file.content) {
          content.push(chunk);
        }
        const res = JSON.parse(content.toString());
        results.push({
          data: res.data,
          md5: res.md5,
          size: res.size,
          name: res.name,
          sign: {
            md5: res.md5,
            size: res.size,
            name: res.name,
            timestamp: res.timestamp
          },
          timestamp: res.timestamp,
          publickey: res.publickey
        });
      }
      return {
        success: true,
        results
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
