'use strict';

/**
 * Namespace Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

function splitName(n) {
  return n.split('.');
}

/*
* proceed the leaf node
* @param obj {Object} extended object
* @param n {String} child key in the object
* @param initIt {Boolean} whether encapsluate the undefined to {}
* */
function getExtendibleLeaf(obj, n, initIt) {
  const v = obj[n];
  if (v && typeof v === 'object') {
    return v;
  }
  if (initIt && v === undefined) { // undefined return null object
    return (obj[n] = {});
  }
}

// judge frozen status
function isFrozen(obj) {
  if (obj && typeof obj === 'object') {
    return Object.isFrozen(obj);
  }
  return false;
}

// get the child element
function getChild(data, ns) {
  if (ns.length === 1) {  // monolayer
    return data[ns[0]]; // return first elements
  }
  let obj = data[ns[0]];
  if (obj === undefined) return obj;
  let i = 1;
  const end = ns.length - 1;
  for (; i < end; i++) { // traverse the es object
    obj = getExtendibleLeaf(obj, ns[i], false); // recurisve leaf
    if (obj === undefined) return obj;
  }
  return obj[ns[i]];
}

// initialize the children elements
/*
* @param data {object} input object data
* @param ns {Array}
* */
function initChild(data, ns) {
  if (ns.length === 1) {
    const ret = getExtendibleLeaf(data, ns[0], true);
    if (ret === undefined) {
      throw new TypeError('fail to init because namespace ' + ns[0] + ' = ' + data[ns[0]]);
    }
    return ret;
  }
  let parent = data;
  if (isFrozen(parent)) {
    throw new TypeError('Can\'t add property ' + ns[0] + ', object is not extensible');
  }
  let obj = data[ns[0]];
  if (obj === undefined) obj = data[ns[0]] = {};
  for (let i = 1; i < ns.length; i++) { // traverse all child node belong to ns array
    const n = ns[i];
    const ret = getExtendibleLeaf(obj, n, true);
    if (ret === undefined) { // no child nocde
      throw new TypeError('fail to init because namespace ' + ns.join('.') + ' = ' + obj + '(' + (typeof obj) + ')');
    }
    parent = obj; // recursive to child node
    if (isFrozen(parent)) { // detect frozen status
      throw new TypeError('Can\'t add property ' + n + ', object is not extensible');
    }
    obj = ret; // child node pass value to obj
    if (parent[n] === undefined) {
      throw new TypeError('fail to init because namespace ' + ns.slice(0, i).join('.') + ' = ' + parent);
    }
  }
  return obj;
}

// traverse the leaf and fallten all leaf node
function getLeafs(obj, seen) {
  // eslint-disable-next-line
  seen = seen || [];
  const keys = [];
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const i in obj) { // travser object
      const c = obj[i];
      if (c) {
        if (typeof c === 'object') { // case object
          if (seen.indexOf(c) !== -1) continue;
          seen.push(c);
          if (Array.isArray(c)) {
            keys.push(i);
          }
        } else {
          keys.push(i);
        }
        const childKeys = getLeafs(c, seen); // check the leaf node
        for (let j = 0; j < childKeys.length; j++) {
          keys.push(i + '.' + childKeys[j]);
        }
      } else {
        keys.push(i);
      }
    }
  }
  return keys; // flatten all leafs to array
}

exports.splitName = splitName;
exports.getExtendibleLeaf = getExtendibleLeaf;
exports.getChild = getChild;
exports.initChild = initChild;
exports.getLeafs = getLeafs;
