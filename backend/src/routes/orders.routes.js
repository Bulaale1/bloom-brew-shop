const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.patch('/:id/status', ordersController.updateOrderStatus);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
