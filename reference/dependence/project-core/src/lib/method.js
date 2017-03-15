'use strict';

/**
 * project-core method
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

import escapeStringRegexp from 'escape-string-regexp';
import utils from './utils';
const debug = utils.debug('method');

export class Method {

  constructor(name) {
    this.name = name || null;
    this._fn = null;
    this._before = [];
    this._after = [];
    this._check = null;
  }

  _wrap(fn) {

    if (typeof fn !== 'function') {
      throw new TypeError(`argument must be a function`);
    }

    const wrap = function (params, callback) {
      debug(' - run - %s %s at %s', fn.__type, fn.__name, fn.__sourceLine);
      return fn(params, callback);
    };
    wrap.__sourceLine = fn.__sourceLine;
    wrap.__type = fn.__type;
    wrap.__name = fn.__name = this.name;
    return wrap;

  }

  check(options = null) {
    debug('method.check: %j at %s', options, utils.getCallerSourceLine());
    this._check = options;
  }

  register(fn) {
    fn.__type = 'main';
    fn.__sourceLine = utils.getCallerSourceLine();
    debug('method.register: %s at %s', this.name, fn.__sourceLine);
    this._fn = this._wrap(fn);
    return this;
  }

  before(fn) {
    fn.__type = 'before';
    fn.__sourceLine = utils.getCallerSourceLine();
    debug('method.before: %s at %s', this.name, fn.__sourceLine);
    this._before.push(this._wrap(fn));
    return this;
  }

  after(fn) {
    fn.__type = 'after';
    fn.__sourceLine = utils.getCallerSourceLine();
    debug('method.after: %s at %s', this.name, fn.__sourceLine);
    this._after.push(this._wrap(fn));
    return this;
  }

  call(_params, cb) {
    return new Promise((resolve, reject) => {

      const params = utils.deref(_params);

      let isCallback = false;
      const callback = (err, result) => {
        if (isCallback) {
          debug('call: multi callback(err=%s)', err);
        } else {
          isCallback = true;
          process.nextTick(() => {
            if (err) {
              reject(err);
              cb && cb(err);
            } else {
              resolve(result);
              cb && cb(null, result);
            }
          });
        }
      };

      try {
        if (this._check) {
          for (const n in this._check) {
            if (this._check[n].required && !(n in params)) {
              return callback(utils.missingParameterError(n));
            }
          }
          for (const n in params) {
            if (this._check[n] && this._check[n].validate && !this._check[n].validate(params[n])) {
              return callback(utils.invalidParameterError(n));
            }
          }
        }
      } catch (err) {
        return callback(err);
      }

      const list = [].concat(this._before, this._fn, this._after);
      debug('method.call: %s handlers=%s', this.name, list.length);

      const next = (err, result) => {

        if (err) return callback(err);
        if (isCallback) return callback(new Error('has been callback'));

        const fn = list.shift();
        if (!fn) return callback(null, result);

        let isPromise = false;
        let r = null;

        try {
          r = fn(result, (err, ret) => {
            if (isPromise) return callback(new Error(`please don't use callback in an async function`));
            next(err, ret);
          });
          isPromise = utils.isPromise(r);
        } catch (err) {
          return callback(err);
        }

        if (isPromise) {
          r.then(ret => next(null, ret))
           .catch(next);
        }

      };

      if (this._fn === null) {
        return callback(new TypeError(`please register a handler for method ${this.name}`));
      } else {
        return next(null, params);
      }

    });
  }

}

export class MethodManager {

  constructor() {
    this._method = new Map();
  }

  method(name) {
    return this._method.get(name) || this._newMethod(name);
  }

  _newMethod(name) {
    let method;
    if (name.indexOf('*') === -1) {
      method = new Method(name);
      this._method.set(name, method);
    } else {
      const pattern = escapeStringRegexp(name).replace(/\\[*]/g, '(.*?)');
      const re = new RegExp('^' + pattern + '$');
      const filterMethod = () => {
        const list = [];
        for (const k of this._method.keys()) {
          if (re.test(k)) {
            list.push(this._method.get(k));
          }
        }
        return list;
      };
      method = {
        before(fn) {
          filterMethod().forEach(m => m.before(fn));
        },
        after(fn) {
          filterMethod().forEach(m => m.after(fn));
        },
        register(fn) {
          throw new Error('register method does not support wildcards');
        },
      };
    }
    return method;
  }

}