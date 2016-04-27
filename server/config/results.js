/*jshint esversion: 6 */
// TODO: Add the ability to switch to adidtional pages of results...

"use strict";

let Plants = require('../schemas/plant');
let page = 1;
let query;
// let aggregate;

module.exports = {
    //searches plants
    searchPlants: function (req, res) {
        console.log(`sdgdfg`);
        page = 1;
        if (req.body.zone != 0) {
            Plants.paginate({
                    $or: [
                        {$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': req.body.zone}]},
                        {$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': req.body.zone}]},
                        {$and: [{'uses.other': {$in: req.body.other}}, {'zone': req.body.zone}]}]
                }, {select: {}, page: page, limit: 24},
                (err0, plants) => {
                    if (err0) {
                        res.status(500).send(err0 + req.body.zone);
                    } else {
                        query = {
                            $or: [
                                {$and: [{'uses.edible': {$in: req.body.edible}}, {'zone': req.body.zone}]},
                                {$and: [{'uses.medical': {$in: req.body.medical}}, {'zone': req.body.zone}]},
                                {$and: [{'uses.other': {$in: req.body.other}}, {'zone': req.body.zone}]}]
                        };
                        res.send(plants);
                    }
                }
            );
        }
        else {
            Plants.paginate({
                    $or: [
                        {'uses.edible': {$in: req.body.edible}},
                        {'uses.medical': {$in: req.body.medical}},
                        {'uses.other': {$in: req.body.other}}]
                }, {select: {}, page: page, limit: 24},
                function (err0, plants) {
                    if (err0) {
                        res.status(500).send(err0);
                    } else {
                        query = {
                            $or: [
                                {'uses.edible': {$in: req.body.edible}},
                                {'uses.medical': {$in: req.body.medical}},
                                {'uses.other': {$in: req.body.other}}]
                        };
                        // console.log(res);
                        // console.log(plants);
                        res.send(plants);
                    }
                }
            );
        }
    },
    samplePlants: (req, res)=> {
        Plants.aggregate(
            {$sample: {size: 24}}, (err, plants)=> {
                err ? res.status(500).send(err) : res.send(plants);
            }
        );
    },
    //This searches for plants that match the string input into the input field...
    searchResults: (req, res)=> {
        page = 1;
        var reger = new RegExp(".*" + req.body.name.toLowerCase() + ".*");
        Plants.paginate({$or: [{'nameL': {$regex: reger}}, {'latinL': {$regex: reger}}]}, {page: page, limit: 24},
            function (err0, plants) {
                if (err0) {
                    res.status(500).send(err0);
                } else {

                    query = {$or: [{'nameL': {$regex: reger}}, {'latinL': {$regex: reger}}]};

                    res.send(plants);
                }
            }
        );
    },
    getMore: (req, res) => {
        page++;
        Plants.paginate(query, {page: page, limit: 24},
            (err0, plants) => {
                if (err0) {
                    res.status(500).send(err0 + req.body.zone);
                } else {
                    res.send(plants);
                }
            }
        )
    },
    sampleMore: (req, res) => {
        Plants.aggregate(
            {$sample: {size: 24}}, (err, plants)=> {
                err ? res.status(500).send(err) : res.send(plants);
            }
        );
    }

};
