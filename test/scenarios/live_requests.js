const assert = require('chai').assert;
const request = require('request-promise');

describe('live requests', function() {
  it('passes', function() {
    assert(true);
  });

  it('requests isup.me', function(done) {
    return request('http://www.isup.me')
      .then(function() {
        assert(true);
        done();
      });
  });

  it('requests github status', function(done) {
    return request('https://status.github.com')
      .then(function() {
        assert(true);
        done();
      });
  });
});
