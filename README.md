# mocha-live-detect

Detect live HTTP requests in your test suite.

![screenshot](http://i.imgur.com/00QZZlh.png)

## Description

mocha-live-detect allows developers to report live HTTP requests in test suites. As project grows, tests and dependencies become hard to manage and some test might unwillingly call external services slowing down tests and making them less reliable. By reporting live requests, this module helps identifying specific tests that might require stubbing calls external services.

## Usage

Install via NPM as a dev dependency:

`$ npm i --save-dev mocha-live-detect`

Run tests using the `--require flag`:

`$ mocha --require mocha-live-detect test.js`
