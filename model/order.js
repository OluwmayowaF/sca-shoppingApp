const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  type: {
    type: String,
  },
});

const order = mongoose.model('order', orderSchema);

module.exports = order;
