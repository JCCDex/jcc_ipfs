const ExplorerFactory = require('jcc_rpc').ExplorerFactory;

const explorerInst = ExplorerFactory.init(['https://swtcscan.jccdex.cn']);

module.exports = explorerInst;
