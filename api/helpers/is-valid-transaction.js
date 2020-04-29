const BigNumber = require('bignumber.js');
const { operator, chargeAmount } = require('@utils/config');

module.exports = {
  friendlyName: 'Is valid transaction',
  description: 'check charge detail whether valid',
  inputs: {
    transaction: {
      description: '交易详情',
      type: {},
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.'
    }
  },
  sync: true,
  fn(inputs, exits) {
    const res = inputs.transaction;
    const data = res.data;
    const { dest, amount, succ, type } = data;
    const isPayment = type === 'Payment';
    const { value, currency, issuer } = amount || {};
    const isSuccess = succ === 'tesSUCCESS';
    const isDest = dest === operator().address;
    const isValidAmount =
      new BigNumber(value).eq(chargeAmount) &&
      currency === 'SWTC' &&
      issuer === '';
    exits.success(isSuccess && isDest && isValidAmount && isPayment);
  }
};
