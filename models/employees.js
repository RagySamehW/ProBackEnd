const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    
  },
  Email: {
    type: String,
    required: true
  },
  Phone:{
    type : Number,
  },
  Type: {
    type: String,
  },
}, { timestamps: true });

const employees = mongoose.model('Employees', employeeSchema);
module.exports = employees;