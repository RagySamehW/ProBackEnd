const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    
  },
  Size: {
    type: String,
    
  },
  Price: {
    type: Number,
    required: true
  },
  Quantity:{
    type : Number,
  },
}, { timestamps: true });

const carts = mongoose.model('Cart', cartSchema);
module.exports = carts;
