
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name:  String, // String is shorthand for {type: String}
    image: String,
    countInStock: Number,
    date: {type: Date, default: Date.now}
  });


exports.Order = mongoose.model('order', orderSchema);