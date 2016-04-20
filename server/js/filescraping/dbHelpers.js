/**
 * updated by Tom on 4/4/2016.
 */
"use strict";


const q = require("q");
const mongoose = require('mongoose');
const fs = require("fs");
const plant = require("../../schemas/plant");
const zone = require("../../schemas/zone");

mongoose.set("debug", true);
mongoose.connect("mongodb://127.0.0.1:27017/plantMaster");
mongoose.connection.once("open", () => {
    console.log("connected to mongodb")
});
const promises = [];

module.exports = {
    postPlant(data){
        let defer = q.defer();
        plant.findOneAndUpdate({latin: data.latin}, data, {upsert: true}, (err, s) => {
            // console.log(data);
            if (err) {
                console.log(err);
                defer.reject(new Error(err));
            } else {
                // console.log(s)
                defer.resolve();
            }
        });
        promises.push(defer.promise);
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
        promises.push(defer.promise);
    },
    postUses(data){
        let defer = q.defer();
        plant.findOne({latin: data.latin}, (err, result)=> {
            if (result) {
                result.uses.push(data);
                result.save((err, s) => {
                    // console.log(data);
                    if (err) {
                        console.log(err);
                        defer.reject(new Error(err));
                    } else {
                        // console.log(s)
                        defer.resolve();
                    }
                });
            }
            else {
                defer.reject();
            }
        });
        promises.push(defer.promise);
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
    getLatin: () => {
        let defer = q.defer();
        plant.find({}, {latin: 1}, (err, s)=> {
            if (err) {
                console.log(err);
                defer.reject(new Error(err));
            } else {
                // console.log(s)
                defer.resolve(s);
            }
        });
        return defer.promise;
    },
    addPic: (data, url)=> {
        let defer = q.defer();
        plant.findOneAndUpdate({latin: data}, {$set: {"pic": url}}, {new: true}, (err, s) => {
            // console.log(data);
            if (err) {
                console.log(err);
                defer.reject(new Error(err));
            } else {
                // console.log(s);
                defer.resolve();
            }
        });
        promises.push(defer.promise);
    },
    checked: (check)=> {
        let defer = q.defer();
        plant.findOne({"latin": check},'pic',
            function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(docs.pic);
                    if (docs.pic) {
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                }
            }
        );
        return defer.promise;
    },
    close: ()=> {
        q.allSettled(promises).done(()=> {
            mongoose.connection.close();
        })
    }
}
;