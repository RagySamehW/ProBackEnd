const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone:{
    type : Number,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
}, { timestamps: true });

const employees = mongoose.model('Employees', employeeSchema);
module.exports = employees;