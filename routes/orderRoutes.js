const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to retrieve an order by ID
router.get('/:id', orderController.getOrderById);

// Export the router for use in the main app.js file
module.exports = router;
