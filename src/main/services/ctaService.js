const request = require('request');
const querystring = require('querystring');
const {queryDB} = require("./sqLite/sqLiteService");

function getDefaultTrains() {

}

function getTrainsByStation(station) {

}

function parseTrainResponse(trainData) {

}

async function stationSearchByNameAndColor(name, color) {
    return new Promise(async function (resolve, reject) {
        let rows = ["stop_name", "stop_color"]
        let values = [name, color]
        queryDB("GTF.db", "stops", rows, values).then(r => {
            if(r==="No Row"){
                reject(r);
            }
            resolve(r);
        })
    })
}

function getHex(color) {
    color.toUpperCase()
    switch (color) {
        case "RED":
            return '#C60C30';
        case "GREEN":
            return '#009B3A';
        case "BLUE":
            return '#00A1DE';
        case "BROWN":
            return '#62361B';
        case "PURPLE":
            return '#522398';
        case "ORANGE":
            return '#F9461C';
        case "YELLOW":
            return '#F9E300';
        case "PINK":
            return '#E27EA6';
    }
}

module.exports = {getDefaultTrains, getTrainsByStation, parseTrainResponse, stationSearchByNameAndColor}

