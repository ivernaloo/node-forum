"use strict";

import request from 'supertest';
import "./server";


/*
* 为什么对supertest做这种封闭
* */
function makeRequest(method, path, data, params) {
    return new Promise((resolve, reject) => {
            $.ready(err => {
            if (err) return reject(err);

            let req = request($.express)[method](path); // 调用express来执行?
                                                          // request这里面要调用express的一个实例
                if(method === 'get' || method === 'head'){
                    req = req.query(params);
                } else {
                    req = req.send(params);
                }
                req.end((err, res) => {
                    if (err) return reject(err);
                    resolve(res);
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


