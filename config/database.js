const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Alfred200',
    database: 'utibu'
});


module.exports = pool;