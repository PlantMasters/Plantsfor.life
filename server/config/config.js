var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost/plantMaster',
    rootPath: rootPath,
    port: process.env.PORT || 3000
  },
  production: {
    db: 'mongodb://iandelin:795282@ds019481.mlab.com:19481/plantsforlife',
    rootPath: rootPath,
    port: process.env.PORT || 1029

  }
};
