"use strict";


import Redis from 'ioredis';

module.exports = function(done){

    const debug = $.createDebug('init:limiter'); // 调试日志

    const connection = new Redis($.config.get('limiter.redis'));// 连接Redis
    const prefix = $.config.get('limiter.redis.prefix');
    $.limiter = {connection}; // 全局记录

    $.limiter.incr = async function (key, limit){
        let ret = await connection.incr(prefix + key);
        ret = Number(ret);
        debug('incr: key=%s, counter=%s', key, ret);
        if (isNaN(ret)) return false;
        if (ret > limit) return false;
        return true;
    };

    done();
};