"use strict";


import mongoose from 'mongoose';

module.exports = function(done){
    
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    
    const User = new Schema({
        name : {type : String, unique: true},
        password : {type : String},
        nickname : {type: String}
    });

    $.mongodb.model('User', User); // models are dfined by passing a Schema instance to mongoose.model
                                   // define the mongodb schema
    $.model.User = $.mongodb.model('User');

    done();

};