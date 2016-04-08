/**
 * Created by Tom on 3/23/2016.
 */
"use strict";

var mongoose = require('mongoose');
//noinspection JSUnresolvedVariable
var Schema = mongoose.Schema;

var plant = new Schema({
    "latin":{
        type:String
    },
    "name":{
        type:String
    },
    "family":{
        type:String
    },
    "hazards":{
        type:String
    },
    "range":{
        type:String
    },
    "habitat":{
        type:String
    },
    "edibility":{
        type:Number
    },
    "medicinal":{
        type:Number
    },
    "characteristics":{
        type:String
    },
    "locations":{
        type:String
    },
    "eUses":{
        type:String
    },
    "mUses":{
        type:String
    },
    "other":{
        type:String
    },
    "cultivation":{
        type:String
    },
    "propagation":{
        type:String
    }
});

//noinspection JSUnresolvedFunction
module.exports = mongoose.model("plants", plant);