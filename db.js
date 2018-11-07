var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Crust'
},{multipleStatements: true});
db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;