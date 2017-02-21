"use strict";

const request = require('request');
const cheerio = require('cheerio');
const async = require("async");

function fetch(url, callback){
    request.get(url, (err, res, body) => {
        callback(err, body)
    })
}

function articleList(callback) {
    fetch('https://cnodejs.org', (err, data) => {
        if (err) return callback(err);

        const $ = cheerio.load(data);
        const list = [];
        $(".topic_title").each(function(){
            const link = $(this).prop("href");
            const title = $(this).text().trim();
            if (link){
                list.push({title, link: link.trim()});
            }
        });

        callback(null, list); // 第一个null的原因是不用传对象
    });
}

function articleDetail(url, callback){
    fetch("https://cnodejs.org" + url, (err, data) => {
        callback(err, data && data.length);
    });
}

function start(callback){
    articleList((err, list) => {
        if (err) return console.error(err);

        async.eachSeries(list, (item, next) => {
            articleDetail(item, (err, length) => {
                if (err) return next(err);

                console.log('%s [%s]', item.title, length);
                next();
            });
        }, callback);
    })
}

start((err) => {
    if(err){
        console.error(err);
    } else {
        console.log('done')
    }
});
