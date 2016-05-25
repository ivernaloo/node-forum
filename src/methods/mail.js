"use strict";

import nodemailer from 'nodemailer';

module.exports = function(done){

    $.smtp = nodemailer.createTransport($.config.get('smtp'), {
        from: $.config.get('smtp.auth.user'),
    });

    $.method('mail.send').check({
        to: {required: true},
        subject: {required: true},
        html: {required: true},
    });

    $.method('mail.send').register(function (params, callback){

        $.smtp.sendMail(params, callback);
    });

    $.method('mail.send').call({
        to: 'x@zhoup.com',
        subject: '我的邮件',
        html: '<h1>什么什么</h1>'
    }, console.log);

    done();
};