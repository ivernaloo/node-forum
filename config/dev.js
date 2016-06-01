module.exports = function(set, get, has) {
    set('web.port', 3001);

    set('db.mongodb', 'mongodb://192.168.99.100:32770/practice_nodejs_project');

    set('smtp.host', 'smtp.163.com');
    set('smtp.secure', true);
    set('smtp.port', 465);
    set('smtp.auth.user', 'ivernaloo@163.com');
    set('smtp.auth.pass','abcd2017');

    set('github.clientID', 'f584fed6fd9c0da240a1');
    set('github.clientSecret', '6ee1c24a2e78ac85be8d944fc1d815a87c9653b3');
    set('github.callbackURL', 'http://server:3000/auth/github');
};