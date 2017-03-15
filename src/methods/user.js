"use strict";

import validator from 'validator';


module.exports = function(done){
    $.method('user.add').check({
        name: {required: true, validate: (v) => validator.isLength(v, {min: 4, max: 20})},
        email: {required: true, validate: (v) => validator.isEmail(v)},
        password: {required: true, validate: (v)=> validator.isLength(v, {min: 6})}
    });
    $.method('user.add').register(async function(params, callback){
        
    });

    done();
};
