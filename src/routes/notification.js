"use strict";


module.exports = function(done) {

    function formatQuery(ret, query){
        if (query.type) ret.type = query.type;
        if ('isRead' in query) ret.isRead = parseBoolean(query.isRead);
        return ret;
    }

    function parseBoolean(v){
        switch (String(v)){
            case 'true':
            case '1':
            case 'on':
                return true;
            default:
                return false;
        }
    }

    $.router.get('/api/notification/count', $.checkLogin, async function(req, res, next){

        const query = formatQuery({to: req.session.user._id}, req.query);
        console.log(query);
        const count = await $.method('notification.count').call(req.query);

        res.apiSuccess({count});
    });

    done();
};