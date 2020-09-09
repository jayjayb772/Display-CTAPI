const express = require('express');
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
    res.send("orchestratorController home");
})


module.exports = orchestratorController;
