"use strict";
/*
* @module async loaded by $.init method
*
* */

import path from 'path';
import express from 'express'
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import session from 'express-session';

module.exports = function(done){

    const debug = $.createDebug('init:express');
    debug('initing Express...');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(multipart());
    app.use(session({
        secret: $.config.get('web.session.secret')
    }));

    const router = express.Router();

    const routerWrap = {};

    // handle throw exception
    ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
        routerWrap[method] = function(path, ...fnList){
            fnList = fnList.map(fn => {
                return function (req, res, next){
                    const ret = fn(req, res, next);
                    if (ret && ret.catch) ret.catch(next); // only have the ret then response the res.catch
                }
            });
            router[method](path, ...fnList);
        }
    });

    $.router = routerWrap;

    // extend function on the res instance
    app.use(function(req, res, next){
        res.apiSuccess = function(data){
            res.json({success: true, result: data});
        };
        next();// if there is no next, all logic would block here.
    });

    app.use(router);
    app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

    // special handle for err response
    app.use('/api', function(err, req, res, next){
        debug('API error : %s ', err && err.stack);
        res.json({error: err.toString()});
    });

    app.listen($.config.get('web.port'), (err) => {
        done(err);
    });

    done();
};