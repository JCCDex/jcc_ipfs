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
      const chunks = [];
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      const results = [];
      const result = JSON.parse(chunks.toString());
      const files = await ipfs.files.read(result.path);
      for await (const file of files) {
        const res = JSON.parse(file.toString());
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
