const ipfsHttpClient = require('ipfs-http-client');

let clientApi = {
  host: '192.168.66.19',
  port: '9095',
  protocol: 'http'
};
/**
 * 测试ipfs可以创建的文件夹文件数量
 */
describe('ipfs read and write ab test', function () {
  this.timeout(4500000);
  describe('#ipfs read and write ab test()', () => {
    it('write:', async () => {
      let time = Date.now();
      let ipfs = ipfsHttpClient(clientApi);
      for (let i = 0; i < 10000; i++) {
        let content = { time: Date.now(), seq: i };
        let newFilePath = '/test/' + time + i;
        //console.log(i,':',newFilePath )
        await ipfs.files.write(
          newFilePath,
          Buffer.from(
            JSON.stringify({
              content
            })
          ),
          {
            truncate: true,
            parents: true,
            mode: '+rw',
            create: true
          }
        );
      }

      //let ls = await ipfs.files.ls;
    });
    it('mkdir:', async () => {
      let ipfs = ipfsHttpClient(clientApi);
      let time = Date.now();
      for (let i = 0; i < 100; i++) {
        //let content = { time: Date.now(), seq: i};
        let newFilePath = '/test/' + time + i;
        console.log(i, ':', newFilePath);
        await ipfs.files.mkdir(newFilePath, {
          parents: true
        });
      }
      //let ls = await ipfs.files.ls;
    });

    it.skip('ls:', async () => {
      let ipfs = ipfsHttpClient(clientApi);
      let sum = 0;
      for await (const file of ipfs.files.ls('/test')) {
        console.log(file.name);
        sum += 1;
      }
      console.log('sum:', sum);
    });

    it.only('read:', async () => {
      const chunks = [];
      let ipfs = ipfsHttpClient(clientApi);

      await ipfs.files.write(
        '/test/1613978396565149',
        Buffer.from(
          JSON.stringify({
            content: 'test'
          })
        ),
        {
          truncate: true,
          parents: true,
          mode: '+rw',
          create: true
        }
      );

      for await (const chunk of ipfs.files.read('/test/1613978396565149')) {
        console.log(chunk.toString());
        //chunks.push(chunk)
      }

      //console.log(uint8ArrayConcat(chunks).toString())
      //console.log(chunks)
    });
  });
});
