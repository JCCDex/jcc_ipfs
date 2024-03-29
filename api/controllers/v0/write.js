const Path = require('path');
const ipfs = require('../../../utils/ipfs');
const ipfsCluster = require('../../../utils/cluster');
const { ROOT_PATH, getPath } = require('../../../utils/path');

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

  async fn({ data, md5, size, sign, timestamp, publicKey, filePath }) {
    let newFilePath;
    try {
      sails.helpers.verify(md5, size, filePath, timestamp, sign, publicKey);
      const address = sails.helpers.toAddress(publicKey);
      const isValid = await sails.helpers.validateUser(address);
      sails.log(Date(), ` ${address} is vip: `, isValid);
      if (!isValid) {
        return {
          status: sails.config.globals.responseStatus.lackoil.status
        };
      }
      let path = Path.parse(filePath);

      newFilePath = getPath(address, filePath);
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

      const rootStat = await ipfs.files.stat(ROOT_PATH);
      await ipfsCluster.pin.add(rootStat.cid, {
        name: sails.config.custom.IPNS.key + '-' + Date.now()
      });
      await ipfs.name.publish(rootStat.cid, {
        key: sails.config.custom.IPNS.key
      });

      // 获取stat
      const stat = await ipfs.files.stat(newFilePath);
      sails.log(Date(), ` write ${newFilePath} success`);
      return {
        status: sails.config.globals.responseStatus.success.status,
        result: [
          {
            transaction: stat.cid.toString()
          }
        ]
      };
    } catch (error) {
      newFilePath = newFilePath || publicKey;
      sails.log(Date(), ` ${newFilePath} write error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status,
        message: error.message
      };
    }
  }
};
