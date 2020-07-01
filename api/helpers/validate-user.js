const explorerInst = require('../../utils/explorer');

module.exports = {
  friendlyName: 'Validate user',
  description: '验证钱包充值情况',
  inputs: {
    address: {
      description: '钱包地址',
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'All done.'
    }
  },
  async fn(inputs, exits) {
    const { address } = inputs;
    const uuid = address;
    // 获取到指定钱包指定币种充值记录
    const res = await explorerInst.fetchJPassInfo(uuid, address);

    if (!res.result) {
      throw new Error(res.msg);
    }

    const data = res.data;
    const vipState = 0;
    return exits.success(vipState === data);
  }
};
