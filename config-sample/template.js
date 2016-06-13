module.exports = function(set, get, has) {
    set('web.port', 3001);

    set('db.mongodb', 'mongodb://192.168.99.100:32770/practice_nodejs_project');

    set('smtp.host', 'smtp.163.com');
    set('smtp.secure', true);
    set('smtp.port', 465);
    set('smtp.auth.user', 'xxxxx');
    set('smtp.auth.pass','xxx');

    set('github.clientID', 'xxx');
    set('github.clientSecret', 'xxx');
    set('github.callbackURL', 'http://server:3000/auth/github');
};