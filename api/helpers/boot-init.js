const ipfs = require('../../utils/ipfs');

function isNil(obj) {
  //sails.log.info(obj)
  if (
    typeof obj === 'undefined' ||
    obj === null ||
    JSON.stringify(obj) === '{}'
  ) {
    return true;
  }
  var tmp = String(obj);
  if (tmp.length === 0) {
    return true;
  }

  return false;
}

module.exports = {
  friendlyName: 'Boot init',

  description: '',

  inputs: {},

  exits: {
    success: {
      description: 'All done.'
    }
  },

  fn: async function (inputs) {
    // TODO
    try {
      let rootPath = '/' + sails.config.custom.IPNS.key;
      let ipnsResolveCid = await sails.helpers.ipfsNameResolve();
      let filesStatCid;
      try {
        filesStatCid = await ipfs.files.stat(rootPath);
      } catch (err) {
        sails.log.info(new Date().toISOString(), rootPath, err);
      }
      // 没有设置ipns
      if (isNil(ipnsResolveCid)) {
        sails.log.info('ipns value is nil....');
        if (isNil(filesStatCid)) {
          sails.log.info(rootPath, 'cid is nil....');
        } else {
          sails.log.info(rootPath, 'cid is:', filesStatCid.cid);
          await ipfs.name.publish(filesStatCid.cid, {
            key: sails.config.custom.IPNS.key
          });
        }
        return true;
      }
      // 已经设置了ipns

      if (isNil(filesStatCid)) {
        sails.log.info(
          'ipns cid is:',
          ipnsResolveCid,
          rootPath,
          'cid is nil....'
        );
        await ipfs.files.cp(ipnsResolveCid, rootPath);
        return true;
      } else {
        sails.log.info(
          'ipns cid is:',
          ipnsResolveCid,
          rootPath,
          'cid is:',
          filesStatCid.cid
        );
        await ipfs.files.rm(rootPath, { recursive: true });
        await ipfs.files.cp(ipnsResolveCid, rootPath);
        return true;
      }
    } catch (err) {
      sails.log.info(new Date().toISOString(), err);
      return false;
    }
  }
};
