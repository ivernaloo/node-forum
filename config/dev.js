module.exports = function(set, get, has) {
    set('web.port', 3001);

    set('db.mongodb', 'mongodb://192.168.99.100:32770/practice_nodejs_project');
}