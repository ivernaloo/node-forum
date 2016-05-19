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

    done();
};