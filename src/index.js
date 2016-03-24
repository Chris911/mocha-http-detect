import chalk from 'chalk';
import { EventEmitter } from 'events';
import http from 'http';
import { inherits } from 'util';
import Mocha from 'mocha';

const hostnames = {};
let testRequests = [];

/**
 * Returns indent for pretty printing.
 * @param  {integer} size - indent size in spaces
 * @return {string} the indent string
 */
function indent(size) {
  let indentStr = '';
  let _size = size;
  while (_size > 0) {
    indentStr += ' ';
    _size--;
  }
  return indentStr;
}

/**
 * Prints full requests URL seen in test.
 */
function printTestRequest() {
  console.log(chalk.yellow(`${indent(6)} Live requests: `));

  testRequests.forEach(request => {
    console.log(chalk.yellow(`${indent(8)} * ${request}`));
  });
}

/**
 * Print requested hostnames summary.
 */
function printHostnames() {
  console.log(chalk.yellow.bold(`${indent(2)} Hostnames requested: `));

  if (Object.keys(hostnames).length === 0) {
    console.log(chalk.yellow(`${indent(4)}none`));
    return;
  }

  for (const key in hostnames) {
    if (!hostnames[key]) return;
    console.log(chalk.yellow(`${indent(4)}${key}: ${hostnames[key]}`));
  }
}

/**
 * Patch mocha to display recording requests during individual tests and at
 * the end of the test suite.
 */
function patchMocha() {
  const _testRun = Mocha.Test.prototype.run;

  Mocha.Test.prototype.run = function (fn) {
    function done(ctx) {
      fn.call(this, ctx);

      if (testRequests.length) {
        printTestRequest(testRequests);
        testRequests = [];
      }
    }

    return _testRun.call(this, done);
  };

  const _run = Mocha.prototype.run;

  Mocha.prototype.run = function(fn) {
    function done(failures) {
      printHostnames(hostnames);
      fn.call(this, failures);
    }

    return _run.call(this, done);
  };
}

/**
 * Get the hostname from an HTTP options object.
 * Supports multiple types of options.
 * @param  {object} httpOptions
 * @return {string} the hostname or "Unknown" if not found.
 */
function getHostname(httpOptions) {
  if (httpOptions.uri && httpOptions.uri.hostname) {
    return httpOptions.uri.hostname;
  } else if (httpOptions.hostname) {
    return httpOptions.hostname;
  } else if (httpOptions.host) {
    return httpOptions.host;
  }
  return 'Unknown';
}

/**
 * Get the href from an HTTP options objet.
 * Supports multiple types of options.
 * @param  {object} httpOptions
 * @return {string} the hostname or "Unknown" if not found.
 */
function getHref(httpOptions) {
  if (httpOptions.uri && httpOptions.uri.href) {
    return httpOptions.uri.href;
  } else if (httpOptions.hostname && httpOptions.path) {
    return httpOptions.hostname + httpOptions.path;
  } else if (httpOptions.host && httpOptions.path) {
    return httpOptions.host + httpOptions.path;
  }
  return 'Unknown';
}

/**
 * Patch Node's HTTP client to record external HTTP calls.
 *   - All hostnames are stored in `hostname` with their count for the whole
 *     test suite.
 *   - Full request URLs are stores in `testRequests` and used to display
 *   	 recorded requests for individual tests.
 *   - Requests to localhost are ignored.
 */
function patchHttpClient() {
  const _ClientRequest = http.ClientRequest;

  function patchedHttpClient(options, done) {
    if (http.OutgoingMessage) http.OutgoingMessage.call(this);

    const hostname = getHostname(options);

    // Ignore localhost requests
    if (hostname.indexOf('127.0.0.1') === -1 && hostname.indexOf('localhost') === -1) {
      if (hostnames[hostname]) {
        hostnames[hostname]++;
      } else {
        hostnames[hostname] = 1;
      }

      testRequests.push(getHref(options));
    }

    _ClientRequest.call(this, options, done);
  }

  if (http.ClientRequest) {
    inherits(patchedHttpClient, _ClientRequest);
  } else {
    inherits(patchedHttpClient, EventEmitter);
  }

  http.ClientRequest = patchedHttpClient;

  http.request = function(options, done) {
    return new http.ClientRequest(options, done);
  };
}

patchHttpClient();
patchMocha();
