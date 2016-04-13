/**
 * Created by Tom on 4/8/2016.
 */
"use strict";

//imports
const dh = require('./dbHelpers');
const fs = require("fs");
const q = require("q");
let result = {};


//visits the page and determines whether we care about it or not
let crawl = () => {
    // Make the request
    let op = q.defer();


    fs.readFile("../data/other.txt", "utf-8",
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                //ensures it only searches trail pages
                searchForTerms(data, "other", op);
            }
        }
    );
    let ep = q.defer();
    fs.readFile("../data/edib.txt", "utf-8",
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                //ensures it only searches trail pages

                searchForTerms(data, "edible", ep);
            }
        }
    );
    let mp = q.defer();
    fs.readFile("../data/medic.txt", "utf-8",
        (error, data) => {
            if (error) {
                console.log(error);
            } else {
                //ensures it only searches trail pages
                searchForTerms(data, "medical", mp);

            }
        }
    );

    q.allSettled([op.promise, ep.promise, mp.promise]).then(()=> {
// console.log(`whatever`);
//         console.log(result);
        for (let term in result) {
            // console.log(`opp`)
            dh.postUses(result[term]);
        }
        dh.close();
    });
};


//searches html for terms we're interested in and writes them to file
let searchForTerms = (data, flag, p) => {

    let ret = {};
    data = data.split("\n");
    let temp, junk;
    //iterates through html page
    for (let i = 1; i < data.length; i++) {
        temp = data[i].split("|");
        if (temp.length > 1) {
            if (!ret[temp[0]]) {
                junk = temp[1].replace(/([\r?\n|\r])/g, "");
                ret[temp[0]] = [junk];
            } else {
                junk = temp[1].replace(/([\r?\n|\r])/g, "");
                ret[temp[0]].push(junk);
            }
        }
    }
    for (let chunk in ret) {
        if (result[chunk]) {
            result[chunk][flag] = ret[chunk];
        } else {
            result[chunk] = {latin: chunk};
            result[chunk][flag] = ret[chunk];
        }
    }
    // console.log(result)
    p.resolve();
};

crawl();
