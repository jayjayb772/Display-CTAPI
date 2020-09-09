const sqlite3 = require('sqlite3').verbose();

const path = require('path')
const {debuglog} = require("../../util/debugCommands");

//'./bin/db/GTFS.db'
function openConToDB(dbFileName) {
    return new sqlite3.Database(path.resolve(__dirname, dbFileName), (error) => {
        if (error) {
            debuglog(error)
            debuglog("Bad open db")
            return;
        } else {
            debuglog("successfully initiated sqlite DB")
        }
    });
}

function closeConToDB(db) {
    db.close((err) => {
        if (err) {
            debuglog("Bad close db")
            return console.error(err.message);
        }
        debuglog('Close the database connection.');
    });
}

async function queryDB(path, table, rows, values) {
    return new Promise(async function (resolve, reject) {
        let resp;
        let db = await openConToDB(path);
        let sql = `SELECT * FROM ${table} WHERE `;
        rows.forEach(r => {
            if (r !== rows[0]) {
                sql += `AND `
            }
            sql += `${r} = ? `
        })

        resp = db.serialize(function () {
            return db.get(sql, values, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err)
                }
                if (row) {
                    resolve(row);
                } else {
                    debuglog(`No ${row} found with the value of ${value}`);
                    reject("No Row")
                }
            });
        });
        closeConToDB(db);
    })
}

module.exports = {openConToDB, closeConToDB, queryDB}

