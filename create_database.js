const debug = require('debug')('monprojetdemo:create_database');
const mysql = require('mysql2'); 

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mysql'
});
connection.query(
    'create database studentdb',
    function(err, results, fields) {
      debug(err);
      debug(results); // results contains rows returned by server
      connection.close();
    }
);
