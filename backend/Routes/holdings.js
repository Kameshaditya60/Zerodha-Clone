const express = require('express');
const router = express.Router();
const { HoldingsModel } = require('../model/HoldingsModel');

// GET /api/holdings
router.get('/', async (req, res) => {
    try {
        const allHoldings = await HoldingsModel.find({});
        res.json(allHoldings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching holdings', error: error.message });
    }
});

// GET /api/holdings/:id
router.get('/:id', async (req, res) => {
    try {
        const holding = await HoldingsModel.findById(req.params.id);
        if (!holding) {
            return res.status(404).json({ message: 'Holding not found' });
        }
        res.json(holding);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching holding', error: error.message });
    }
});

module.exports = router;
