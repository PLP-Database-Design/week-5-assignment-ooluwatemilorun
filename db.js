// db.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Connection error', err.stack);
        return;
    }
    console.log('Connected to the database!');
    connection.release(); // Release the connection back to the pool
});

module.exports = pool.promise(); // Use promise wrapper for async/await
