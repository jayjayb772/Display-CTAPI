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
 * /orchestratorController/:
 *   get:
 *     description: gets all contact lists
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: send a text
 */
orchestratorController.get('/train-times', (req, res) => {
    debuglog("orchestratorController home")
    if(req.query.name !=='undefined' && req.query.color !=='undefined') {
        console.log(req.query);
        console.log("GET OUT!")
        getTrainsByStationAndColor(req.query.name, req.query.color).then((r) => {
            res.send(r);
        }).catch(err => {
            res.send(err).status(500)
        })
    }else{
        getDefaultTrains().then((r) => {
            res.send(r);
        }).catch(err => {
            res.send(err).status(500)
        })
    }
})


module.exports = orchestratorController;
