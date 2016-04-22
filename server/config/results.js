/*jshint esversion: 6 */
/**
 * Created by Tom on 4/18/2016.
 */

// TODO: Add the ability to switch to adidtional pages of results...

"use strict";

let Plants = require('../schemas/plant');

module.exports = {
    //searches plants
    searchPlants: function (req, res) {
        if (req.body.zone) {
            Plants.find({
                    $or: [
                        {$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': req.body.zone}]},
                        {$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': req.body.zone}]},
                        {$and: [{'uses.other': {$in: req.body.other}}, {'zone': req.body.zone}]}]
                }, {},
                {limit: 50}, (err0, plants) => {
                    if (err0) {
                        res.status(500).send(err0);
                    } else {
                        res.send(plants);
                    }
                }).sort({views: 1});
        }
        else {
            Plants.find({$or: [{'uses.edible': {$in: req.body.edible}}, {'uses.medical': {$in: req.body.medical}}, {'uses.other': {$in: req.body.other}}]}, {}, {limit: 50}, function (err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    res.send(plants);
                }

            }).sort({views: 1});

        }

    },
    samplePlants: (req, res)=> {
        Plants.aggregate(
            {$sample: {size: 25}}, (err, plants)=> {
                err ? res.status(500).send(err) : res.send(plants);
            }
        );
    },
    //This searches for plants that match the string input into the input field...
    // TODO: Create a lowercase_name field in the database for the latin and common name fields.  This will negate the need for toUpperCase thing...
    searchResults: (req, res)=> {

        var reger = new RegExp(".*"+ req.body.name.toLowerCase() +".*");
        Plants.find({$or: [{'nameL': {$regex:reger}}, {'latinL': {$regex:reger}}]}, {}, {limit: 50},
            function (err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    console.log(plants);
                    res.send(plants);
                }

            });
    }
};
