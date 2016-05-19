"use strict";


module.exports = function(done) {

    $.router.post('/api/notification/count', $.checkLogin, async function(req, res, next){

        req.body.quthor = req.session.user._id;

        const count = await $.method('notification.count').call(req.query);

        res.apiSuccess({topic});
    });

    done();
};