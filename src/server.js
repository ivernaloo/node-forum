"use strict";

import path from 'path';
import ProjectCore from 'project-core';

const $ = global.$ = new ProjectCore();

$.init.add((done) => {
    $.config.load(path.resolve(__dirname, 'config.js'));
    const env = process.env.NODE_ENV.trim() || null;
    if(env){
        $.config.load(path.resolve(__dirname, '../config', env + '.js'));
    }
    $.env = env;
    done();
});

$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'))
$.init.load(path.resolve(__dirname, 'models'));

$.init((err) => {
    if (err){
        console.error(err);
        process.exit(-1);
    } else {
        console.log('inited [env=%s]',$.env);
    }
})

