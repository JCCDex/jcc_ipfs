const Keypair = require('@swtc/keypairs').Keypairs;

const toAddress = (publicKey) => {
  return Keypair.deriveAddress(publicKey);
};

const verify = (message, signature, publicKey) => {
  return Keypair.verify(message, signature, publicKey);
};

const isValidAddress = (address) => {
  return Keypair.isValidAddress(address);
};

module.exports = {
  toAddress,
  verify,
  isValidAddress
};
