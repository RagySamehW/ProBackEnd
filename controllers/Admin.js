const Employees = require("../models/employees");
const Product = require("../models/products");
const objectId = require("mongoose").ob;
const path = require("path");
const fs = require("fs");

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

const EditUserG = (reg, res) => {
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

const EditUserP = (reg, res) => {
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
        res.redirect("Admin_Products_Lists");
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

module.exports = {
    userList,
    EditUserG,
    EditUserP,
    DeletUser,
    DeletPro,
    ProList
};