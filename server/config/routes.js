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

  app.get('/bootstrappedUser', function(req, res){
      if(req.user)
          res.json(req.user);
  });
  

  
  // /plants?zone=5&medical=[]&edible=[]&other=[]
  app.put('/plants', function(req, res, next) {
      console.log('REQ.BODY');
      console.log(req.body);
      var plantsArray = [];
      
      
      if (req.body.zone) {
        
            Plants.find({$or: [ {$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': req.body.zone}]}, {$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': req.body.zone}]}, {$and: [{'uses.other': {$in: req.body.other}}, {'zone': req.body.zone}]}]}, {}, {limit: 50}, function(err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    plantsArray.push(plants);
                    console.log(plantsArray);
                    console.log(plantsArray.length);
                    res.send(plantsArray);
                }
                
            })
        //console.log(plantsArray);
         //res.send(plantsArray);
      } 
      else {
            Plants.find({$or: [ {'uses.edible': {$in: req.body.edible}}, {'uses.medical': {$in: req.body.medical}}, {'uses.other': {$in: req.body.other}}]}, {}, {limit: 50}, function(err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    plantsArray.push(plants);
                    console.log(plantsArray);
                    console.log(plantsArray.length);
                    res.send(plantsArray);
                }
                
            })
          
      }
  }) 
      
    

}