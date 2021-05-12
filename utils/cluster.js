const ipfsCluster = require('ipfs-cluster-api');

module.exports = ((ipfsCluster) => {
  let cluster = null;
  if (cluster === null) {
    cluster = ipfsCluster(sails.config.custom.ipfs.clusterApi);
    //   {
    //   host: '192.168.66.16',
    //   port: '9094',
    //   protocol: 'http'
    // });
  }
  return cluster;
})(ipfsCluster);
