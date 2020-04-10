const ipfsHttpClient = require('ipfs-http-client');

module.exports = ((IpfsHttpClient) => {
  let ipfs = null;
  if (ipfs === null) {
    ipfs = IpfsHttpClient({
      host: '111.229.222.136',
      port: '9095',
      protocol: 'http'
    });
  }
  return ipfs;
})(ipfsHttpClient);
