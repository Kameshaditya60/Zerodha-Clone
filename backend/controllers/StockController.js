const axios = require('axios');
const allStocks =  async (req, res) => {
    const symbols = [
        'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
  'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'LT.NS', 'AXISBANK.NS',
  'KOTAKBANK.NS', 'HINDUNILVR.NS', 'MARUTI.NS', 'ASIANPAINT.NS', 'WIPRO.NS'
    ];

    const getStockData = async (symbol) => {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
        
        // console.log('Fetching data for', symbol);
        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            
            const result = response.data.chart.result[0];
            const meta = result.meta;
            // console.log('Fetched data for', symbol, meta);
            
            return {
                symbol: symbol.replace('.NS', ''),
                name: meta.longName || meta.shortName,
                price: meta.regularMarketPrice,
                change: meta.regularMarketPrice - meta.previousClose,
                changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100).toFixed(2)
            };
        } catch (error) {
            console.error(`Error fetching ${symbol}:`, error.message);
            return null;
        }
    };

    try {
        const stockPromises = symbols.map(symbol => getStockData(symbol));
        const results = await Promise.all(stockPromises);
        const validStocks = results.filter(stock => stock !== null);
        
        res.json(validStocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stocks', error: error.message });
    }
}
module.exports = {
    allStocks
};

