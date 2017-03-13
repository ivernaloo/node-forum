"use strict";

module.exports = function(done){

    $.router.get('/', function(req, res, next){
        res.end(`Beijing Time ${new Date()}`);
    });
}