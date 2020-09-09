require('dotenv').config();
const express = require('express');
const orchestratorController = require('./src/main/controllers/orchestratorController')
const app = express();
const {debuglog} = require('./src/main/util/debugCommands');
const ENV = process.env.ENV;
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const {queryDB} = require("./src/main/services/sqLite/sqLiteService");
const {closeConToDB} = require("./src/main/services/sqLite/sqLiteService");
const {openConToDB} = require("./src/main/services/sqLite/sqLiteService");
const {stationSearchByNameAndColor} = require("./src/main/services/ctaService");
const options = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Messaging Service', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: ['./src/main/controllers/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);



stationSearchByNameAndColor("Montrose", "Brown").then(r => {
    debuglog(r)
});
stationSearchByNameAndColor("Diversey", "Brown").then(r => {
    debuglog(r)
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: base url
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 */
app.get('/', (req, res) =>{
    debuglog("HOME")
    res.send("Hello World!");
})

app.use('/orchestrator', orchestratorController)


module.exports = app;