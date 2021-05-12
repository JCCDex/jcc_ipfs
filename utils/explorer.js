const { JcExplorer, Factory } = require('jcc_rpc');

const fetch = require('jcc_rpc/lib/fetch').default;

JcExplorer.prototype.fetchJPassInfo = async function (uuid, address) {
  const url = this.getUrl() + '/sum/jpassword/get_my_info/' + uuid;
  const data = {
    method: 'get',
    url,
    params: {
      w: address
    }
  };
  const res = await fetch(data);
  return res;
};

const ExplorerFactory = Factory(JcExplorer);

let explorerInst;

if (process.env.NODE_ENV === 'development') {
  explorerInst = ExplorerFactory.init(sails.config.custom.ExplorerUrl);
} else {
  explorerInst = ExplorerFactory.init(['https://swtcscan.jccdex.cn']);
}

module.exports = explorerInst;
