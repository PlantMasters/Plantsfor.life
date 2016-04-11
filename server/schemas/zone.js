/**
 * Created by Tom on 3/23/2016.
 */
"use strict";

var mongoose = require('mongoose');
//noinspection JSUnresolvedVariable
var Schema = mongoose.Schema;

var zone = new Schema({
    "temp": {
        type: Number
    },
    "zone": {
        type: String
    },
    "geometry": {
        "type": {
            type: String,
            default: "Polygon"
        },
        coordinates: { type: Array }

    }
});

zone.index({location: "2dsphere"});
//noinspection JSUnresolvedFunction
module.exports = mongoose.model("zones", zone);