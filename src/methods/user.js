"use strict";

import validator from 'validator';
import createDebug from  'debug';


module.exports = function (done) {
    // 创建Debug参数
    const debug = $.createDebug('method.user');
    debug('method.user...');

    // add validator
    $.method('user.add').check({
        name    : {required: true, validate: (v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-z]/.test(v)},
        email   : {required: true, validate: (v) => validator.isEmail(v)},
        password: {required: true, validate: (v) => validator.isLength(v, {min: 6})}
    });

    // register method
    $.method('user.add').register(async function (params) {
        params.name = params.name.toLowerCase(); // convert the params
        {
            const user = await $.method('user.get').call({name: params.name}); // detect name whether be used
            if (user) throw new Error(`user ${params.name} already exists`); // should return  null
        }
        {
            const user = await $.method('user.get').call({email: params.email}); // detect email whether be used
            if (user) throw new Error(`user ${params.email} already exists`);
        }

        params.password = $.utils.encryptPassword(params.password.toString());
        const user = new $.model.User(params);
        user.save();

        return user; // subsequent versions similar remove the return value, and need return the value by yourself
    });

    $.method('user.get').register(async function (params) {
        const query = {};

        if (params._id) {
            query._id = params._id;
        }
        else if (params.name) {
            query.name = params.name;
        } else if (params.email) {
            query.email = params.email;
        } else {
            throw new Error('missing parameter _id');
        }
        return $.model.User.findOne(query);
    });

    $.method('user.update').check({
        _id  : {validate: (v) => validator.isMongoId(v)},
        name : {validate: (v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-z]/.test(v)},
        email: {validate: (v) => validator.isEmail(v)}
    });
    $.method('user.update').register(async function (params) {

        const user = await $.method('user.get').call(params);

        if (!user) {
            throw new Error('user does not exists');
        }

        const update = {};
        if (params.name && user.name !== params.name) update.name = params.name;
        if (params.email && user.email !== params.email) update.email = params.email;
        if (params.password) update.password = params.password;
        if (params.nickname) update.nickname = params.nickname;
        if (params.about) update.about = params.about;

        return $.model.User.update({_id: user._id}, {$set: update});


    });
    done();
};