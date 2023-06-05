const Employees = require("../models/employees");
const Product = require("../models/products");
const objectId = require("mongoose").ob;
const path = require("path");


const userList = (req, res) => {
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
};

const EditUserG = (req, res) => {
  const userId = req.params.id;
  // Retrieve the user with the specified ID from the database
  Employees.findOne({ _id: userId })
    .then((Puser) => {
      if (!Puser) {
        console.log("User not found");
        res.status(404).send("User not found");
      } else {
        res.render("Edit_Users", {
          Puser,
          user: req.session.user === undefined ? "" : req.session.user,
        });
      }
    })
    .catch((err) => {
      console.error("Error retrieving user:", err);
      res.status(500).send("Error retrieving user");
    });
};

const EditUserP = (req, res) => {
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
        console.log("User not found");
        res.status(404).send("User not found");
      } else {
        console.log("User updated:", updatedUser);
        res.redirect("/"); // Redirect to the appropriate page
      }
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
    });
};

const DeletUser = (req, res) => {
  const userId = req.body.id;
  Employees.findOneAndDelete({ _id: userId })
    .then((deletedUser) => {
      if (!deletedUser) {
        console.log("User not found");
        res.status(404).send("User not found");
      } else {
        console.log("User deleted:", deletedUser);
        res.redirect("Addmin_Users");
      }
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    });
};

const DeletPro = (req, res) => {
  const proid = req.body.id;
  Product.findOneAndDelete({ _id: proid })
    .then((deletedpro) => {
      if (!deletedpro) {
        console.log("User not found");
        res.status(404).send("User not found");
      } else {
        console.log("User deleted:", deletedpro);
        res.redirect("Admin_Products_List");
      }
    })
    .catch((err) => {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
    });
};

const ProList = (req,res) => {
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
};

const AddP = (req,res) => {
  let imgFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }
  imgFile = req.files.img;
  uploadPath = path.join(__dirname, '../public/images/' + req.body.pname + path.extname(imgFile.name));

  // Use the mv() method to place the file somewhere on your server
  imgFile.mv(uploadPath, function (err) {
      if (err)
          res.status(500).send(err);

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
      res.redirect("/admin/Admin_Products_List");
    })
    .catch(err => {
    console.log("no");
    // Handle the error, e.g., display an error message or redirect to an error page
    });
  });
};
const EditProG = (req, res) => {
  const pId = req.params.id;

  // Retrieve the product with the specified ID from the database
  Product.findById(pId)
    .then((pproduct) => {
      if (!pproduct) {
        console.log('Product not found');
        return res.status(404).send('Product not found');
      }

      res.render("editproducts", { pproduct, user: req.session.user || "" });
    })
    .catch((err) => {
      console.error('Error retrieving product:', err);
      res.status(500).send('Error retrieving product');
    });
};

const EditProP = (req, res) => {
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
  Product.findByIdAndUpdate(pId, pupdatedData, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        console.log('Product not found');
        return res.status(404).send('Product not found');
      }

      console.log('Product updated:', updatedProduct);
      res.redirect('/'); // Redirect to the appropriate page
    })
    .catch((err) => {
      console.error('Error updating product:', err);
      res.status(500).send('Error updating product');
    });
};

module.exports = {
    userList,
    EditUserG,
    EditUserP,
    DeletUser,
    DeletPro,
    ProList,
    AddP,
    EditProG,
    EditProP
};
