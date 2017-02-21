"use strict";

const request = require('request');
const cheerio = require('cheerio');
const async = require("aysnc");

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

        callback(null, list); //d

    });
}

async function articleDetail(url){
    console.log("data : ========================================");

    const data = await fetch('https://cnodejs.org' + url);
    console.log("data : ", data)
    return data.length;
}


async function start(){
    const list = await articleList();
    for (const item of list){
        console.log('fetch %s', item.title, item.link);
        const length = await articleDetail(item.link);
        console.log(' - %s', length);
    }
    console.log("done");
}
start().then(rect => console.log(rect)).catch(err => console.error(err));