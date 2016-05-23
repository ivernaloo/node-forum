"use strict";


import Redis from 'ioredis';

module.exports = function(done){

    const debug = $.createDebug('init:limiter'); // 调试日志

    const connection = new Redis($.config.get('limiter.redis'));// 连接Redis
    const prefix = $.config.get('limiter.redis.prefix');
    $.limiter = {connection}; // 全局记录

    /*
    * key {string} 这里是个标识符，用来识别发贴的
    * limit {number} 限制发帖数目
    * */
    $.limiter.incr = async function (key, limit){
        let ret = await connection.incr(prefix + key); //redis的递增器，这个限制了只能发两个帖子? 这个是第小时只能发两个帖子
        ret = Number(ret);
        debug('incr: key=%s, counter=%s', key, ret);
        if (isNaN(ret)) return false;
        if (ret > limit) return false;
        return true;
    };

    $.limiter.reset = async function(key){
        debug('reset: key=%s', key);
        return connection.del(prefix + key);
    };
    done();
};