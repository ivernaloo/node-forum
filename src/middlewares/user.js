"use strict";

module.exports = function(done){

    const debug = $.createDebug('middlewares:user');

    $.checkLogin = function(req, res, next){
        console.log("req.session : ", req.session.user);
        if (!(req.session.user && req.session.user._id)) return next(new Error('please login firstly'));

        next();
    };

    $.checkTopicAuthor = async function(req, res, next){
        const topic = await $.method('topic.get').call({_id : req.params.topic_id})
        if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));
        // debug('topic : ', topic);
        debug('topic.author : ', topic.author);
        debug('req.session.user._id : ', req.session.user._id);

        req.topic = topic;

        if (req.session.user.isAdmin) return next();
        if (topic.author._id.toString() != req.session.user._id.toString())  return next();

        next(new Error('access denied'));
    };
    done();
};