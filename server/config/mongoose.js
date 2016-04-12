var mongoose = require('mongoose'),
    userModel = require('../schemas/User');

mongoose.set('debug', true); //log connection methods

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once("open", function() {
    console.log('connected to MongoDB');
    console.log(new Date());
  });

  userModel.createDefaultUsers();

};
