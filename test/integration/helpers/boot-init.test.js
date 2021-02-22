//var request = require('supertest');
//var assert = require('assert');
//var config = require('../../config.js');

//var url = config.url || sails.hooks.http.app;

describe('bootInit (helpers)', function () {
  this.timeout(45000);
  describe('#sails.helpers.bootInit()', () => {
    it('test helpers bootInit', async () => {
      let test;
      let _rs = await sails.helpers.bootInit();
      console.log('test:', _rs);
      //assert.equal(String(ledger_index),_rs.ledger_index)
    });
  });
});
