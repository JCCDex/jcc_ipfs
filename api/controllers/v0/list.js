const getFolder = require('@utils/path').getFolder;
const ipfs = require('@utils/ipfs');

module.exports = {
  friendlyName: 'List',
  description: 'Query all datas with given address from ipfs.',
  inputs: {
    address: {
      description: '钱包地址',
      type: 'string',
      required: true
    }
  },
  exits: {},
  async fn({ address }) {
    try {
      sails.helpers.isValidAddress(address);
      const files = await ipfs.files.ls(getFolder(address));
      const results = [];
      for await (const file of files) {
        const datas = await ipfs.get(file.cid);
        for await (data of datas) {
          const content = [];
          for await (const chunk of data.content) {
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
      }
      return {
        status: sails.config.globals.responseStatus.success.status,
        results
      };
    } catch (error) {
      sails.log(`fetch ${address} list error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status
      };
    }
  }
};
