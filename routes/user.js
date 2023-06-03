const express = require("express");
var bodyParser = require("body-parser");


const router = express.Router();
router.use(bodyParser.json());

const User = require("../controllers/User");

router.get("/Login2", (req, res) => {
  res.render("Login2", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.post('/WishList', (req, res) => {
  // Retrieve the product ID from the request body
  const productId = req.body.productId;

  // Perform your logic to add/remove the product from the user's favorites list
  // Example: Save the product ID in the user's favorites collection in the database

  // Send the response back to the client
  res.sendStatus(200); // Sending a success status code (e.g., 200) to indicate successful operation
});

router.get("/WishList", (req, res) => {
  res.render("WishList", {
    custemors,
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

router.get("/Cart", User.Cartv);
router.post("/profile", User.Getuser);
router.post("/signup-action", User.Adduser);

router.use((req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    res.render("err", {
      err: "You must login to access this page",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.get('/wishlist/AddtoCart/:productId', user.AddtoCart);

router.post("/add_to_cart", User.AddtoCart);
router.post("/remove_from_cart", User.RemoveCart);
router.post("/Checkout", User.Checkout);
router.post('/checkU', User.checkUN);

module.exports = router;
