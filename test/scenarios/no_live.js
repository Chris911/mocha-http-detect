const assert = require('chai').assert;

describe('no live requests', function() {
  it('passes', function() {
    assert(true);
  });

  it('passes (async)', function(done) {
    setTimeout(done, 1);
  });
});
