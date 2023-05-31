const Employees = require("../models/employees");
const Cart = require("../models/cart");
const Product = require("../models/products");
const objectId = require("mongoose").ob;
const path = require("path");

const Getuser = (req, res) => {
  var query = { Name: req.body.un, Password: req.body.pw };
  Employees.findOne(query)
    .then((result) => {
      if (result) {
        console.log(result);
        req.session.user = result;
        res.render("Home", {
          user: req.session.user === undefined ? "" : req.session.user,
        });
      } else {
        res.send("invalid data");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const Adduser = (req, res) => {
  console.log(req.body);
  const emp = new Employees({
    Name: req.body.un,
    Password: req.body.pw,
    Email: req.body.em,
    Type: req.body.tp,
    Phone: req.body.ph,
  });
  emp
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const AddtoCart = (req, res) => {
  Cart.findOne({
    ProductName: req.body.pname,
    UserName: req.session.user.Name,
    Size: req.body.psize,
  }).then((data) => {
    if (data == null) {
      const cart = new Cart({
        UserName: req.session.user.Name,
        ProductName: req.body.pname,
        Price: parseInt(req.body.pprice),
        Quantity: parseInt(req.body.pquantity),
        Size: req.body.psize,
      });
      cart
        .save()
        .then((result) => {
          res.redirect("/cart");
        })
        .catch((err) => {
          console.log(err);
          // Handle the error, e.g., display an error message or redirect to an error page
        });
    } else {
      Cart.findOneAndDelete({
        ProductName: req.body.pname,
        UserName: req.session.user.Name,
        Size: req.body.psize,
      }).then((data) => {});
      var q = data.Quantity;
      const cart = new Cart({
        UserName: req.session.user.Name,
        ProductName: req.body.pname,
        Price: parseInt(req.body.pprice),
        Quantity: parseInt(req.body.pquantity) + q,
        Size: req.body.psize,
      });
      cart
        .save()
        .then((result) => {
          res.redirect("/cart");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const Cartv = (req, res) => {
  var carts;
  Cart.find({ UserName: req.session.user.Name }).then((data) => {
    carts = data;
    res.render("Cart", {
      carts,
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });
};

const RemoveCart = (req,res) =>{
    Cart.findOneAndDelete({
        UserName: req.session.user.Name,
        ProductName: req.body.pname,
        Size: req.body.psize,
      })
        .then((result) => {
          res.redirect("/cart");
        })
        .catch((err) => {
          console.log(err);
        });
};

const Checkout = (req,res) =>{
    var substrs = req.body.carts.split(",");
  for (var c = 0; c < substrs.length; c++) {
    var pro_name = "";
    var pro_price = "";
    var pro_size = "";
    if (substrs[c].includes("ProductName")) {
      pro_name = substrs[c].split("'")[1];
      while (!substrs[c].includes("Size")) {
        c = c + 1;
      }
      pro_size = substrs[c].split("'")[1];

      while (!substrs[c].includes("Price")) {
        c = c + 1;
      }
      pro_price = parseInt(substrs[c].split(" ")[3]);

      while (!substrs[c].includes("Quantity")) {
        c = c + 1;
      }
      pro_quant = parseInt(substrs[c].split(" ")[3]);
      Cart.findOneAndDelete({
        UserName: req.session.user.Name,
        ProductName: pro_name,
        Size: pro_size,
      }).then((result) => {
        var nm = result.ProductName;
        var pr = result.Price;
        var sz = result.Size;
        var qt = result.Quantity;
        var ds = result.Description;
        Product.findOneAndDelete({ ProductName: nm, Size: sz }).then((data) => {
          console.log(data.Quantity);
          console.log(result.Quantity);
          console.log(qt);
          qt = data.Quantity - qt;

          const prod = new Product({
            ProductName: nm,
            Price: pr,
            Size: sz,
            Quantity: qt,
            Description: ds,
          });
          prod
            .save()
            .then((result) => {
              res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
              // Handle the error, e.g., display an error message or redirect to an error page
            });
        });
      });
    }
  }
};

module.exports = {
  Getuser,
  Adduser,
  AddtoCart,
  Cartv,
  RemoveCart,
  Checkout
};