/**
 * Created by Tom on 4/8/2016.
 */
"use strict";

//##
//!!!Exceeds default Node memory allocation!!! Run with flag --max-old-space-size=4096
//##
//imports
const dh = require('./dbHelpers');
const q = require('q');
const fs = require("fs");

//define some variables for later use
let pagesToVisit = [];
//crawler that makes sure we only visit unvisited pages
let crawl = () => {
    if (pagesToVisit.length == 0) {

        dh.close();
    } else {
        let nextPage = pagesToVisit.shift();
        visitPage(nextPage, crawl);
    }
};

//visits the page and determines whether we care about it or not
let visitPage = (file, callback) => {
    // Make the request
    fs.readFile("../data/states/" + file, "utf-8", (error, data) => {
            if (error) {
                console.log(error);
                callback();
            } else {
                //ensures it only searches trail pages
                searchForTerms(data);
                callback();
            }
        }
    );
};

//searches html for terms we're interested in and writes them to file
let searchForTerms = (data) => {
    let ret = {};

    data = JSON.parse(data);
    data = data.features;
    // console.log(data);
    //iterates through html page
    for (let i = 0; i < data.length; i++) {
        ret.temp = data[i].properties.temp;
        ret.zone = data[i].properties.zone;
        ret.geometry = {};
        ret.geometry.coordinates = data[i].geometry.coordinates;
        ret.geometry.type = "Polygon";
        // console.log(ret);
        dh.postZone(ret)
    }
};

q.all([dh.getQueued("../data/states/")]).then((queued)=> {
    queued = queued[0];
    for (let i = 0; i < queued.length - 1; i++) {
        pagesToVisit.push(String(queued[i]));

    }
    crawl();
});
