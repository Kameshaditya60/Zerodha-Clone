const express = require('express');
const router = express.Router();
const { PositionsModel } = require('../model/PositionsModel');

// GET /api/positions
router.get('/', async (req, res) => {
    try {
        const allPositions = await PositionsModel.find({});
        res.json(allPositions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching positions', error: error.message });
    }
});

// GET /api/positions/:id
router.get('/:id', async (req, res) => {
    try {
        const position = await PositionsModel.findById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.json(position);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching position', error: error.message });
    }
});

module.exports = router;
