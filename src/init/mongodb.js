"use strict";

import mongoose from 'mongoose';

module.exports = function (done){
    $.mongodb = mongoose.createConnection($.config.get('db.mongodb')); // 连接实例绑定到project-core上面
    $.mongodb.on('error', console.error.bind(console, 'connection error:'));
    $.mongodb.once('open', function() {
        // we're connected!
        console.log("mongodb connected")
    });
    
    done(); // async
};