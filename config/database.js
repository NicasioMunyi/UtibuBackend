const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL username
    password: 'Alfred200', // Replace with your MySQL password
    database: 'utibu' // Replace with your MySQL database name
});


module.exports = pool;