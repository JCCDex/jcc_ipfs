const JCCExchange = require('jcc_exchange').JCCExchange;
const { operator, spareOperator } = require('../../../utils/config');
const operatorAccount = operator();
const assistAccount = spareOperator();

JCCExchange.init(
  [
    'http://39.104.188.146:50333',
    'http://58.243.201.56:5050',
    'http://47.74.51.71:50333',
    'http://39.98.243.77:50333'
  ],
  0
);

module.exports = {
  friendlyName: 'Charge',
  description: '充值',
  inputs: {
    hash: {
      description: '交易hash',
      type: 'string',
      required: true
    }
  },
  exits: {},
  async fn({ hash }) {
    try {
      const res = await sails.helpers.getTransaction(hash);
      const isValid = sails.helpers.isValidTransaction(res);
      if (!isValid) {
        return {
          status: sails.config.globals.responseStatus.error.status,
          message: 'The charge is invalid!'
        };
      }
      // time unit: second
      const { amount, time } = res.data;
      const { value } = amount;
      const { address, secret } = operatorAccount;
      const memo = (time + 946684800) * 1000 + 365 * 24 * 60 * 60 * 1000;
      // 返回hash不代表转账一定成功，正常情况下返回hash就表示转账是成功的，存在少数情况交易上链了但是转账失败
      // 理想状态应根据hash从链上获取交易详情
      const transHash = await JCCExchange.transfer(
        address,
        secret,
        value,
        memo.toString(),
        assistAccount.address,
        'SWT'
      );
      sails.log(
        `Charge success: the input value is ${hash}, and the transaction hash: `,
        transHash
      );
      return {
        status: sails.config.globals.responseStatus.success.status
      };
    } catch (error) {
      sails.log(`Charge error: the input value is ${hash}: `, error);

      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
