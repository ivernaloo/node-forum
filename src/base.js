"use strict";

import path from 'path';
import ProjectCore from 'project-core';
import Debug from 'debug';

const $ = global.$ = new ProjectCore();

// 创建Debug函数
$.createDebug = function (name) {
    return Debug('my:' + name);
};
const debug = $.createDebug('server');

$.init.add((done) => {
    $.config.load(path.resolve(__dirname, 'config.js'));
    const env = process.env.NODE_ENV.trim() || null;
    if(env){
        env.split(',').forEach(e => {
            debug('load env: %s', env);
            $.config.load(path.resolve(__dirname, '../config', e + '.js'));
        });
    }
    $.env = env;
    done();
});

$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'))
$.init.load(path.resolve(__dirname, 'models'));
$.init.load(path.resolve(__dirname, 'methods'));
$.init.load(path.resolve(__dirname, 'init', 'express.js'));
$.init.load(path.resolve(__dirname, 'middlewares'));
$.init.load(path.resolve(__dirname, 'routes'));

// 初始化limiter
$.init.load(path.resolve(__dirname, 'init', 'limiter.js'));
// 加载验证码
$.init.load(path.resolve(__dirname, 'init', 'captcha.js'));