const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const couponSchema = new Schema({
  CouponSerial: {
    type: String,
    required: true,
  },
  DiscountPercentage: {
    type: Number,
    
  },
}, { timestamps: true });

const coupons = mongoose.model('Coupons', couponSchema);
module.exports = coupons;