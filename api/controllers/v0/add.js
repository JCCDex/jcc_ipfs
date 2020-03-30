module.exports = {
  friendlyName: 'Add',

  description: 'Add a file or directory to ipfs.',

  inputs: {},

  exits: {},

  async fn(inputs) {
    console.log(inputs);
    return {
      success: true
    };
  }
};
