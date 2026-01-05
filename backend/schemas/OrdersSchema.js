const {Schema} = require('mongoose');
const OrdersSchema = new Schema({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    mode: {type: String}
});

module.exports = {OrdersSchema};