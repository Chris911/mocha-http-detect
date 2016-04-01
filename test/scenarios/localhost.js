const assert = require('chai').assert;
const request = require('request-promise');

const server = require('../utils/server');


describe('live requests', function() {
  before(function() {
    server.listen(8585);
  });

  it('passes', function() {
    assert(true);
  });

  it('requests localhost', function(done) {
    return request('http://localhost:8585')
      .then(function() {
        assert(true);
        done();
      });
  });
});
