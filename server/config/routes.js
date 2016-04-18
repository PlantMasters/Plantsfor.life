var auth = require('./auth.js'),
  users = require('./users'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');
  Plants = require('../schemas/plant');
  GardenPlant = require('../schemas/myGardenPlant');

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
      if (req.body.zone) {
            Plants.find({$or: [ {$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': req.body.zone}]}, {$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': req.body.zone}]}, {$and: [{'uses.other': {$in: req.body.other}}, {'zone': req.body.zone}]}]}, {}, {limit: 50}, function(err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    res.send(plants);
                }
                
            })
      } 
      else {
            Plants.find({$or: [ {'uses.edible': {$in: req.body.edible}}, {'uses.medical': {$in: req.body.medical}}, {'uses.other': {$in: req.body.other}}]}, {}, {limit: 50}, function(err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    res.send(plants);
                }
                
            })
          
      }
  }) 
  app.post('/gardenPlant', function(req, res, next) {
      var newPlant = new GardenPlant;
      newPlant.plant = req.body.plant;
      newPlant.user = req.user._id;
      newPlant.save(function(err, plant) {
          if (err) {
              res.status(500).json(err);
          } else {
              res.send(plant);
          }
      })
      
  })
  app.get('/gardenPlant', function(req, res, next) {
      GardenPlant.find({'user': req.user._id}, function(err, plants) {
          if (err) {
              res.status(500).json(err);
          } else {
              res.send(plants);
          }
      })
  })
  app.delete('/removePlant/:plantId', function(req, res, next) {
      console.log('plantId')
      console.log(req.params.plantId)
      GardenPlant.remove({'_id': req.params.plantId}, function(err, plant) {
          console.log('PLANT TO DELETE')
          console.log(plant);
          if (err) {
              res.status(500).json(err);
          } else {
                // GardenPlant.find({'user': req.user._id}, function(err2, plants) {
                //         if (err) {
                //             res.status(500).json(err2);
                //         } else {
                //             res.send(plants);
                //         }
                // })
                res.send(plant)
          }
      })
  })
      
    

}