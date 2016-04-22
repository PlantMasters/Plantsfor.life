"use strict";
let auth = require('./auth.js');
let users = require('./users');
let mongoose = require('mongoose');
let User = mongoose.model('User');
let results = require('./results');
let GardenPlant = require('../schemas/myGardenPlant');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('/bootstrappedUser', function (req, res) {
        if (req.user)
            res.json(req.user);
    });

    app.put('/plants', results.searchPlants);
    app.get("/plants", results.samplePlants);
    app.post("/plants", results.searchResults);

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
        GardenPlant.remove({'_id': req.params.plantId}, function(err, plant) {
            if (err) {
                res.status(500).json(err);
            }
        })
        GardenPlant.find({'user': req.user._id}, function(err, plants) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plants)
            }
        })
    })
    
    app.get('/getGardenPlant/:plantId', function(req, res, next) {
        GardenPlant.findById(req.params.plantId, function(err, plant) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plant);
            }
        })
    })
    
    app.put('/myPlantVariety', function(req, res, next) {
        //req.body = {plantId: myPlantId, newVariety = newVar}
        GardenPlant.findByIdAndUpdate(req.body.plantId, {$set: {variety: req.body.newVariety}}, {new: true}, function(err, plant) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plant);
            }
        })
    })
    app.put('/myPlantNotes', function(req, res, next) {
        //req.body = {plantId: myPlantId, newNote = newNote}
        GardenPlant.findByIdAndUpdate(req.body.plantId, {$set: {notes: req.body.newNote}}, {new: true}, function(err, plant) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plant);
            }
        })
    })
    app.put('/myPlantDate', function(req, res, next) {
        //req.body = {plantId: myPlantId, newDate = newDate}
        console.log('DATE');
        console.log(req.body.date);
        GardenPlant.findByIdAndUpdate(req.body.plantId, {$set: {date: req.body.date}}, {new: true}, function(err, plant) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plant);
            }
        })
    })
    app.put('/myPlantLocation', function(req, res, next) {
        //req.body = {plantId: myPlantId, newLocation = newLoc}
        GardenPlant.findByIdAndUpdate(req.body.plantId, {$set: {location: req.body.newLocation}}, {new: true}, function(err, plant) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plant);
            }
        })
    })
};
