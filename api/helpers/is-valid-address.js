const Keypair = require('@swtc/keypairs').Keypairs;

module.exports = {
  friendlyName: 'Is valid address',
  description: 'whether address is valid',
  inputs: {
    address: {
      description: '钱包地址',
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'jingtum address',
      outputDescription: 'jingtum address'
    },
    invalidAddress: {
      description: 'address is invalid'
    }
  },
  sync: true,
  fn(inputs, exits) {
    const { address } = inputs;
    if (!Keypair.isValidAddress(address)) {
      throw 'invalidAddress';
    }
    return exits.success();
  }
};
