const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to retrieve orders by user ID
router.get('/myorders', orderController.getOrdersByUserId);

// Route to retrieve an order by ID
router.get('/:id', orderController.getOrderById);

// Define route to retrieve order details by ID
router.get('/orders/:orderId', orderController.getOrderDetails);

module.exports = router;
