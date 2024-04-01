// userModel.js

const pool = require('../config/database');

async function createUser(userData) {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('INSERT INTO users SET ?', [userData]);
        connection.release();
        return result.insertId;
    } catch (error) {
        throw new Error('Error creating user');
    }
}

async function findUserByEmail(email) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        connection.release();
        return rows[0];
    } catch (error) {
        throw new Error('Error finding user by email');
    }
}

module.exports = { createUser, findUserByEmail };
