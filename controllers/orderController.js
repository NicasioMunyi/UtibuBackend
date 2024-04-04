const orderService = require('../service/orderServices');

// Controller function to handle order creation
async function createOrder(req, res) {
    try {
        const orderData = req.body;
        const userId = req.session.userId;
        const orderId = await orderService.createOrder(orderData, userId);
        res.status(201).json({ orderId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
}

// Controller function to handle retrieving an order by ID
async function getOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching order');
    }
}
async function getOrdersByUserId(req, res) {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).send('User not authenticated');
        }
        const orders = await orderService.getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Fetching orders by user ID');
    }
}


async function getOrderDetails(req, res) {
    const orderId = req.params.orderId;
    try {
        const orderDetails = await orderService.getOrderDetails(orderId);
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Export the controller functions for use in the orderRoutes.js file
module.exports = {
    getOrdersByUserId,
    createOrder,
    getOrderById,
    getOrderDetails
};
