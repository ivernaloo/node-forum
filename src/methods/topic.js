"use strict";


import validator from 'validator';

module.exports = function (done) {
    const debug = $.createDebug('methods:topic');
    debug('initing methods topic...');
    // method is add proceed logic
    // add check logic
    $.method('topic.add').check({
        authorId: {required: true, validate: (v)=> validator.isMongoId(v)},
        title   : {required: true},
        content : {required: true},
        tags    : {validate: (v)=> Array.isArray(v)}
    });

    // register logic
    $.method('topic.add').register(async function (params) {
        const topic = new $.model.Topic(params); // get new topick

        debug("params : ", params);
        debug("topic : ", topic);

        topic.createdAt = new Date(); // add created timestamp

        let a = topic.save(); // return a promise instance

        debug("topic  a: ", a);
        return a; // return the information
    });


    $.method('topic.get').check({
        _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    });
    $.method('topic.get').register(async function (params) {

        // manuplate the mongo and get the data
        return $.model.Topic.findOne({_id: params._id}) // find the topic
            // .populate({ // find the author associate with the topic
            //     path  : 'author',
            //     model : 'User',
            //     select: 'nickname about',
            // }).populate({   // find the comment author associate with the topic
            //     path  : 'comments.author',
            //     model : 'User',
            //     select: 'nickname about',
            // });

    });


    $.method('topic.list').check({ // check the list
        author: {validate: (v) => validator.isMongoId(String(v))},
        tags  : {validate: (v) => Array.isArray(v)}, // list tag
        skip  : {validate: (v) => v >= 0}, // the limit of each list
        limit : {validate: (v) => v > 0},  // the maximum output
    });
    $.method('topic.list').register(async function (params) {

        const query = {};
        if (params.author) query.author = params.author; // assignment the author/authorId to the query
        if (params.tags) query.tags = {$all: params.tags}; // list all tags , also can query the specificed tags


        // query all list match condition
        // why use the number in the configuration
        // means show this attribute?
        const ret = $.model.Topic.find(query, {
            author         : 1,
            title          : 1,
            tags           : 1,
            createdAt      : 1,
            updatedAt      : 1,
            lastCommentedAt: 1,
            pageView       : 1,
        });

        // .populate({
        //     path  : 'author',
        //     model : 'User',
        //     select: 'nickname about',
        // });
        if (params.skip) ret.skip(Number(params.skip));     // add skip in  the query, add the filter in the consequese result
        if (params.limit) ret.limit(Number(params.limit)); // can add limit in the query

        return ret;

    });


    // $.method('topic.count').check({
    //     author: {validate: (v) => validator.isMongoId(String(v))},
    //     tags  : {validate: (v) => Array.isArray(v)},
    // });
    // $.method('topic.count').register(async function (params) {
    //
    //     const query = {};
    //     if (params.author) query.author = params.author;
    //     if (params.tags) query.tags = {$all: params.tags};
    //
    //     return $.model.Topic.count(query);
    //
    // });
    //
    //
    $.method('topic.delete').check({
        _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    });
    $.method('topic.delete').register(async function (params) {

        return $.model.Topic.remove({_id: params._id});

    });
    //
    //
    $.method('topic.update').check({
        _id : {required: true, validate: (v) => validator.isMongoId(String(v))},
        tags: {validate: (v) => Array.isArray(v)} // check the tags
    });
    $.method('topic.update').register(async function (params) {

        const update = {updatedAt: new Date()}; // record update time
        if (params.title) update.title = params.title;  // update the title
        if (params.content) update.content = params.content;    // update content
        if (params.tags) update.tags = params.tags; // update tags

        return $.model.Topic.update({_id: params._id}, {$set: update}); // encapsluate the update object and assignment to the $set object

    });
    //
    //
    // $.method('topic.incrPageView').check({
    //     _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    // });
    // $.method('topic.incrPageView').register(async function (params) {
    //
    //     return $.model.Topic.update({_id: params._id}, {$inc: {pageView: 1}});
    //
    // });
    //
    //
    // $.method('topic.comment.add').check({
    //     _id    : {required: true, validate: (v) => validator.isMongoId(String(v))},
    //     author : {required: true, validate: (v) => validator.isMongoId(String(v))},
    //     content: {required: true},
    // });
    // $.method('topic.comment.add').register(async function (params) {
    //
    //     const comment = {
    //         author   : params.author,
    //         content  : params.content,
    //         createdAt: new Date(),
    //     };
    //
    //     const topic = await $.method('topic.get').call({_id: params._id});
    //     if (!topic) throw new Error('topic does not exists');
    //
    //     await $.method('notification.add').call({
    //         from: params.author,
    //         to  : topic.author._id,
    //         type: 'topic_comment',
    //         data: {
    //             _id  : params._id,
    //             title: topic.title,
    //         },
    //     });
    //
    //     const fromUser = await $.method('user.get').call({_id: params.author});
    //     const toUser = await $.method('user.get').call({_id: topic.author._id});
    //     $.method('mail.sendTemplate').call({
    //         to      : toUser.email,
    //         subject : `有人回复了你发表的主题《${topic.title}》`,
    //         template: 'reply',
    //         data    : {
    //             topic  : topic,
    //             content: params.content,
    //             user   : fromUser,
    //         },
    //     }, err => {
    //         if (err) console.error(err);
    //     });
    //
    //     return $.model.Topic.update({_id: params._id}, {
    //         $push: {
    //             comments: comment
    //         },
    //     });
    //
    // });
    //
    //
    // $.method('topic.comment.get').check({
    //     _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    //     cid: {required: true, validate: (v) => validator.isMongoId(String(v))},
    // });
    // $.method('topic.comment.get').register(async function (params) {
    //
    //     return $.model.Topic.findOne({
    //         _id           : params._id,
    //         'comments._id': params.cid
    //     }, {
    //         'comments.$': 1,
    //     }).populate({
    //         path  : 'author',
    //         model : 'User',
    //         select: 'nickname about',
    //     });
    //
    // });
    //
    //
    // $.method('topic.comment.delete').check({
    //     _id: {required: true, validate: (v) => validator.isMongoId(String(v))},
    //     cid: {required: true, validate: (v) => validator.isMongoId(String(v))},
    // });
    // $.method('topic.comment.delete').register(async function (params) {
    //
    //     return $.model.Topic.update({_id: params._id}, {
    //         $pull: {
    //             comments: {
    //                 _id: params.cid,
    //             }
    //         }
    //     });
    //
    // });


    done();
};