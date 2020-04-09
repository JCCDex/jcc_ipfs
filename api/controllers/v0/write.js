const Path = require('path');
const ipfs = require('@utils/ipfs');

module.exports = {
  friendlyName: 'Write',

  description: 'Write a file or directory to ipfs.',

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
    path: {
      description: '文件路径',
      type: 'string',
      required: false
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

  async fn({ data, md5, size, name, sign, timestamp, publickey, path }) {
    try {
      sails.helpers.verify(data, md5, size, name, sign, timestamp, publickey);

      const address = sails.helpers.toAddress(publickey);
      const isValid = await sails.helpers.validateUser(address);
      sails.log(`${address} deposit is valid: `, isValid);
      if (!isValid) {
        return {
          status: sails.config.globals.responseStatus.lackoil.status
        };
      }

      let filePath;
      if (path) {
        filePath = Path.join('/', path, name);
      } else {
        filePath = Path.join('/', name);
      }

      // 向ipfs写文件
      await ipfs.files.write(
        filePath,
        Buffer.from(
          JSON.stringify({
            data,
            md5,
            size,
            name,
            sign,
            timestamp,
            publickey,
            // 保存写入文件路径
            path: filePath
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
      const stat = await ipfs.files.stat(filePath);
      return {
        status: sails.config.globals.responseStatus.success.status,
        result: [
          {
            transaction: stat.cid.toString()
          }
        ]
      };
    } catch (error) {
      sails.log(`${publickey} write error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status
      };
    }
  }
};
