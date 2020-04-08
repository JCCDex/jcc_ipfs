const BigNumber = require('bignumber.js');
const explorerInst = require('@utils/explorer');

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
    const limit = 1;
    const dest = '';
    const currency = 'SWTC';
    const uuid = address;
    const page = 0;
    const size = 100;
    const type = 'Send';
    // 获取到指定钱包指定币种充值记录
    const res = await explorerInst.getHistory(uuid, address, page, size, {
      type,
      otherWallet: dest,
      currency
    });

    if (!res.result) {
      throw new Error(res.msg);
    }

    // 总的充值数量
    const total = res.data.list
      .map((data) => data.amount.value)
      .reduce((total, amount) => new BigNumber(total).plus(amount).toNumber());
    exits.success(new BigNumber(total).isGreaterThanOrEqualTo(limit));
  }
};
