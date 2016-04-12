import request from 'request';
import cheerio from 'cheerio';

function fetch(url){
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

async  function articleList() {
    const data = await fecth('https://cnodejs.org');
    const $ = cheerio.load(data);
    const list = [];
    $(".topic_title").each(function(){
        const link = $(this).prop("href");
        const title = $(this).text().trim();
        if (link){
            list.push({title, link: link.trim()});
        }
    })
    return list;
}

async function articleDetail(url){
    const data = await fetch('https://cnode.js.org' + url);
    return data.length;
}