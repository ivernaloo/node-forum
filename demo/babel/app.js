import request from 'request';
import cheerio from 'cheerio';

function fetch(url){
    console.log("url : ", url);
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
    const data = await fetch('https://cnodejs.org');
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