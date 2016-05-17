"use strict";

module.exports = function(done){

    const debug = $.createDebug('middlewares:user');


    $.checkLogin = function(req, res, next){
        if (!(req.session.user && req.session.user._id)) return next(new Error('please login firstly'));

        next();
    };

    $.checkTopicAuthor = async function(req, res, next){
        const topic = await $.method('topic.get').call({_id : req.params.topic_id})
        if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));
        // debug('topic : ', topic);
        debug('topic.author : ', topic.author);
        debug('req.session.user._id : ', req.session.user._id);

        if (topic.author.toString() != req.session.user._id.toString()) {
            return next(new Error('access denied'));
        }

        req.topic = topic;
        next();
    };
    done();
};