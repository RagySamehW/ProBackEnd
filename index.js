const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const objectId = require("mongoose").ob;
const path = require("path");
const Employees = require("./models/employees");
const Product = require("./models/products");
const Coupon = require("./models/coupon");
const Cart = require("./models/cart");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { assert } = require("console");
const fs = require('fs');
//express app
const app = express();
const dbURI =
  "mongodb+srv://RagyW:1234@cluster0.vioqz3g.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, () => {
      console.log("Running surver!!http://localhost:3000  ");
    })
  )
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: true }));

//middleware/
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(express.static("Public"));
//app.use('/Images',express.static('Public/Images'));

app.set("Views", "./Views");
app.set("view engine", "ejs");

app.use(session({ secret: "Your_Secret_Key" }));

require("dotenv/config");

const api = process.env.API_V1;

app.get("/editp/:id", (req, res) => {
  const pId = req.params.id;

  // Retrieve the user with the specified ID from the database
  Product.findOne({_id: pId})
    .then((pproduct) => {
      if (!pproduct) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        res.render("editproducts", { pproduct, user: req.session.user === undefined ? "" : req.session.user });
      }
    })
    .catch((err) => {
      console.error('Error retrieving user:', err);
      res.status(500).send('Error retrieving user');
    });
});

app.post('/editp/:id', (req, res) => {
  const pId = req.params.id;
  const pupdatedData = {
    ProductName: req.body.Name,
    Description: req.body.Description,
    Smalldesc: req.body.psdescription,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
   
    // Add more properties as needed
  };

  // Perform the update in the database using Mongoose or your preferred database library
  Product.findOneAndUpdate({ _id: pId }, pupdatedData, { new: true })
    .then((pupdatedData) => {
      if (!pupdatedData) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        console.log('product updated:', pupdatedData);
        res.redirect('/'); // Redirect to the appropriate page
      }
    })
    .catch((err) => {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
    });
});
app.get("/edit/:id", (req, res) => {
  const userId = req.params.id;

  // Retrieve the user with the specified ID from the database
  Employees.findOne({_id: userId})
    .then((Puser) => {
      if (!Puser) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        res.render("Edit_Users", { Puser, user: req.session.user === undefined ? "" : req.session.user });
      }
    })
    .catch((err) => {
      console.error('Error retrieving user:', err);
      res.status(500).send('Error retrieving user');
    });
});

app.post('/edit/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = {
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phone,
    Type: req.body.type,
    // Add more properties as needed
  };

  // Perform the update in the database using Mongoose or your preferred database library
  Employees.findOneAndUpdate({ _id: userId }, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        console.log('User updated:', updatedUser);
        res.redirect('/'); // Redirect to the appropriate page
      }
    })
    .catch((err) => {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
    });
});


app.post('/delete', (req, res) => {
  const userId = req.body.id;
  // Perform the deletion in the database using Mongoose or your preferred database library
  // Adapt this code based on your specific data model and database setup
  Employees.findOneAndDelete({ _id: userId })
    .then((deletedUser) => {
      if (!deletedUser) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        console.log('User deleted:', deletedUser);
        res.redirect('Addmin_Users'); // Redirect to the homepage or any other appropriate page
      }
    })
    .catch((err) => {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    });
});

