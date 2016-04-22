/*jshint esversion: 6 */
/**
 * Created by Tom on 3/23/2016.
 */
"use strict";

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
let Schema = mongoose.Schema;

let Uses = new Schema({
    "medical": {
        type: Array,
        default: []
    },
    "edible": {
        type: Array,
        default: []
    },
    "other": {
        type: Array,
        default: []
    }
});

let plant = new Schema({
    "latin": {
        type: String,
        required: true
    },
    "name": {
        type: String
    },
    "family": {
        type: String
    },
    "hazards": {
        type: String
    },
    "range": {
        type: String
    },
    "habitat": {
        type: String
    },
    "edibility": {
        type: Number
    },
    "medicinal": {
        type: Number
    },
    "characteristics": {
        type: String
    },
    "locations": {
        type: String
    },
    "eDesc": {
        type: String
    },
    "mDesc": {
        type: String
    },
    "oDesc": {
        type: String
    },
    "cultivation": {
        type: String
    },
    "propagation": {
        type: String
    },
    "uses": [Uses],
    "zone": {
        type: Number
    },
    "size": {
        type: Array
    },
    "pic":{
        type:String
    },
    "latinL":{
        type:String
    },
    "nameL":{
        type:String
    },
    "views":{
        type:Number
    }
});
plant.plugin(mongoosePaginate);
plant.plugin(mongooseAggregatePaginate);

//noinspection JSUnresolvedFunction
module.exports = mongoose.model("plants", plant);
