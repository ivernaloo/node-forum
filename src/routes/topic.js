'use strict';

/**
 * pratice Node.js project
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (done) {
    const debug = $.createDebug('routes:topic');
    debug('initing routes topic...');

    $.router.post('/api/topic/add', $.checkLogin, async function (req, res, next) {

        req.body.authorId = req.session.user._id;


        // iterate the tags attribute
        if ('tags' in req.body) {
            req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v); // tidy the tag format
        }

        debug(req.body)
        const topic = await $.method('topic.add').call(req.body);

        res.json({success: true, topic});
        // 发布频率限制
        // {
        //   const key = `addtopic:${req.body.author}:${$.utils.date('YmdH')}`;
        //   const limit = 2;
        //   const ok = await $.limiter.incr(key, limit);
        //   if (!ok) throw new Error('out of limit');
        // }
        //

        //
        // const topic = await $.method('topic.add').call(req.body);
        //
        // await $.method('user.incrScore').call({_id: req.body.author, score: 5});
        //
        // res.apiSuccess({topic});

    });


    $.router.get('/api/topic/list', async function (req, res, next) {

        // iterate the tags list
        if ('tags' in req.query) {
            req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
        }

        // let page = parseInt(req.query.page, 10);
        // if (!(page > 1)) page = 1;
        // req.query.limit = 10;
        // req.query.skip = (page - 1) * req.query.limit;

        const list = await $.method('topic.list').call(req.query); // get topic list

        // const count = await $.method('topic.count').call(req.query);
        // const pageSize = Math.ceil(count / req.query.limit);

        res.json({success: true, list}); // response the topic list
        // res.apiSuccess({count, page, pageSize, list});

    });

    // topic_id router for query the response topic id
    $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {

        const topic = await $.method('topic.get').call({_id: req.params.topic_id}); // get the topic instance use topic.get method through mongoose
        if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

        // const userId = req.session.user && req.session.user._id && req.session.user._id.toString();
        // const isAdmin = req.session.user && req.session.user.isAdmin;
        //
        // const result = {};
        // result.topic = $.utils.cloneObject(topic);
        // result.topic.permission = {
        //     edit  : isAdmin || userId === result.topic.author._id,
        //     delete: isAdmin || userId === result.topic.author._id,
        // };
        // result.topic.comments.forEach(item => {
        //     item.permission = {
        //         delete: isAdmin || userId === item.author._id,
        //     };
        // });

        res.json({success: true, topic})
    });
    done();

};