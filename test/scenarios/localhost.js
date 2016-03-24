var assert = require('chai').assert;
var request = require('request-promise');

var server = require('../utils/server');


describe('live requests', function() {
  before(function() {
    server.listen(8585);
  });

  it('passes', function() {
    assert(true);
  });

  it('requests localhost', function(done) {
    return request('http://localhost:8585')
      .then(function(html) {
        assert(true);
        done();
      });
  });
});
