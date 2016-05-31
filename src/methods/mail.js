"use strict";

import fs from 'fs';
import path from 'path';
import rd from 'rd';
import ejs from 'ejs';
import nodemailer from 'nodemailer';

module.exports = function(done){

    $.smtp = nodemailer.createTransport($.config.get('smtp'), {
        from: $.config.get('smtp.auth.user'),
    });

    const templates = {};
    rd.eachFileFilterSync(path.resolve(__dirname, '../../email_templates'), /\.html$/, (f, s) => { // 读取目录下的邮件模板文件
        const name = path.basename(f, '.html'); // 拿到basename
        const html = fs.readFileSync(f).toString(); // 拿到html模板，实际上是ejs的模板
        templates[name] = ejs.compile(html); // 编译模板，这里怎么没有传入数据?
    });

    $.method('mail.send').check({
        to: {required: true},
        subject: {required: true},
        html: {required: true},
    });

    $.method('mail.send').register(function (params, callback){
        $.smtp.sendMail(params, callback);
    });

    $.method('mail.sendTemplate').check({ // 发送模板验证
        to: {required: true},
        subject: {required: true},
        template: {required: true}
    });

    $.method('mail.sendTemplate').register(async function (params){ // 注册发布模板的方法

        const fn = templates[params.template];
        if (!fn) throw new Error('invalid email template "${params.template}');

        const html = fn(params.data || {});

        return $.method('mail.send').call({
            to: params.to,
            subject: params.subject,
            html: html
        });
    });

    done();
};