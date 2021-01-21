const express = require('express');
const {getDefaultTrains} = require("../services/ctaService");
const {getTrainsByStationAndColor} = require("../services/ctaService");
const {debuglog} = require("../util/debugCommands");
const orchestratorController = express.Router()

/**
 * @swagger
 *
 * /orchestratorController/:
 *   get:
 *     description: gets all contact lists
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: send a text
 */
orchestratorController.get('/', (req, res) => {
    debuglog("orchestratorController home")
    res.send("orchestratorController home");
})

/**
 * @swagger
 *
 * /orchestratorController/train-times:
 *   get:
 *     description: gets all contact lists
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: send a text
 */
orchestratorController.get('/train-times', (req, res) => {
    debuglog(req.query.length)
    if(req.query === undefined || (req.query.name === 'undefined')){
        getDefaultTrains().then((r) => {
            res.send(r);
        }).catch(err => {
            res.send(err).status(500)
        })
    }else{
    //if((req.query.name !=='undefined' && req.query.color !=='undefined') || (req.query.name !==null && req.query.color!==null) || !req.query.isEmpty()) {
        console.log(req.query);
        console.log("GET OUT!")
        getTrainsByStationAndColor(req.query.name, req.query.color).then((r) => {
            res.send(r);
        }).catch(err => {
            res.send(err).status(500)
        })

    }
})


module.exports = orchestratorController;
