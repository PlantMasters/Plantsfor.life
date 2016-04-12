var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost/plants',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: '',
    rootPath: rootPath,
    port: process.env.PORT || 80

  }
};
