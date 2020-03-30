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
  async fn(inputs) {
    // All done.
    console.log(inputs);

    return;
  }
};
