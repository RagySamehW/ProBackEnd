const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");
const Employees = require("./models/employees");
const Product = require("./models/products");
const Coupon = require("./models/coupon");
const Cart = require("./models/cart");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require('fs');
//express app
const app = express();
var username = "";
const dbURI =
 "mongodb+srv://RagyW:1234@cluster0.vioqz3g.mongodb.net/?retryWrites=true&w=majority";

mongoose
.connect(dbURI)
.then((result) =>
app.listen(5000, () => {
console.log("Running surver!!http://localhost:5000  ");
})
)
.catch((err) => console.log(err));
app.use(express.urlencoded({ extended: true }));


/*
Employees.find({Name:"t"}).then((data) => {
console.log(data);
})
*/

//middleware/
app.use(fileUpload());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(express.static("Public"));
//app.use('/Images',express.static('Public/Images'));

app.set("Views", "./Views");
app.set("view engine", "ejs");


app.use(session({
name : 'codeil',
secret : 'something',
resave :false,
saveUninitialized: true,
cookie : {
maxAge:(1000 * 60 * 100)
}      
}));

let x = 1;

const custemors = [
{ id: "1", name: " Ragy" },
{ id: "2", name: "Sameh" },
{ id: "3", name: "Mariam" },
{ id: "4", name: "Maggie" },
];

require("dotenv/config");

const api = process.env.API_V1;

var p1 = new Product({
ProductName: "T-Shirt",
Price: 240,
Size: "L",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});


p1 = new Product({
ProductName: "T-Shirt",
Price: 240,
Size: "L",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});
////////////////////////////////////////////////////////////////////////////////////////////////////

p1 = new Product({
ProductName: "T-Shirt",
Price: 240,
Size: "S",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});

p1 = new Product({
ProductName: "T-Shirt",
Price: 240,
Size: "L",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});

p1 = new Product({
ProductName: "T-Shirt",
Price: 240,
Size: "XL",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});


p1 = new Product({
ProductName: "Shirt",
Price: 370,
Size: "S",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});

p1 = new Product({
ProductName: "Shirt",
Price: 370,
Size: "L",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});

p1 = new Product({
ProductName: "Shirt",
Price: 370,
Size: "XL",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});


p1 = new Product({
ProductName: "Shoes",
Price: 680,
Size: "43",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
console.log(err);
// Handle the error, e.g., display an error message or redirect to an error page
});

///////////////////////////////////////////////
p1 = new Product({
ProductName: "Shoes",
Price: 680,
Size: "44",
Quantity: 100,
Description:"Good",
});

p1.save()
.then(result => {
})
.catch(err => {
    console.log(err);
    // Handle the error, e.g., display an error message or redirect to an error page
});
