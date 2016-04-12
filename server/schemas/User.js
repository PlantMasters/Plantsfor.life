var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: {type: String, required: '{PATH} is required!'},
  lastName: {type: String, required: '{PATH} is required!'},
  username: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  salt: {type: String, required: '{PATH} is required!'},
  hashed_pwd: {type: String, required: '{PATH} is required!'},
  roles: [String]
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'jessica');
      User.create({firstName: 'Jessica', lastName: 'Morrell', username: 'jessicamorrell', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'jessica');
      User.create({firstName: 'Jessica', lastName: 'Hathaway', username: 'hathawayjess', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'david');
      User.create({firstName: 'David', lastName: 'Andelin', username: 'bda9', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'tom');
      User.create({firstName: 'Tom', lastName: 'Pridham', username: 'tompridham', salt: salt, hashed_pwd: hash, roles: ['admin']});
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;
