module.exports = {
  friendlyName: 'Update',
  description: 'Update data to ipfs.',
  inputs: {
    hash: {
      description: '交易hash',
      type: 'string',
      required: true
    },
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
  exits: {},

  async fn(inputs) {
    // All done.
    console.log(inputs);

    return;
  }
};
