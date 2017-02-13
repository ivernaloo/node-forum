import request from 'request';
import cheerio from 'cheerio';

function fetch(url){
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if(err){
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

async function articleList(){
    const data = await fetch("https://cnodejs.org");
    const $ = cheerio.load(data);
    const list = [];
    $('.topic_title').each(function(){
        const link = $(this).prop('href');
        if(link){
            list.push(link.trim());
        }
    });
    return list;
}

async function articleDetail(url){
    const data = await fetch('https://cnodejs.org' + url);
    return data.length;
}

async function start() {
    const list = await articleList();
    for(const item of list){
        console.log('fetch %s')
    }
}
articleList().then(ret => console.log(ret)).catch(err => console.error(err));