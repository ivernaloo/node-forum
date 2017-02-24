'use strict';

require('mocha');
var path = require('path'); // 路径
var assert = require('assert'); // 断言库
var cwd = require('memoize-path')(__dirname); // 记录路径
var Benchmarked = require('..');
var benchmarked;

var fixtures = cwd('fixtures'); // 固件
var code = cwd('code'); // 代码

describe('benchmarked', function() {  // benchmarked
  beforeEach(function() { // 预制垫片
    benchmarked = new Benchmarked({cwd: cwd()});  // 加载目录
  });

  it('should export a function', function() {
    assert.equal(typeof Benchmarked, 'function'); // function
  });

  it('should instantiate', function() {
    assert(benchmarked instanceof Benchmarked); // 实例检测
  });

  it('should instantiate without new', function() {
    assert(Benchmarked() instanceof Benchmarked); // 实例检测
  });

  it('should add fixtures to `fixtures.files', function() {
    benchmarked.addFixtures('*.txt', {cwd: fixtures()});  // 加入添加的素材
    assert(benchmarked.fixtures.files.length > 0);
  });

  it('should add code to `code.files', function() { // benchmarked测试
    benchmarked.addCode('*.js', {cwd: code()}); // 加入benchmarked测试函数
    assert(benchmarked.code.files.length > 0);
  });
});
