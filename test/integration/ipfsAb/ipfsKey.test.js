const ipfsHttpClient = require('ipfs-http-client');

let clientApi = {
  host: '192.168.66.19',
  port: '9095',
  protocol: 'http'
};
/**
 * 测试ipfs可以创建的文件夹文件数量
 */

var custKey = '';

describe('ipfs key', function () {
  this.timeout(4500000);
  describe('#ipfs key()', () => {
    it('gen:', async () => {
      let time = Date.now();
      let ipfs = ipfsHttpClient(clientApi);
      for (let i = 0; i < 1; i++) {
        //let content = { time: Date.now(), seq: i};
        let newFilePath = time.toString() + i;
        //console.log(i,':',newFilePath )
        const key = await ipfs.key.gen(newFilePath, {
          type: 'rsa',
          size: 2048
        });
        console.log(key);
      }
    });

    it('list:', async () => {
      let ipfs = ipfsHttpClient(clientApi);
      const keys = await ipfs.key.list('1614157085226');
      let n = keys.length - 1;
      console.log(keys, keys[n]);
      custKey = keys[n].name;
    });

    it.skip('export:', async () => {
      let ipfs = ipfsHttpClient(clientApi);
      console.log(custKey);
      const pem = await ipfs.key.export('self', 'password');
      console.log(pem);
    });
  });
});
