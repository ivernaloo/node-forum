'use strict';



module.exports = function (done) {


  $.checkLogin = function (req, res, next) {

    // check session user and user._id existed
    if (!(req.session.user && req.session.user._id)) return next(new Error('please login firstly'));

    next();

  };


  $.checkTopicAuthor = async function (req, res, next) {

    const topic = await $.method('topic.get').call({_id: req.params.topic_id}); // get the topic
    if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`)); // throw err about the topic exist status

    req.topic = topic; // assignment the topic to the request

    // if (req.session.user.isAdmin) return next();  // check admin status
    if (topic.author._id.toString() === req.session.user._id.toString()) return next(); // check the author of the topic

    next(new Error('access denied'));

  };


    done();
};