"use strict";

import mongoose from 'mongoose';

module.exports = function (done) {

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Notification = new Schema({
        from: {type: ObjectId, index: true, ref: 'User'},
        to: {type: ObjectId, index: true, ref: 'User'},
        type: {type: String},
        data: {type: object},
        createAt: {type: Date},
        isRead: {type: Boolean},
    });

    $.mongodb.model('Notification', Notification);
    $.model.Topic = $.mongodb.model('Notification');

    done();
};