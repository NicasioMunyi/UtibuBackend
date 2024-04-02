const pool = require('../config/database');

async function createOrder(orderData, userId) {
    let connection; // Declare connection variable outside try block

    try {
        // Start a database transaction
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Insert the order data into the Orders table
        const [orderResult] = await connection.query('INSERT INTO Orders (user_id, status) VALUES (?, ?)', [
            userId,
            'Active'
        ]);

        // Extract the order ID from the result
        const orderId = orderResult.insertId;

        // Insert each item in the order into the Order_Items table
        for (const item of orderData.items) {
            await connection.query('INSERT INTO Order_Items (order_id, medication_id, quantity, unit_price) VALUES (?, ?, ?, ?)', [
                orderId,
                item.medication_id,
                item.quantity,
                item.unit_price
            ]);
        }

        // Commit the transaction
        await connection.commit();

        return orderId; // Return the ID of the newly inserted order
    } catch (error) {
        // Rollback the transaction if an error occurs
        if (connection) {
            await connection.rollback();
        }
        console.error(error);
        throw new Error('Error creating order');
    } finally {
        // Release the connection in the finally block
        if (connection) {
            connection.release();
        }
    }
}

// Export the model function for use in other modules
module.exports = {
    createOrder
};



// Function to retrieve an order by its ID
async function getOrderById(orderId) {
    try {
        // Perform database operation to retrieve the order by its ID from the Orders table
        const [orderRows] = await pool.query('SELECT * FROM Orders WHERE order_id = ?', [orderId]);

        if (orderRows.length === 0) {
            throw new Error('Order not found');
        }

        // Perform database operation to retrieve the order items from the Order_Items table
        const [itemRows] = await pool.query('SELECT * FROM Order_Items WHERE order_id = ?', [orderId]);

        // Combine order details and items into a single object
        const order = {
            order: orderRows[0],
            items: itemRows
        };

        return order;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching order by ID');
    }
}

// Export the model functions for use in other modules
module.exports = {
    createOrder,
    getOrderById
};
