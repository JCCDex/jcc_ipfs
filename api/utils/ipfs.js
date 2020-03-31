const ipfsHttpClient = require('ipfs-http-client');

module.exports = ((IpfsHttpClient) => {
  let ipfs = null;
  if (ipfs === null) {
    ipfs = IpfsHttpClient({
      host: 'localhost',
      port: '9095',
      protocol: 'http'
    });
  }
  return ipfs;
})(ipfsHttpClient);
