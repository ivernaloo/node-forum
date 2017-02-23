'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

require('arr-union', 'union');  // union方法
require('clone-deep', 'clone'); // 深拷贝
require('kind-of', 'typeOf');   // 类别判断
require = fn;

utils.isObject = function(val) {  // 判断是否是对象
  return utils.typeOf(val) === 'object' || utils.typeOf(val) === 'function';
};

/**
 * Expose `utils` modules
 */

module.exports = utils;

