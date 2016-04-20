"use strict";

module.exports = function (done) {

    const debug = $.createDebug('init:routes:topic');
    debug("init the topic routes");

    $.router.post('/api/topic/add', $.checkLogin, async function(req, res, next){
        debug("get a request from topic add")
        req.body.authorId = req.session.user._id;

        if('tag' in req.body){
            req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v => v);
        }

        const topic = await $.method('topic.add').call(req.body)

        res.json({success: true, topic})
    });

    $.router.get('/api/topic/list', async function(req, res, next){
        debug("get a request from topic list")
        const topic = await $.method('topic.get').call({_id: req.params.topic_id});
        if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

        res.json({success: true, topic});
    })



    done();
};