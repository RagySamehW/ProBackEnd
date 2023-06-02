const express = require("express");
const Product = require("../models/products");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("Home", {
      user: req.session.user === undefined ? "" : req.session.user,
 });
  });

  router.get("/Contact", (req, res) => {
    res.render("Contact", {
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });

  router.get("/Product", (req, res) => {
    var products;
    Product.find().then((data) => {
      products = data;
      res.render("ProductsPage", {
        products,
        user: req.session.user === undefined ? "" : req.session.user,
      });
     })
  });

  router.post("/Item", (req, res) => {
    var products;
    Product.find({ ProductName: req.body.pname, Size: req.body.psize }).then(
      (data) => {
        products = data;
        console.log(products);
        res.render("Item", {
          products,
          user: req.session.user === undefined ? "" : req.session.user,
        });
      }
    );
  });

  module.exports = router;