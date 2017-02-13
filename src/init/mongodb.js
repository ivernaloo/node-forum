'use strict';

/**
 * mongodb的连接文件
 */

import mongoose from 'mongoose';

module.exports = function (done) {

    const debug = $.createDebug('init:mongodb'); // 显示debug文件
    debug('connecting to MongoDB...');

    const conn = mongoose.createConnection($.config.get('db.mongodb')); // 拿到配置文件进行读取
    $.mongodb = conn;
    $.model = {};

    const ObjectId = mongoose.Types.ObjectId;

    $.utils.ObjectId = ObjectId;
    

    done();

}
