const Path = require('path');
const ipfs = require('@utils/ipfs');
const getPath = require('@utils/path').getPath;

module.exports = {
  friendlyName: 'Write',

  description: 'Write a file or directory to ipfs.',

  inputs: {
    data: {
      description: '上传数据',
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
      type: 'string',
      required: true
    },
    publicKey: {
      description: '公钥',
      type: 'string',
      required: true
    }
  },

  exits: {},

  async fn({ data, md5, size, sign, name, timestamp, publicKey, filePath }) {
    try {
      sails.helpers.verify(md5, size, filePath, timestamp, sign, publicKey);
      const address = sails.helpers.toAddress(publicKey);
      const isValid = await sails.helpers.validateUser(address);
      sails.log(`${address} is vip: `, isValid);
      if (!isValid) {
        return {
          status: sails.config.globals.responseStatus.lackoil.status
        };
      }
      let path = Path.parse(filePath);

      let newFilePath = getPath(address, filePath);
      newFilePath = getPath(newFilePath, name);
      // 向ipfs写文件
      await ipfs.files.write(
        newFilePath,
        Buffer.from(
          JSON.stringify({
            data,
            md5,
            size,
            timestamp,
            path: {
              ...path,
              filePath: filePath
            }
          })
        ),
        {
          truncate: true,
          parents: true,
          mode: '+rw',
          create: true
        }
      );

      // 获取stat
      const stat = await ipfs.files.stat(newFilePath);
      return {
        status: sails.config.globals.responseStatus.success.status,
        result: [
          {
            transaction: stat.cid.toString()
          }
        ]
      };
    } catch (error) {
      sails.log(`${publicKey} write error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
