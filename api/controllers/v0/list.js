module.exports = {
  friendlyName: 'List',
  description: 'Query all datas with given address from ipfs.',
  inputs: {
    address: {
      description: '钱包地址',
      type: 'number',
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
