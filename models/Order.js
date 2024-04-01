const pool = require('./database');

async function getAllOrders() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM orders');
        connection.release();
        return rows;
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching orders');
    }
}

async function getOrderById(orderId) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        connection.release();
        return rows[0]; // Assuming order ID is unique and returning the first row
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching order by ID');
    }
}

module.exports = {
    getAllOrders,
    getOrderById
};