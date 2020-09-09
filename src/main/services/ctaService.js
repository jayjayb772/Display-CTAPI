const request = require('request');
const querystring = require('querystring');
const {queryDB} = require("./sqLite/sqLiteService");
const {buildTrainJSON} = require("../DataObjects/trainTimes")
const xml2js = require('xml2js');

async function getDefaultTrains() {
    return new Promise(async function (resolve, reject) {
        await getTrainsByStation(process.env.MontroseID)
            .catch(err=>{reject(err)})
            .then((trains)=>{
            xml2js.parseString(trains,{ mergeAttrs: true },(err, result) => {
                if(err) {
                    throw err;
                    reject(err)
                }
                resolve(buildTrainJSON(result.ctatt.eta, "Montrose"))
            });
        })
    });
}

function getTrainsByStationAndColor(stationName, stationColor){
    return new Promise(async function (resolve, reject) {
        stationSearchByNameAndColor(stationName, stationColor).catch(err=>{reject(err)}).then((station)=>{
            getTrainsByStation(station).catch(err=>{reject(err)}).then((trains)=>{
                xml2js.parseString(trains,{ mergeAttrs: true },(err, result) => {
                    if(err) {
                        throw err;
                        reject(err)
                    }
                    resolve(buildTrainJSON(result.ctatt.eta, stationName))
                });
            })
        });
    });
}

async function getTrainsByStation(station) {
    return new Promise(async function (resolve, reject) {
        let url = `${process.env.CTA_URL}mapid=${station}&max=5`;
        request.get(url, (err,res)=>{
            if(err){
                reject(err);
            }
            resolve(res.body)
        })
    });
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
            resolve(r.stop_parent_id);
        }).catch(err=>{
            reject(err);
        })
    })
}






module.exports = {getDefaultTrains, stationSearchByNameAndColor ,getTrainsByStationAndColor}

