const request = require('request');
const querystring = require('querystring');
const gtfs = require("gtfs");
const config = require('bin/configs/gtfsConfig.json');

function getDefaultTrains(){

}

function getTrainsByStation(station){

}

function parseTrainResponse(trainData){

}

async function stationSearchByNameAndColor(name, color){
    const db = await gtfs.openDb(config);
    const stops = await gtfs.getStops(
        {
            stop_name: [
                name
            ]
        }
    );
    console.log(stops);
    return stops;
}

module.exports = {getDefaultTrains, getTrainsByStation, parseTrainResponse, stationSearchByNameAndColor}

