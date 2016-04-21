"use strict";

module.exports = function (done) {

    const debug = $.createDebug('init:routes:topic');
    debug("init the topic routes");

    $.router.post('/api/topic/add', $.checkLogin, async function(req, res, next){
        debug("get a request from topic add")
        req.body.authorId = req.session.user._id;

        if('tags' in req.body){ // 过滤tags标签
            req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v => v); // 这里是处理把array变成string
        }
        const topic = await $.method('topic.add').call(req.body)

        res.apiSuccess({topic})
    });

    $.router.get('/api/topic/list', async function(req, res, next){

        debug("get a request from topic list");

        if ('tags' in req.query){
            req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
        }

        const list = await $.method('topic.list').call(req.query);
        res.apiSuccess({list});
    });

    $.router.get('/api/topic/item/:topic_id', async function(req, res, next){

        const topic = await $.method('topic.get').call({_id: req.params.topic_id});
        if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

        res.apiSuccess({topic});

    });

    $.router.post('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {
        req.body._id = req.params.topic_id;

        if('tags' in req.body){ // 过滤tags标签
            req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v => v); // 这里是处理把array变成string
        }
        await $.method('topic.update').call(req.body);

        const topic = await $.method('topic.get').call({_id: req.params.topic_id});

        res.apiSuccess({topic});
    });

    $.router.delete('/api/topic/item/:topic_id',$.checkLogin, $.checkTopicAuthor, async function(req, res, next){
        const topic = await $.method('topic.delete').call({_id: req.params.topic_id});

        res.apiSuccess({topic});
    })


    done();
};