const express = require('express');
const router = express.Router();
// const axios = require('axios');
const {allStocks}  = require('../controllers/StockController');
const StockController = require('../controllers/StockController');
// console.log('StockController:', StockController);
console.log('allStocks:', typeof StockController.allStocks);
// GET /api/stocks
router.get('/all', allStocks);

// GET /api/stocks/:symbol
// router.get('/:symbol', async (req, res) => {
//     const symbol = req.params.symbol.toUpperCase() + '.NS';
//     const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//             }
//         });
        
//         const result = response.data.chart.result[0];
//         const meta = result.meta;
        
//         const stockData = {
//             symbol: req.params.symbol,
//             name: meta.longName || meta.shortName,
//             price: meta.regularMarketPrice,
//             change: meta.regularMarketPrice - meta.previousClose,
//             changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100).toFixed(2),
//             open: meta.regularMarketOpen,
//             high: meta.regularMarketDayHigh,
//             low: meta.regularMarketDayLow,
//             previousClose: meta.previousClose,
//             volume: meta.regularMarketVolume
//         };
        
//         res.json(stockData);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching stock data', error: error.message });
//     }
// });

module.exports = router;
