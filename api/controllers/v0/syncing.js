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

  async fn(inputs) {
    // All done.
    console.log(inputs);

    return;
  }
};
