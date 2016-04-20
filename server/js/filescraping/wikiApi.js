/**
 * Created by Tom on 4/19/2016.
 */
"use strict";

/**
 * Created by Tom on 3/29/2016.
 */
"use strict";
//imports
const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');
const bottleneck = require('bottleneck');
const dh = require('./dbHelpers');
const q = require('q');

//define some option constants
const startUrl = "http://en.wikipedia.org/w/api.php?action=query&titles=";
const extra = '&prop=pageimages&format=json&pithumbsize=600';
let pagesToVisit = [];

const limiter = new bottleneck(1, 500);
let url = new URL(startUrl);

let visitPage = (search, callback) => {
    // console.log(search)
    request((url + search + extra), (error, response) => {
        // Check status code (200 is HTTP OK)
        if (!error) {
            if (response.statusCode !== 200) {
                // dh.log(String(url + " : failed, " + response.statusCode));
                console.log(url + " : failed, " + response.statusCode);
                // callback();
                return;
            }
            // console.log(String(url + " : passed, " + response.statusCode + ", " + pagesToVisit.length));
            let whatever = JSON.parse(response.body);
            whatever = whatever.query.pages;
// console.log(whatever)
            for (let obj in whatever) {
                // console.log(whatever[obj].thumbnail)
                if (!whatever[obj].thumbnail) {

                    // whatever = String(search).match(/^((?:\S+\s+){1}\S+).*/)[1];
                    // if (whatever != search) {
                    //     visitPage(whatever, callback);
                    // } else {
                        callback();
                   // }
                } else {
                    // console.log(whatever[obj].thumbnail.source);
                    dh.addPic(search, whatever[obj].thumbnail.source);
                    callback();
                }
            }
        } else {
            console.log(url + " : failed, " + error);
        }
    });
};

//crawler that makes sure we only visit unvisited pages
let crawl = () => {
    //we've visited max number of pages or visited all in queue
    if (pagesToVisit.length === 0) {

        dh.close();
        return (console.log(`done`));
    } else {
        let nextPage = pagesToVisit.shift();
        dh.checked(String(nextPage)).then((check)=> {
            if (check) {
                crawl();
            } else {
                limiter.submit(visitPage, String(nextPage), crawl);
            }
        })
    }
};


dh.getLatin().then((queued)=> {
    console.log(queued.length);
    for (let i = 0; i < queued.length - 1; i++) {
        pagesToVisit.push(queued[i].latin);
        // console.log(queued[i].latin)
    }
    console.log(pagesToVisit.length);
    crawl()
});
// dh.checked("Xanthorhiza simplicissima").then((fe)=>{
//     console.log(fe);
// });