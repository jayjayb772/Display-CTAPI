const sqlite3 = require('sqlite3').verbose();

//'./bin/db/GTFS.db'
function openConToDB(path) {
    let db = new sqlite3.Database(path, sqlite3.OPEN_CREATE, (error) => {
        if (error) {
            console.log(error)
            return;
        } else {
            console.log("successfully initiated sqlite DB")
        }
    });
    return db;
}
function closeConToDB(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function queryDB(path, table, row, value){
    let resp;
    let db = openConToDB(path);

    let sql = `SELECT ${row} id
           FROM ${table}
           WHERE ${row}  = ?`;

    db.get(sql, [value], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if(row) {
            resp = row
            console.log(row.id, row.name)
        }else {
            console.log(`No ${row} found with the value of ${value}`);
            return;
        }
    });
    closeConToDB(db);
    return resp;
}


