# mocha-http-detect [![Build Status](https://travis-ci.org/Chris911/mocha-http-detect.svg?branch=master)](https://travis-ci.org/Chris911/mocha-http-detect) [![npm version](https://badge.fury.io/js/mocha-http-detect.svg)](https://badge.fury.io/js/mocha-http-detect)

Detect live HTTP requests in your test suite.

![screenshot](http://i.imgur.com/00QZZlh.png)

## Description

`mocha-http-detect` allows developers to report live HTTP requests in test suites. As a project grows, tests and dependencies can become difficult to manage. As a result, some tests might unwillingly call external services and in turn slow down tests and/or making them less reliable. By reporting live requests, this module identifies tests that might require stubbing calls to external services.

## Usage

Install via NPM as a dev dependency:

`$ npm i --save-dev mocha-http-detect`

Run tests using the `--require flag`:

`$ mocha --require mocha-http-detect test.js`
