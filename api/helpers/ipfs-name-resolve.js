const ipfs = require('../../utils/ipfs');
module.exports = {
  friendlyName: 'Ipfs name resolve',

  description: 'get ipfs cid of ipns resolve ',

  inputs: {
    ipns_value: {
      description: 'ipns value',
      type: 'string',
      defaultsTo: sails.config.custom.IPNS.value
    }
  },

  exits: {
    success: {
      description: 'All done.'
    }
  },

  fn: async function (inputs) {
    const addr = '/ipns/' + inputs.ipns_value;
    let name;
    for await (name of ipfs.name.resolve(addr)) {
      sails.log.verbose(name);
      // /ipfs/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm
    }
    return name;
  }
};
