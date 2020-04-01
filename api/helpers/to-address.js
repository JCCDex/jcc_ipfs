const Keypair = require('@swtc/keypairs').Keypairs;

module.exports = {
  friendlyName: 'To address',
  description: 'convert public key to address',
  inputs: {
    publickey: {
      description: '公钥',
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'jingtum address',
      outputDescription: 'jingtum address'
    },
    invalidPublickey: {
      description: 'public key is invalid'
    }
  },
  sync: true,
  fn(inputs, exits) {
    const { publickey } = inputs;
    try {
      exits.success(Keypair.deriveAddress(publickey));
    } catch (error) {
      sails.log(error);
      throw 'invalidPublickey';
    }
  }
};
