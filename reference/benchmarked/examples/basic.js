'use strict';

var Suite = require('..');
var suite = new Suite({
  fixtures: 'fixtures/*.txt',
  code: 'code/*.js',
  cwd: __dirname
});

suite.run();

