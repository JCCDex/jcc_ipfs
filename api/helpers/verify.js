const Keypair = require('@swtc/keypairs').Keypairs;
const MD5 = require('blueimp-md5');

module.exports = {
  friendlyName: 'Verify',
  description: 'Verify signature and md5',
  inputs: {
    data: {
      description: '所要上传数据',
      type: 'string',
      required: true
    },
    md5: {
      description: '上传数据md5',
      type: 'string',
      required: true
    },
    size: {
      description: '文件大小',
      type: 'number',
      required: true
    },
    name: {
      description: '文件名称',
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
    publickey: {
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
    const { data, md5, size, name, sign, timestamp, publickey } = inputs;

    if (MD5(data) !== md5) {
      throw 'invalidMd5';
    }

    try {
      if (!Keypair.verify(md5 + size + name + timestamp, sign, publickey)) {
        throw 'invalidSignature';
      }
    } catch (error) {
      sails.log(error);
      throw 'invalidSignature';
    }
    return exits.success();
  }
};
