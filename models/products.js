const mongoose = require('mongoose');
const Schema2 = mongoose.Schema;
const productSchema = new Schema2({
  Pname: {
    type: String,
    required: true,
  },
  Pdescription: {
    type: String,
    
  },
  Pprice: {
    type: String,
    required: true
  },
}, { timestamps: true });

const products = mongoose.model('Products', productSchema);
module.exports = products;