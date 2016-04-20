"use strict";

import mongoose from 'mongoose';

module.exports = function(done){

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Topic = new Schema({
        authorId: {type: ObjectId, index: true},
        title: {type: String, trim: true},
        content: {type: String},
        tags: [{type: String, index: true}],
        createAt: {type: Date, index: true},
        updateAt: {type: Date, index: true},
        lastCommentedAt: {type: Date, index: true},
        comments: [{
            cid: ObjectId,
            authorId: ObjectId,
            content: String,
            createAt: Date
        }]
    })

    $.mongodb.model('Topic', Topic);
    $.model.Topic = $.mongodb.model('Topic');

    done();
};