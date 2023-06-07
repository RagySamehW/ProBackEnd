const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    UserId: String,

    item:[{ productId: String,
    productName: String,
    productPrice: Number,
    quantity:{ 
      type: Number ,
      default: 0
     },
  } ],
     totalPrice:{
      type: Number,
      default: 0
     },
    
     address:{
        type: String,
        required: true,
        
     },
      address2:{
        type: String,
        required: true,
        
      },
      additionaladd:{
        type: String,
        required: false,

      },

      city:{
        type: String,
        required: true,
      },
       phone:{
        type: String,
        required: true,
       }
  });
const Orders = mongoose.model('Order', orderSchema);
module.exports = Orders;
