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
      var plantsArray = [];
      var zonePlus = 4;
      if(Number(req.body.zone)>8){
          zonePlus = 12-req.body.zone;
      }
      Plants.find({$and: [{'uses.other': {$in: req.body.other}}, {'zone': {$gte: req.body.zone, $lte: (Number(req.body.zone) + zonePlus)}}]}, function(err0, plants) {
          if (err0) {
             res.status(500).send(err);
          }
          else {
             plantsArray.push(plants);
              Plants.find({$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': {$gte: req.body.zone, $lte: (Number(req.body.zone) + zonePlus)}}]}, function(err1, medicalPlants) {
                    if (err1) {
                        res.status(500).send(err);
                    }
                    else {
                        plantsArray.push(medicalPlants);
                        Plants.find({$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': {$gte: req.body.zone, $lte: (Number(req.body.zone) + zonePlus)}}]}, function(err2, ediblePlants) {
                            if (err2) {
                                res.status(500).send(err2);
                            }
                            else {
                                plantsArray.push(ediblePlants);
                                res.send(plantsArray);
                            }
                        })
                    }
                })
          }
      })
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

}