const moment = require('moment-timezone');
const {debuglog} = require("../util/debugCommands");
function buildTrainJSON(etaObj, station){
    let resp = {};
    etaObj.forEach(arrival=>{
        //etaObj.index(arrival)
        let color = routeToColor(arrival.rt[0]);
        let hex= getHex(color);
        let train = {
            "dest":arrival.stpDe[0],
            "color":color,
            "colorHex":hex,
            "arrTime":arrival.arrT[0],
            "eta":tConvert(arrival.arrT[0]),
            "where":station
        }
        resp[`Train ${etaObj.indexOf(arrival) +1}`] = train;
    })
    return resp;
}

function routeToColor(rt){
    switch (rt.toUpperCase()) {
        case "RED":
            return 'Red';
        case "GREEN":
            return 'Green';
        case "BLUE":
            return 'Blue';
        case "BRN":
            return 'Brown';
        case "P":
            return 'Purple';
        case "ORG":
            return 'Orange';
        case "Y":
            return 'Yellow';
        case "PINK":
            return 'Pink';
        default:
            console.log(rt)
            console.log("BAD SHOULDNT BE HERE")
            break;
    }
}

function getHex(color) {
    switch (color.toUpperCase()) {
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

function tConvert (time) {
    let y = time.substring(0,4);
    let m = time.substring(4,6);
    let d = time.substring(6,8);
    let clock = time. substring(9);
    time = `${y}-${m}-${d} ${clock}`
    debuglog(`Time: ${time}`)
    debuglog(`Time from Moment ${moment().tz("America/Chicago")}`)
    let a = millisToMinutesAndSeconds(moment(time).tz("America/Chicago").diff(moment().tz("America/Chicago")))
    return a;
}

function millisToMinutesAndSeconds(millis) {
    debuglog(`millis ${millis}`)
    let minutes = Math.floor(millis / 60000);
    debuglog(`minutes ${minutes}`)
    return minutes + " Mins";
}


module.exports = {buildTrainJSON}