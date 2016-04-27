"use strict";

import path from 'path';





module.exports = function (done) {


    $.router.get('/', function (req, res, next){
        // res.end(`现在是北京时间${new Date()}`);
        res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
    });


    done();
}