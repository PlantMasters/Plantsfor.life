"use strict";
let auth = require('./auth.js');
let users = require('./users');
let mongoose = require('mongoose');
let User = mongoose.model('User');
let results = require('./results');

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


    // /plants?zone=5&medical=[]&edible=[]&other=[]
    app.put('/plants', results.searchPlants);
    app.get("/plants", results.samplePlants);


};