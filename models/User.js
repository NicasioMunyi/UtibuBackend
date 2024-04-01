const pool = require('./database');

async function getUserById(userId) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
        connection.release();
        return rows[0]; // Assuming user ID is unique and returning the first row
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching user by ID');
    }
}

async function createUser(user) {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query('INSERT INTO users SET ?', [user]);
        connection.release();
        return result.insertId; // Return the ID of the newly inserted user
    } catch (err) {
        console.error(err);
        throw new Error('Error creating user');
    }
}

module.exports = {
    getUserById,
    createUser
};