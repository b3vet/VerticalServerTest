import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite"

const connection = new sqlite3.verbose();

let db = new connection.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            temperature DOUBLE, 
            humidity DOUBLE, 
            pressure DOUBLE,
            name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
        (err) => {
            if (err) {
                console.log("Table already created")
            }
        });  
    }
});


export default db;