app.post('/deleteP', (req, res) => {
  const proid = req.body.id;
  // Perform the deletion in the database using Mongoose or your preferred database library
  // Adapt this code based on your specific data model and database setup
  Product.findOneAndDelete({ _id: proid })
    .then((deletedpro) => {
      if (!deletedpro) {
        console.log('User not found');
        res.status(404).send('User not found');
      } else {
        console.log('User deleted:', deletedpro);
        res.redirect('/'); // Redirect to the homepage or any other appropriate page
      }
    })
    .catch((err) => {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.post("/signup-action", (req, res) => {
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
      // Handle the error, e.g., display an error message or redirect to an error page
    });
});

app.post("/profile", (req, res) => {
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
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("Home", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/Product", (req, res) => {
  var products;
  Product.find().then((data) => {
    products = data;
    res.render("ProductsPage", {
      products,
      user: req.session.user === undefined ? "" : req.session.user,
    });
   })
});

app.post('/add_to_cart', (req, res) => {
  
    Cart.findOne({ProductName:req.body.pname,UserName:req.session.user.Name, Size:req.body.psize}).then((data) => {
  
      if (data ==null)
      {
        const cart = new Cart({
          UserName: req.session.user.Name,
          ProductName: req.body.pname,
          Price: parseInt(req.body.pprice),
          Quantity: parseInt(req.body.pquantity),
          Size: req.body.psize,
        });
        cart.save()
        .then(result => {
          res.redirect('/cart');
        })
        .catch(err => {
          console.log(err);
          // Handle the error, e.g., display an error message or redirect to an error page
        });
      }
      else
      {
        Cart.findOneAndDelete({ProductName:req.body.pname,UserName:req.session.user.Name, Size:req.body.psize}).then((data) => {})
        var q = data.Quantity;
        const cart = new Cart({
          UserName: req.session.user.Name,
          ProductName: req.body.pname,
          Price: parseInt(req.body.pprice),
          Quantity: parseInt(req.body.pquantity) + q,
          Size: req.body.psize,
        });
        cart.save()
        .then(result => {
          res.redirect('/cart');
        })
        .catch(err => {
          console.log(err);
          // Handle the error, e.g., display an error message or redirect to an error page
        });
      }
  
  
  });
  // });
     })

  app.post('/remove_from_cart', (req, res) => {
  
      Cart.findOneAndDelete({UserName:req.session.user.Name, ProductName:req.body.pname, Size:req.body.psize}).then(result => {
        res.redirect('/cart');
      })
      .catch(err => {
        console.log(err);
        // Handle the error, e.g., display an error message or redirect to an error page
      });
    })

app.post('/Checkout', (req, res) => {
    var substrs = req.body.carts.split(',');
    for (var c = 0; c < substrs.length ; c++)
    {
        var pro_name = "";
        var pro_price = "";
        var pro_size = ""; 
        if (substrs[c].includes("ProductName")) 
        {
          pro_name = substrs[c].split("'")[1];
          while (!substrs[c].includes("Size"))
          {
            c = c+1;
          }
          pro_size = substrs[c].split("'")[1];

          while (!substrs[c].includes("Price"))
          {
            c = c+1;
          }
          pro_price = parseInt(substrs[c].split(" ")[3]);

          while (!substrs[c].includes("Quantity"))
          {
            c = c+1;
          }
          pro_quant = parseInt(substrs[c].split(" ")[3]);
          Cart.findOneAndDelete({UserName:req.session.user.Name, ProductName:pro_name, Size:pro_size}).then(result => {
            var nm = result.ProductName;
            var pr = result.Price;
            var sz = result.Size;
            var qt = result.Quantity;
            var ds = result.Description;
            Product.findOneAndDelete({ProductName:nm, Size:sz}).then((data) => {
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
            prod.save()
            .then(result => {
              res.redirect('/');
          })
          .catch(err => {
            console.log(err);
            // Handle the error, e.g., display an error message or redirect to an error page
          });});
        })




          
        }
        
    }
  
})
app.post("/Item", (req, res) => {
  var products;
  Product.find({ProductName:req.body.pname, Size:req.body.psize}).then((data) => {
    products = data;
    console.log(products)
    res.render("Item", {
      products,
      user: req.session.user === undefined ? "" : req.session.user,
    });
   })
});

app.get("/Cart", (req, res) => {
  var carts;
  Cart.find({UserName:req.session.user.Name}).then((data) => {
    carts = data;
    res.render("Cart", {
      carts,
      user: req.session.user === undefined ? "" : req.session.user,
    });
   })
});

app.get("/WishList", (req, res) => {
  res.render("WishList", {
    custemors,
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/Contact", (req, res) => {
  res.render("Contact", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/AddminM", (req, res) => {
  res.render("AddminM", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});


app.post("/Action_Add_product", (req, res) => {
  let imgFile;
  let uploadPath;
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  imgFile = req.files.img;
  uploadPath = __dirname + '/public/images/' + req.body.pname + path.extname(imgFile.name);
  // Use the mv() method to place the file somewhere on your server
  imgFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);

  var p1 = new Product({
    ProductName: req.body.pname,
    Price: parseInt(req.body.pprice),
    Size: req.body.psize,
    Smalldesc: req.body.psdescription,
    Quantity: parseInt(req.body.pquantity),
    Description:req.body.pdescription,
    Image: req.body.pname + path.extname(imgFile.name),
    });
    
    p1.save()
    .then(result => {
      console.log("Done");
      res.redirect("Admin_Products_List");
    })
    .catch(err => {
    console.log("no");
    // Handle the error, e.g., display an error message or redirect to an error page
    });
  });
});

app.get("/Add_product", (req, res) => {
  res.render("Add_Product", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/Admin_Products_List", (req, res) => {
  console.log("type" + req.session.user.Type);
  if (req.session.user !== undefined && req.session.user.Type === "admin") {
    Product.find()
      .then((result) => {
        res.render("Admin_Products_List", {
          Allproducts: result,
          user: req.session.user === undefined ? "" : req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("you are not admin");
  }
});

app.get("/Addmin_Users", (req, res) => {
  console.log("type" + req.session.user.Type);
  if (req.session.user !== undefined && req.session.user.Type === "admin") {
    Employees.find()
      .then((result) => {
        console.log(result);
        res.render("Addmin_Users", {
          Allusers: result,
          user: req.session.user === undefined ? "" : req.session.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("you are not admin");
  }
});

app.get("/Edit_Users", (req, res) => {
  res.render("Edit_Users", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/Login2", (req, res) => {
  res.render("Login2", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

// 404 page
app.use((req, res) => {
   res.status(404).render('404',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
