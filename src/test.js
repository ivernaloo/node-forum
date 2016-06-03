"use strict";

import request from 'supertest';
import "./base";

// 清空Redis数据
$.init.add(async function(){
    const keys = await $.limiter.connection.keys($.config.get('limiter.redis.prefix') + '*');
    if (keys.length > 0){
        await $.limiter.connection.del(keys);
    }
});

$.init.add(async function(){
    const keys = await $.captcha.connection.keys($.config.get('capcha.redis.prefix') + '*');
    if (keys.length > 0){
        await $.captcha.connection.del(keys)
    }
});


// 初始化
$.init((err) => {
    if (err){
        console.error(err);
        process.exit(-1);
    } else {
        console.log('inited [env=%s]',$.env);
    }

});



/*
* 为什么对supertest做这种封闭
* */
function makeRequest(method, path, data, params) {
    return new Promise((resolve, reject) => {
            $.ready(err => {
            if (err) return reject(err);

            params = params || {};
            let req = request($.express)[method](path); // 调用express来执行?
                                                          // request这里面要调用express的一个实例
            if(method === 'get' || method === 'head'){
                req = req.query(params);
            } else {
                req = req.send(params);
            }
            req.expect(200).end((err, res) => {
                if (err) return reject(err);
                if (res.body.success){
                    resolve(res.body.result);
                } else {
                    reject(new Error(res.body.error));
                }
            })
        });
    });
}

function generateRequestMethod(method){
    return function (path, params){
        return makeRequest(method, path, params);
    }
}

export default {
    get: generateRequestMethod('get'),
    post: generateRequestMethod('post'),
    put: generateRequestMethod('put'),
    delete: generateRequestMethod('delete')
}


