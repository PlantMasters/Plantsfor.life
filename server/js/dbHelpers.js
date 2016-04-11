/**
 * updated by Tom on 4/4/2016.
 */
"use strict";


const q = require("q");
const mongoose = require('mongoose');
const fs = require("fs");
const plant = require("../schemas/plant");
const zone = require("../schemas/zone");

mongoose.connect("mongodb://127.0.0.1:27017/plantMaster");
mongoose.connection.once("open", () => {
    console.log("connected to mongodb")
});
const promises = [];

module.exports = {
    postPlant: (data) => {
        let defer = q.defer();
        plant.findOneAndUpdate({latin: data.latin}, data, {upsert: true, overwrite: true}, (err, s) => {
            if (err) {
                defer.reject(new Error(err));
            } else {
                defer.resolve();
            }
        });
        promises.push(defer);
    },
    postZone: (data)=> {
        let defer = q.defer();
        zone.create(data, (err, s) => {
            if (err) {
                defer.reject(new Error(err));
            } else {
                defer.resolve(s);
            }
        });
        promises.push(defer);
    },
    getQueued: (path) => {
        let defer = q.defer();
        fs.readdir(path, (err, response)=> {
            if (err) {
                defer.reject(new Error(err));
            } else {
                defer.resolve(response);
            }
        });
        return defer.promise;
    },
    close: ()=> {
        q.all(promises).done(()=> {
            mongoose.connection.close();

        })
    }
};