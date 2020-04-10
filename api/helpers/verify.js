const Keypair = require('@swtc/keypairs').Keypairs;
const MD5 = require('blueimp-md5');

module.exports = {
  friendlyName: 'Verify',
  description: 'Verify signature and md5',
  inputs: {
    md5: {
      description: '上传数据md5',
      type: 'string',
      required: true
    },
    size: {
      description: '文件大小',
      type: 'string',
      required: true
    },
    filePath: {
      description: '文件路径',
      type: 'string',
      required: true
    },
    sign: {
      description: '签名',
      type: 'string',
      required: true
    },
    timestamp: {
      description: '时间戳',
      type: 'number',
      required: true
    },
    publicKey: {
      description: '公钥',
      type: 'string',
      required: true
    }
  },
  exits: {
    invalidSignature: {
      description: 'signature is invalid'
    },
    invalidMd5: {
      description: 'md5 is invalid'
    },
    success: {
      description: 'md5 and signature are valid'
    }
  },
  sync: true,
  fn(inputs, exits) {
    const { md5, size, name, timestamp, sign, publicKey } = inputs;
    // if (MD5(data) !== md5) {
    //   throw 'invalidMd5';
    // }
    try {
      if (!Keypair.verify(md5 + size + name + timestamp, sign, publicKey)) {
        throw 'invalidSignature';
      }
    } catch (error) {
      sails.log(error);
      throw 'invalidSignature';
    }
    return exits.success();
  }
};
