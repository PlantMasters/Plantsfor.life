/**
 * Created by Tom on 3/29/2016.
 */
"use strict";
//imports
const dh = require('./dbHelpers');
const q = require('q');
const fs = require("fs");

//define some option constants
const searchTerms = [
    `name="top"></a>`,
    `<td>common name:</td>`,
    `<td>family:</td>`,
    `<td>known hazards:</td>`,
    `<td>range:</td>`,
    `<td>habitat:</td>`,
    `<td>edibility rating (1-5):</td>`,
    `<td>medicinal rating (1-5):</td>`,
    `</a>physical characteristics</h2>`,
    `</a>habitats and possible locations</h2>`,
    `</a>edible uses</h2>`,
    `</a>medicinal uses</h2>`,
    `</a>other uses</h2>`,
    `</a>cultivation details</h2>`,
    `</a>propagation</h2>`
];

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
    fs.readFile("../data/plants/" + file, "utf-8", (error, data) => {
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
let searchForTerms = (text) => {
    let termCount = 0;
    let ret = {};
    let len = searchTerms[0].length;
    let temp;
    text = text.replace(/\r?\n|\r/g, "");
    //iterates through html page
    for (let i = 0; i < text.length; i++) {
        //checks html for hooks
        if (text.slice(i, i + len).toLowerCase() === searchTerms[termCount]) {
            //hooks are sequential, matches observed patterns and pulls relevant data
            switch (termCount) {
                //latin name
                case 0:
                    temp = text.slice(i + len, i + len + 200);
                    ret.latin = temp.match(/([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    ret.latinL = ret.latin.toLowerCase();
                    i += ret.latin.length;
                    break;
                //common name
                case 1:
                    temp = text.slice(i + len, i + len + 200);
                    temp = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    if (temp === "&nbsp;") {
                        ret.name = ret.latin;
                        ret.nameL = ret.latinL;
                    } else {
                        ret.name = temp;
                        ret.nameL = temp.toLowerCase();
                    }
                    i += ret.name.length;
                    //
                    break;
                //family
                case 2:
                    temp = text.slice(i + len, i + len + 200);
                    ret.family = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    i += ret.family.length;

                    break;
                //hazards
                case 3:
                    temp = text.slice(i + len, i + len + 5000);
                    ret.hazards = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    i += ret.hazards.length;

                    break;
                //range
                case 4:
                    temp = text.slice(i + len, i + len + 1000);
                    ret.range = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    i += ret.range.length;
                    break;
                //habitat
                case 5:
                    temp = text.slice(i + len, i + len + 1000);
                    ret.habitat = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    i += ret.habitat.length;

                    break;
                //edibility
                case 6:
                    temp = text.slice(i + len, i + len + 100);
                    ret.edibility = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    break;
                //medicinal
                case 7:
                    temp = text.slice(i + len, i + len + 100);
                    ret.medicinal = temp.match(/>([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    break;
                //characteristics
                case 8:
                    temp = text.slice(i + len, i + len + 5000 > text.length ? text.length : i + len + 5000);
                    ret.characteristics = temp.match(/(.*?)<h2/)[1].replace(/<[^>]*>/g, "").trim();
                    if (ret.characteristics.match(/growing to(.*\dm)/)) {
                        temp = ret.characteristics.match(/growing to(.*\dm)/)[1].trim();
                        temp = temp.split("m");
                        ret.size = [];
                        let size = temp.length == 3 ? 2 : 1;
                        for (let j = 0; j < size; j++) {
                            ret.size.push(temp[j].match(/(\b\d[\d,.]*\b)/)[1]);
                        }
                    }
                    if (ret.characteristics.match(/zone(.\d)/)) {
                        ret.zone = ret.characteristics.match(/zone(.\d)/)[1];
                    }
                    i += ret.characteristics.length;

                    break;
                //possible locations
                case 9:
                    temp = text.slice(i + len, i + len + 1000 > text.length ? text.length : i + len + 1000);
                    ret.locations = temp.match(/([^<]*)</)[1].replace(/<[^>]*>/g, "").trim();
                    i += ret.locations.length;

                    break;
                //edible uses
                case 10:
                    // debugger;
                    temp = text.slice(i + len, i + len + 5000 > text.length ? text.length : i + len + 5000);
                    if (temp.match(/em>([^<]*)<h2/)) {
                        ret.eDesc = temp.match(/\/em>([^<]*?)<h2/)[1].replace(/<[^>]*>/g, "").trim();
                    } else {
                        ret.eDesc = temp.match(/\/em>(.*?)<h2/)[1].replace(/<[^>]*>/g, "").trim();
                    }
                    i += ret.eDesc.length;
                    // console.log(`edible`)
                    break;
                //medicinal uses
                case 11:
                    temp = text.slice(i + len, i + len + 5000 > text.length ? text.length : i + len + 5000);
                    if (temp.match(/em>([^<]*)<h2/)) {
                        ret.mDesc = temp.match(/\/em>([^<]*?)<h2/)[1].replace(/<[^>]*>/g, "").trim();
                    } else {
                        ret.mDesc = temp.match(/\/em>(.*?)<h2/)[1].replace(/<[^>]*>/g, "").trim();
                    }
                    i += ret.mDesc.length;
                    // console.log(`medical`)

                    break;
                //other uses
                case 12:
                    temp = text.slice(i + len, i + len + 5000 > text.length ? text.length : i + len + 5000);
                    if (temp.match(/em>([^<]*)<h2/)) {
                        ret.oDesc = String(temp.match(/\/em>([^<]*?)<h2/)[1].replace(/<[^>]*>/g, "").trim());
                    } else {
                        ret.oDesc = String(temp.match(/\/em>(.*?)<h2/)[1].replace(/<[^>]*>/g, "").trim());
                    }
                    i += ret.oDesc.length;
                    // console.log(`other`)

                    break;
                //cultivation
                case 13:
                    temp = text.slice(i + len, i + len + 5000 > text.length ? text.length : i + len + 5000);
                    ret.cultivation = String(temp.match(/(.*?)<h2/)[1].replace(/<[^>]*>/g, "").trim());
                    i += ret.cultivation.length;
                    // console.log(`cultivation`)

                    break;
                //propagation
                case 14:
                    temp = text.slice(i + len, i + len + 5000 > text.length ? text.length : i + len + 5000);
                    ret.propagation = String(temp.match(/(.*?)<h2/)[1].replace(/<[^>]*>/g, "").trim());
                    i += ret.propagation.length;
                    // console.log(`propagaino`)

                    break;
            }
            termCount++;
            //once we've found all data we care about
            if (termCount >= searchTerms.length) {
                //write data to file
                for (let obj in ret) {
                    if (typeof ret[obj] === "string") {
                        ret[obj] = ret[obj].replace(/(\[.*?])/g, "").replace(/(.*[a-z];.*?\.)/, "").replace(/\b(\w+)\b\.+\b\1\b/, "$1").trim();
                        ret[obj] = ret[obj].replace(/\.([a-zA-Z])/g, ". $1").replace(/(  )/g, " ");
                        ret[obj] = ret[obj].replace(/(&#176;)/g, "°")
                    }
                }
                ret.views = parseInt(Math.random() * 25);
                dh.postPlant(ret);
                break;
            }

        } else {
            // text = text.slice(i + len, text.length);
            len = searchTerms[termCount].length;

        }
    }
};

q.all([dh.getQueued("../data/plants/")]).then((queued)=> {
    queued = queued[0];
    for (let i = 0; i < queued.length - 1; i++) {
        pagesToVisit.push(String(queued[i]));

    }
    crawl();
});
