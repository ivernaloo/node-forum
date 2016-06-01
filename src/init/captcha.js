"use strict";


import Redis from 'ioredis';

module.exports = function(done){

    const debug = $.createDebug('init:captcha'); // 调试日志

    const connection = new Redis($.config.get('captcha.redis'));// 连接Redis
    const prefix = $.config.get('captcha.redis.prefix');
    $.captcha = {connection}; // 全局记录

    /*
    * key {string} 这里是个标识符，用来识别发贴的
    * limit {number} 限制发帖数目
    * */
    $.captcha.generate = async function (data, ttl){
        const json = JSON.stringify(data);
        const code = Date.now() + '.' + $.utils.randomString(20);
        debug('generate: code=%s, json=%s', code, json);
        const key = prefix + code;
        await connection.setex(key, ttl, json); // 设置一个过期时间
        return code;
    };

    $.captcha.get = async function(code){
        const key = prefix + code;
        const json = await connection.get(key) // 从redis里面直接拿到数据
        debug('get: code=%s, json=%s', code, json);
        if (!json) return false;
        const data = JSON.parse(json);
        await connection.del(key);
        return data;
    };
    done();
};