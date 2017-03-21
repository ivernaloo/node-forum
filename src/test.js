import createDebug from  'debug';
// 创建Debug参数
$.createDebug = function(name){
    return createDebug('my: ' + name);
};
const debug = $.createDebug('test');

// $.method('user.add').call({
//     name: 'hello0',
//     email: 'xxx@qq.com',
//     password: 'xxxxxx',
//     nickname: '测试1',
//     about: 'great'
// }, debug);

// call passy the { name: 'hello0' } as context to the function
$.method('user.get').call({
    name: 'hello0'
}, debug);