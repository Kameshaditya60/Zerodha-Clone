const {Schema} = require('mongoose');
const HoldingSchema = new Schema({
    name: {type: String},
    quantity: {type: Number},
    averagePrice: {type: Number},
    currentPrice: {type: Number},
    profitLoss: {type: Number},
    net:{type: String},
    day: {type: String},
});

module.exports = {HoldingSchema};