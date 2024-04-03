const pool = require('../config/database');

async function createOrder(orderData, userId, status) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Insert the order data into the Orders table
        const [orderResult] = await connection.query('INSERT INTO Orders (user_id, status) VALUES (?, ?)', [
            userId,
            status
        ]);
        const orderId = orderResult.insertId;

        // Insert each item in the order into the Order_Items table
        for (const item of orderData.items) {
            await connection.query('INSERT INTO Order_Items (order_id, medication_id, quantity, unit_price) VALUES (?, ?, ?, ?)', [
                orderId,
                item.medication_id,
                item.quantity,
                item.unitPrice
            ]);
        }

        // Commit the transaction
        await connection.commit();
        return orderId;
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error(error);
        throw new Error('Error creating order');
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


// Function to retrieve an order by its ID
async function getOrderById(orderId) {
    try {
        const [rows] = await pool.query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        if (rows.length === 0) {
            throw new Error('Order not found');
        }
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching order by ID');
    }
}

async function getMedicationsByOrderId(orderId) {
    try {
        const [rows] = await pool.query(`
            SELECT oi.*, m.name AS medication_name
            FROM Order_Items oi
            JOIN Medications m ON oi.medication_id = m.medication_id
            WHERE oi.order_id = ?
        `, [orderId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching medications by order ID');
    }
}

async function getOrdersByUserId(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM Orders WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error Fetching orders by userID');
    }
}

// Export the model functions for use in other modules
module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    getMedicationsByOrderId
};
