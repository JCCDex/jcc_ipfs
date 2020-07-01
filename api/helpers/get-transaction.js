const explorerInst = require('../../utils/explorer');

module.exports = {
  friendlyName: 'Get transaction',
  description: '获取交易详情',
  inputs: {
    hash: {
      description: '交易hash',
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Transaction'
    }
  },
  async fn(inputs) {
    const { hash } = inputs;
    const uuid = hash;
    try {
      const res = await explorerInst.orderDetail(uuid, hash);

      if (!res.result) {
        throw new Error(res.msg);
      }

      return res;
    } catch (error) {
      throw error;
    }
  }
};
