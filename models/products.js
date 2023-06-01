const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    
  },
  Size: {
    type: String,
    required: true
  },
  Quantity:{
    type : Number,
  },
  Description: {
    type: String,
  },
  Smalldesc: {
    type: String,
  },
  Image:{
    type: String,
  },
}, { timestamps: true });

const products = mongoose.model('Product', productSchema);
module.exports = products;
