"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (done) {

    $.router.post('/api/user/profile', $.checkLogin, async function (req, res, next) {

        const update = {
            _id: req.session.user._id,
        };
        if ('email' in req.body) update.email = req.body.email;
        if ('nickname' in req.body) update.nickname = req.body.nickname;
        if ('about' in req.body) update.about = req.body.about;

        const ret = await $.method('user.update').call(update);

        const user = await $.method('user.get').call({_id: req.session.user._id});
        req.session.user.email = user.email;
        req.session.user.nickname = user.nickname;
        req.session.user.about = user.about;
                                    
        res.apiSuccess(user);

    });

    $.router.post('/api/user/request_reset_password', async function (req, res, next) { // 截取请求链接

        if (!req.body.email) return next(new Error('missing parameter `email`'));

        const user = await $.method('user.get').call({email: req.body.email});
        if (!user) return next(new Error(`user ${req.body.email} does not exists`));

        const ttl = 3600; // 过期时间
        const code = await $.captcha.generate({
            type: 'reset_password',
            email: req.body.email,
        }, ttl);

        await $.method('mail.sendTemplate').call({ // 发送邮件
            to: req.body.email,
            subject: '重置密码',
            template: 'reset_password',
            data: {code, ttl},
        });

        res.apiSuccess({email: req.body.email});

    });


    $.router.post('/api/user/reset_password', async function (req, res, next) {   // 修改密码

        // 校验参数
        if (!req.body.code) return next(new Error('missing parameter `code`'));
        if (!req.body.email) return next(new Error('missing parameter `email`'));
        if (!req.body.password) return next(new Error('missing parameter `password`'));

        // 获取用户对象，通过email这个参数来拿到的 ?
        const user = await $.method('user.get').call({email: req.body.email}); // mongo用任何一个参数都可以拿到数据
        if (!user) return next(new Error(`user ${req.body.email} does not exists`)); // 校验参数

        const data = await $.captcha.get(req.body.code); // 设置校验码
        if (!data) return next(new Error(`invalid captcha code ${req.body.code}`)); // 错误
        if (data.type !== 'reset_password') return next(new Error(`invalid captcha code ${req.body.code} type`)); // 设置新的兑换码
        if (data.email !== req.body.email) return next(new Error(`invalid captcha code ${req.body.code} email`)); // 邮箱匹配

        const ret = await $.method('user.update').call({
            _id: user._id,  
            password: req.body.password,    // 更新密码
        });

        res.apiSuccess({email: req.body.email});

    });
    done();
};