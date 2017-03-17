"use strict";

import validator from 'validator';

module.exports = function(done){

    // add validator
    $.method('user.add').check({
        name: {required: true, validate: (v) => validator.isLength(v, {min: 4, max: 20 }) && /^[a-zA-z]/.test(v)},
        email: {required: true, validate: (v) => validator.isEmail(v)},
        password: {required: true, validate: (v) => validator.isLength(v, {min: 6})}
    });

    // register method
    $.method('user.add').register(async function(params, callback){

        params.name = params.name.toLowerCase(); // convert the params
        {
            const user = await $.method('user.get').call({name: params.name}); // detect name whether be used
            if (user) return callback(new Error(`user ${params.name} already exists`));
        }
        {
            const user = await $.method('user.get').call({email: params.email}); // detect email whether be used
            if (user) return callback(new Error(`user ${params.email} already exists`));
        }

        params.password = $.utils.encryptPassword(params.password.toString());
        const user = new $.model.User(params);
        user.save(callback);

    });

    $.method('user.get').register(async function(params, callback){})

    done();
};