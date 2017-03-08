var Schema = require('../../../lib').Schema;  // import schema library
var mySchema = Schema({name: String}); // new schema

/* global db */
module.exports = db.model('MyModel', mySchema); // export to global
