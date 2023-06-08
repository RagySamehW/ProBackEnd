const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());



const User = require("../controllers/User")

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



router.get('/wishlist/remove/:productId', User.removeFromWishlist);
router.get('/wishlist/AddtoCart/:productId', User.AddtoCart);
router.post("/Action_Add_Mess", User.AddMessage);
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
 router.get("/checkout", User.checkout);

router.post("/add_to_cart", User.AddtoCart);
router.post("/remove_from_cart", User.RemoveCart);

router.post('/checkU', User.checkUN);
router.post('/order',User.order);

module.exports = router;
