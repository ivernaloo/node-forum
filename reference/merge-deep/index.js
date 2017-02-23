/*!
 * merge-deep <https://github.com/jonschlinkert/merge-deep>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function mergeDeep(orig, objects) {
  if (!utils.isObject(orig) && !Array.isArray(orig)) {
    orig = {};
  }

  var target = utils.clone(orig);
  var len = arguments.length;
  var idx = 0;

  while (++idx < len) { // 游标移动
    var val = arguments[idx]; // 对应的参数

    if (utils.isObject(val) || Array.isArray(val)) {
      merge(target, val); // 对象或数组时拷贝
    }
  }
  return target;
};

// 浅拷贝
function merge(target, obj) {  // 把target合并到obj上
  for (var key in obj) {  // 遍历所有的属性
    if (!hasOwn(obj, key)) { // 检测有没有属性值
      continue;
    }

    var oldVal = obj[key];
    var newVal = target[key];

    if (utils.isObject(newVal) && utils.isObject(oldVal)) { // 现在原来的值都是对象
      target[key] = merge(newVal, oldVal);  // 直接合并
    } else if (Array.isArray(newVal)) {
      target[key] = utils.union([], newVal, oldVal); // 数组合并?
    } else {
      target[key] = utils.clone(oldVal);  // 简单复制
    }
  }
  return target;
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
