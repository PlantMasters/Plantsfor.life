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

    app.post('/gardenPlant', function (req, res) {
        var newPlant = new GardenPlant;
        newPlant.plant = req.body.plant;
        newPlant.user = req.user._id;
        newPlant.save(function (err, plant) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plant);
            }
        })

    });
    app.get('/gardenPlant', function (req, res) {
        GardenPlant.find({'user': req.user._id}, function (err, plants) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.send(plants);
            }
        })
    });
    app.delete('/removePlant/:plantId', function (req, res) {
        GardenPlant.remove({'_id': req.params.plantId}, function (err, plant) {

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
};