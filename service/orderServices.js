// Import the order model
const Order = require('../models/orderModel');
const Medication = require('..//models/Medication');
const pool = require('../config/database');

async function getCurrentStockLevels() {
    try {
        // Query the database to get current stock levels of all medications
        const [stockRows] = await pool.query('SELECT medication_id, stock_quantity FROM Medications');
        // Convert the result into an object where keys are medication IDs and values are stock levels
        const stockLevels = {};
        stockRows.forEach(row => {
            stockLevels[row.medication_id] = row.stock_quantity;
        });
        return stockLevels;
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving current stock levels');
    }
}

// Function to create a new order
async function createOrder(orderData, userId) {
    try {
        // Retrieve current stock levels
        const stockLevels = await getCurrentStockLevels();

        console.log(stockLevels);

        // Check stock availability and update stock levels if available
        for (const item of orderData.items) {
            const requestedQuantity = item.quantity;
            const availableStock = stockLevels[item.medicationId];
            if (requestedQuantity > availableStock) {
                throw new Error(`Insufficient stock for medication ID ${item.medicationId}`);
            }
        }

        // Set order status as confirmed
        const status = 'Confirmed';

        // Save order and update stock levels
        const orderId = await Order.createOrder(orderData, userId, status);
        console.log(orderData)
        // Deduct ordered quantities from stock levels
        for (const item of orderData.items) {
            console.log(item)
            const currentStock = stockLevels[item.medication_id];

            console.log('current Stock', currentStock);
            const newStock = currentStock - item.quantity;
            console.log(item.medication_id);
            console.log(newStock);

            await Medication.updateStock(item.medication_id, newStock);
        }

        return orderId;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating order');
    }
}

// Function to retrieve an order by ID
async function getOrderById(orderId) {
    try {
        // Call the getOrderById function from the order model
        const order = await Order.getOrderById(orderId);
        return order;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching order by ID');
    }
}

async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.getOrdersByUserId(userId);
        return orders;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching users order');
    }
}

async function getOrderDetails(orderId) {
    try {

        console.log(orderId);
        const order = await Order.getOrderById(orderId);
        // Fetch medication details associated with the order
        const medicationDetails = await Order.getMedicationsByOrderId(orderId);
        console.log(medicationDetails);
        return { order, medicationDetails };
    } catch (error) {
        throw new Error('Error fetching order details');
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    getOrderDetails
};

