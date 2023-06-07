const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contacttSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },
  Message: {
    type: String,
  },
  Done:{
    type: Boolean,
  }
}, { timestamps: true });

const Contacts = mongoose.model('Contact', contacttSchema);
module.exports = Contacts;
