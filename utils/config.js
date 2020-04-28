/**
 * 运营商
 * @return {{address: string 钱包地址, secret: string 密钥}}
 */
const operator = () => {
  return {
    address: 'j4M4AoSi522XxNpywfyBahmjzQihc4EegL',
    secret: 'sa9UcyBBD3A3JU3Ux3ZKcbNCxVw9h'
  };
};

/**
 * 辅助运营商
 * @return {{address: string 钱包地址}}
 */
const spareOperator = () => {
  return {
    address: 'jHDbFiFZ6rfDjhfRnhD1ReCwY2erhpiYBS'
  };
};

const chargeAmount = 1000; //用户充值金额

module.exports = {
  operator,
  spareOperator,
  chargeAmount
};
