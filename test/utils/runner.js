const spawn = require('child_process').spawn;

/*
 * test runner helper
 */
function runMocha(args, fn) {
  const child = spawn('./node_modules/.bin/mocha', args.split(' '));

  const result = {
    out: '',
    err: '',
    code: null,
  };

  child.stdout.on('data', function (data) {
    result.out += data;
  });

  child.stderr.on('data', function (data) {
    result.out += data;
  });

  child.on('close', function (code) {
    result.code = code;
    fn(result);
  });
}

/*
 * mocha test helper
 * Source: https://github.com/rstacruz/mocha-clean/blob/master/test/support/mocha.js

 *     mocha('-R tap example/failure.js');
 *
 *     it('works', function () {
 *       res.code
 *       res.out
 *       res.err
 *     });
 */

function mocha(args) {
  before(function(next) {
    runMocha(args, function (result) {
      global.res = result;
      next();
    });
  });
}

module.exports = mocha;
