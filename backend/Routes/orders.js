const express = require('express');
const router = express.Router();
const { OrdersModel } = require('../model/OrdersModel');

// GET /api/orders
router.get('/', async (req, res) => {
    try {
        const allOrders = await OrdersModel.find({});
        res.json(allOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
    try {
        const order = await OrdersModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
});

// POST /api/orders
router.post('/', async (req, res) => {
    try {
        const { name, quantity, price, mode } = req.body;
        
        if (!name || !quantity || !price || !mode) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newOrder = new OrdersModel({
            name,
            quantity,
            price,
            mode
        });
        
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

// DELETE /api/orders/:id (Cancel order)
router.delete('/:id', async (req, res) => {
    try {
        const order = await OrdersModel.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error: error.message });
    }
});

module.exports = router;
