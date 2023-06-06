const Employees = require("../models/employees");
const Cart = require("../models/cart");
const Product = require("../models/products");
const objectId = require("mongoose").ob;
const path = require("path");

const Getuser = async(req, res) => {
  var query = { Name: req.body.un, Password: req.body.pw };
  const products = await Product.aggregate([{ $sample: { size: 8 } }]).exec();
    const productss = await Product.aggregate([{ $sample: { size: 4 } }]).exec();
  Employees.findOne(query)
    .then((result) => {
      if (result) {
        console.log(result);
        req.session.user = result;
        res.render("Home", { productss ,products,
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
          res.redirect("/user/cart");
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
          res.redirect("/user/cart");
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
          res.redirect("/user/cart");
        })
        .catch((err) => {
          console.log(err);
        });
};



const checkUN = (req, res) => {
    var query = { Name: req.body.Name };
    Employees.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const removeFromWishlist = (req, res) => {
    const productId = req.params.productId;
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/wishlist');
      } else {
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        user.save();
        res.redirect('/wishlist');
      }
    });
  };

checkout: async(req,res)=>{
      console.log('hello');
        const{cart}=req.query;
          const productlist= await Cart.findById({_id:cart});
          console.log("found the product "+productlist);
          if(productlist){
           
             res.render('checkout',{user:req.session.user===undefined?"":req.session.user,productlist});
          }
      
    },
  };

order:async(req,res)=>{
        const {user_id,address,address2,add,city,phone,cart}=req.body;
console.log('order detail');
const productlist= await Cart.findById({_id:cart});
  // Create an array to hold the item objects
  const items = [];

  // Iterate through the productlist array
  productlist.item.forEach((item) => {
    // Create an object for each item
    const newItem = {
      productId: item.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      quantity: item.quantity || 0 // Default quantity to 0 if not provided
    };

    // Push the item object to the items array
    items.push(newItem);
  });

  // Create a new order document using the Order model
  const newOrder = new Order({
    UserId: user_id,
    item: items,
    address: address,
    address2: address2,
    additionaladd: add,
    city: city,
    phone: phone
  });
  await newOrder.save();
 await Cart.findByIdAndUpdate({ _id: cart }, { $set: { item: [], totalPrice: 0 } });

  // Save the new order document to the database
 
    if(newOrder){
      console.log('Order saved:', newOrder);
      // Handle success and continue with your code

      res.redirect('/')
    }}
    

  };



module.exports = {
  Getuser,
  Adduser,
  AddtoCart,
  Cartv,
  RemoveCart,
  checkout,
  checkUN,
  order,
  removeFromWishlist
};
