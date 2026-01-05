require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

const {PositionsModel} = require('./model/PositionsModel');
const {HoldingsModel} = require('./model/HoldingsModel');
const {OrdersModel} = require('./model/OrdersModel');
const axios = require('axios');


const app = express();

// app.get ('/addholdings', async (req, res) => {
//     let tempHoldings = require('../dashboard/src/data/data').holdings;
//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             quantity: item.quantity,
//             averagePrice: item.averagePrice,
//             currentPrice: item.currentPrice,
//             net: item.net,
//             day: item.day,
//         });
//         newHolding.save();
//     });
//     res.send('Holdings added');
// });
// app.get('/addpositions', async (req, res) => {
//     let tempPositions = require('../dashboard/src/data/data').positions;
//     tempPositions.forEach((item) => {
//         let newPosition = new PositionsModel({
//             name: item.name,
//             quantity: item.quantity,
//             averagePrice: item.averagePrice,
//             currentPrice: item.currentPrice,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });
//         newPosition.save();
//     });
//     res.send('Positions added');
// });
// app.get('/addorders', async (req, res) => {
//     let tempOrders = require('../dashboard/src/data/data').orders;
//     tempOrders.forEach((item) => {
//         let newOrder = new OrdersModel({
//             name: item.name,
//             quantity: item.quantity,
//             averagePrice: item.averagePrice,
//             currentPrice: item.currentPrice,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });
//         newOrder.save();
//     });
//     res.send('Orders added');
// });

mongoose.connect(url)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(cors({
           origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", authRoute);

app.get('/allHoldings', async (req, res) => {
    let allholdings = await HoldingsModel.find({});
    res.json(allholdings);
});
app.get('/allPositions', async (req, res) => {
    let allpositions = await PositionsModel.find({});
    res.json(allpositions);
}); 
app.post('/neworders', async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        mode: req.body.mode
    });
    newOrder.save();
    res.json({message: 'Order created'});
});
app.get('/api', async (req, res) => {
  try {
// //     const POPULAT_STOCKS = [
// //   'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
// //   'TATAMOTORS.NS', 'ONGC.NS', 'NTPC.NS', 'POWERGRID.NS', 'ADANIGREEN.NS'
// // ];

//     const response = await axios.get(
// // `https://military-jobye-haiqstudios-14f59639.koyeb.app/stock/list?symbols=${POPULAT_STOCKS}`,
//     // `https://query1.finance.yahoo.com/v8/finance/chart/${POPULAT_STOCKS}`,
//     `https://nse-api-khaki.vercel.app/stock/list?symbols=RELIANCE,TCS,INFY,HDFCBANK&res=num`,
//      {
//         headers: {
//           'User-Agent': 'Mozilla/5.0',
//         },
//     });


 const symbols = ['RELIANCE','TCS','INFY','HDFCBANK','ICICIBANK','SBIN','BHARTIARTL','ITC','HINDUNILVR','LT'];
const symbol = RELIANCE.NS; // Example symbol, replace with desired symbol
const API_BASE_URL = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
//  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    
    const response = await axios.get(API_BASE_URL,
        {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
  });
     
   const result = response.data.chart.result[0];
    const meta = result.meta;
    const quote = result.indicators.quote[0];
    console.log('result api ka ', result);

     return {
      symbol: symbol.replace('.NS', '').replace('.BO', ''),
      name: meta.longName || meta.shortName || symbol,
      price: meta.regularMarketPrice,
      change: meta.regularMarketPrice - meta.previousClose,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100).toFixed(2),
      open: meta.regularMarketOpen,
      high: meta.regularMarketDayHigh,
      low: meta.regularMarketDayLow,
      previousClose: meta.previousClose,
      volume: meta.regularMarketVolume,
      marketCap: meta.marketCap,
      currency: 'INR'
    };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/allstocks', async (req, res) => {
    const symbols = [
  'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
  'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'LT.NS', 'AXISBANK.NS'
];

const getStockData = async (symbol) => {
  // Har symbol ke liye alag URL banaya
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log( typeof response);
    console.log('response for ', symbol, response);
    const result = response.data.chart.result[0];
    const meta = result.meta;
    
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

// Sab symbols ko fetch karo
const getAllStocks = async () => {
  const stockPromises = symbols.map(symbol => getStockData(symbol));
  const results = await Promise.all(stockPromises);
  const validStocks = results.filter(stock => stock !== null);
  console.log('validStocks:', validStocks);
  
  return res.json(validStocks);
};

// Use karo
getAllStocks().then(stocks => {
  console.log(stocks);
});

});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });