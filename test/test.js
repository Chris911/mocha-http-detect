import { assert } from 'chai';
import mocha from './utils/runner.js';


describe('Mocha live detect', function() {
  describe('without live calls', function() {
    mocha('./test/scenarios/no_live.js -R tap --require dist/index.js');

    it('does not log any live request', function() {
      assert.include(res.out, 'Hostnames requested');
      assert.include(res.out, '    none');
      assert.notInclude(res.out, 'Live requests');
    })
  });

  describe('with local calls', function() {
    mocha('./test/scenarios/localhost.js -R tap --require dist/index.js');

    it('does not log any live request', function() {
      assert.include(res.out, 'Hostnames requested');
      assert.include(res.out, '    none');
      assert.notInclude(res.out, 'Live requests');
    })
  });

  describe('with live calls', function() {
    mocha('./test/scenarios/live_requests.js -R tap --require dist/index.js');

    it('logs live call in test', function() {
      assert.include(res.out, 'Live requests');
      assert.include(res.out, '* http://www.isup.me/');
      assert.include(res.out, '* https://status.github.com/');
    });

    it('logs all hostnames', function() {
      assert.include(res.out, 'Hostnames requested:');
      assert.include(res.out, 'www.isup.me: 1');
      assert.include(res.out, 'tatus.github.com: 1');
    });
  });
});
