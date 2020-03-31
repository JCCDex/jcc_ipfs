const Keypair = require('@swtc/keypairs').Keypairs;

const toAddress = (publicKey) => {
  return Keypair.deriveAddress(publicKey);
};

const verify = (message, signature, publicKey) => {
  return Keypair.verify(message, signature, publicKey);
};

module.exports = {
  toAddress,
  verify
};
