const {Schema} = require('mongoose');
const StockSchema = new Schema({
    symbol: String,
  name: String,
  price: Number,
  change: Number,
  lastUpdated: { type: Date, default: Date.now }
});
module.exports = {StockSchema};