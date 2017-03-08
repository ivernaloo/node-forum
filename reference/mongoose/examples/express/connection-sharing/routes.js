
var model = require('./modelA');   // import modelA

// route home
exports.home = function(req, res, next) {
  model.find(function(err, docs) {  // get all json data
    if (err) return next(err);
    res.send(docs);
  });
};

exports.modelName = function(req, res) {
  res.send('my model name is ' + model.modelName);
};

// insert new data item
exports.insert = function(req, res, next) {
  model.create({name: 'inserting ' + Date.now()}, function(err, doc) {
    if (err) return next(err);
    res.send(doc);
  });
};
