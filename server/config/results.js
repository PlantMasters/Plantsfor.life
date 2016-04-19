/**
 * Created by Tom on 4/18/2016.
 */
"use strict";

let Plants = require('../schemas/plant');

module.exports = {
    //searches plants
    searchPlants: function (req, res) {
        if (req.body.zone) {
            Plants.find({$or: [
                {$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': req.body.zone}]},
                {$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': req.body.zone}]},
                {$and: [{'uses.other': {$in: req.body.other}}, {'zone': req.body.zone}]}]}, {},
                {limit: 50}, (err0, plants) =>{
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    res.send(plants);
                }
            })
        }
        else {
            Plants.find({$or: [{'uses.edible': {$in: req.body.edible}}, {'uses.medical': {$in: req.body.medical}}, {'uses.other': {$in: req.body.other}}]}, {}, {limit: 50}, function (err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {
                    res.send(plants);
                }

            })

        }

    },
    samplePlants: (req, res)=> {
        Plants.aggregate(
            {$sample: {size: 25}}, (err,plants)=>{
                err ? res.status(500).send(err) : res.send(plants);
            }
        )
    }
};