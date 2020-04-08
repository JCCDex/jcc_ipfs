const ipfs = require('@utils/ipfs');
const getPath = require('@utils/path').getPath;

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
  async fn({ data, md5, size, name, sign, timestamp, publickey, hash }) {
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

      const chunks = [];
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      const res = JSON.parse(chunks.toString());
      const path = getPath(address, name);
      // 若文件名发生变化，返回错误信息
      if (res.path !== path) {
        return {
          status: sails.config.globals.responseStatus.error.status
        };
      }
      // 向ipfs写文件
      await ipfs.files.write(
        res.path,
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
            path: res.path
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
      const stat = await ipfs.files.stat(path);
      return {
        status: sails.config.globals.responseStatus.success.status,
        result: [
          {
            transaction: stat.cid.toString()
          }
        ]
      };
    } catch (error) {
      sails.log(`update ${hash} error: `, error);
      return {
        status: sails.config.globals.responseStatus.error.status
      };
    }
  }
};
