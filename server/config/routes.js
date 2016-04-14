var auth = require('./auth.js'),
  users = require('./users'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');
  Plants = require('../schemas/plant');

module.exports = function(app) {

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res){
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('*', function(req, res, next) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
  
  
  
  // /plants?zone=5&medical=[]&edible=[]&other=[]
  app.put('/plants', function(req, res, next) {
      //req.body = []
      var plantsArray = []
      Plants.find({'uses.other': {$in: req.body.other}}, function(err, plants) {
          if (err) {
              res.status(500).send(err);
          }
          else {
              plantsArray.push(plants);
              Plants.find({'uses.medical': {$in: req.body.medical}}, function(err, medicalPlants) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        plantsArray.push(medicalPlants);
                        //console.log(plants);
                        res.send(plantsArray);
                    }
                })
          }
          
      })
    //   Plants.find({'uses.medical': {$in: req.body.medical}}, function(err, plants) {
    //       if (err) {
    //           res.status(500).send(err);
    //       }
    //       else {
    //           plantsArray.push(plants);
    //           console.log(plants);
    //       }
    //   })
  })
};
