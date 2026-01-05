const {Schema } = require('mongoose');
const PositionsSchema = new Schema({
    product: {type: String},
    name : {type: String},
    quantity: {type: Number},
    averagePrice: {type: Number},
    currentPrice: {type: Number},
    net: {type: Number},
    day: {type: String},
    isLoss: {type: Boolean}
});
module.exports = {PositionsSchema};