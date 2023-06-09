const express = require("express");
var bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const Admin = require("../controllers/Admin");

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === "admin") {
    next();
  } else {
    res.render("err", {
      err: "your not an admin",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }
});

router.get("/AddminM", (req, res) => {
  res.render("AddminM", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});


router.get("/editproduct", (req, res) => {
  res.render("editproduct", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/Edit_Users", (req, res) => {
  res.render("Edit_Users", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/Add_product", (req, res) => {
    res.render("Add_Product", {
      user: req.session.user === undefined ? "" : req.session.user,
    });
  });
  
router.get("/Addmin_Users", Admin.userList);
router.post("/edit/:id" , Admin.EditUserP);
router.get("/edit/:id" , Admin.EditUserG);
router.post("/delete" , Admin.DeletUser);
router.post("/deleteP" , Admin.DeletPro);
router.post("/deleteM" , Admin.DeletM);
router.get("/Admin_Products_List" , Admin.ProList);
router.get("/Admin_Message" , Admin.MessageList);
router.post("/Action_Add_product", Admin.AddP);
router.post("/editp/:id", Admin.EditUserP);
router.get("/editp/:id", Admin.EditUserG);
module.exports = router;
