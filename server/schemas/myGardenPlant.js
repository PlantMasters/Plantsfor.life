/**
 * Created by Jessica on 4/18/2016
 */
"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gardenPlant = new Schema({
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'plants'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
gardenPlant.pre('find', populator).pre('findOne', populator);
function populator(next) {
    this.populate('plant').lean();
    next();
}

//noinspection JSUnresolvedFunction
module.exports = mongoose.model("gardenPlants", gardenPlant);