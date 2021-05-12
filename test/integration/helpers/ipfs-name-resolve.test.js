//var request = require('supertest');
//var assert = require('assert');
//var config = require('../../config.js');

//var url = config.url || sails.hooks.http.app;

describe('ipfsNameResolve (helpers)', function () {
  this.timeout(45000);
  describe('#sails.helpers.ipfsNameResolve()', () => {
    it('test helpers ipfsNameResolve', async () => {
      let _rs = await sails.helpers.ipfsNameResolve();
      console.log('test:', _rs);
      //assert.equal(String(ledger_index),_rs.ledger_index)
    });
  });
});
