var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: '',
    database: 'crust'
});

module.exports = connection;