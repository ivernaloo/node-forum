"use strict";

import mongoose from 'mongoose';

module.exports = function (done){
    const conn = mongoose.creatConnection($.config.get('db.mongodb'))
    $.mongodb = conn;

    done(); // async
};