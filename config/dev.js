module.exports = function(set, get, has) {
    set('web.port', 3001);

    set('db.mongodb', 'mongodb://192.168.99.100:32770/practice_nodejs_project');

    set('smtp.host', 'smtp.exmail.qq.com');
    set('smtp.secure', true);
    set('smtp.port', 465);
    set('smtp.auth.user', 'admin@zhoup.com');
    set('smtp.auth.pass','xx');
};