// Import the order model
const Order = require('../models/orderModel');

// Function to create a new order
async function createOrder(orderData, userId) {
    try {
        // Call the createOrder function from the order model
        const orderId = await Order.createOrder(orderData, userId);
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

// Export the service functions for use in other modules
module.exports = {
    createOrder,
    getOrderById
};
