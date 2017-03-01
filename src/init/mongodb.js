"use strict";

import mongoose from 'mongoose';

module.exports = function (done){
    const conn = mongoose.creatConnection($.config.get('db.mongodb'));
    $.mongodb = conn; // con 连接实例绑定到project-core上面

    done(); // async
};