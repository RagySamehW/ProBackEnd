const express = require("express");
const Product = require("../models/products");
const { await } = require("await");
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 8 } }]).exec();
    const productss = await Product.aggregate([{ $sample: { size: 4 } }]).exec();
    res.render('Home', { productss ,products ,user: req.session.user === undefined ? "" : req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


router.get("/Contact", (req, res) => {
    res.render('Contact', { user: req.session.user === undefined ? "" : req.session.user });
  });


 

const itemsPerPage = 4;
  router.get("/Product", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
  
    try {
      // Count the total number of products in the database
      const totalProductsCount = await Product.countDocuments();
  
      // Calculate the start and end indexes of the products to display
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
  
      // Fetch the paginated products from the database
      const paginatedProducts = await Product.find()
        .skip(startIndex)
        .limit(itemsPerPage);
  
      // Render the products page template with the paginated products and page information
      res.render("ProductsPage", {
        products: paginatedProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProductsCount / itemsPerPage),
        user: req.session.user === undefined ? "" : req.session.user,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error and send an appropriate response
      res.status(500).send("Error fetching products");
    }
  });

router.post("/Item", async (req, res) => {
  var products;
  const productss = await Product.aggregate([{ $sample: { size: 4 } }]).exec();
  Product.find({ ProductName: req.body.pname, Size: req.body.psize }).then(
    (data) => {
      products = data;
      console.log(products);
      res.render("Item", {
        productss,
        products,
        user: req.session.user === undefined ? "" : req.session.user,
      });
    }
  );
});
router.post("/getproducts", async (req, res) => {
  let payload = req.body.payload.trim();
  let search = await Product.find({
    ProductNam: { $regex: new RegExp("^" + payload + ".*", "i") },
  }).exec();
  res.send({ payload: search });
});

router.get('/WishList', (req, res) =>{
  res.render('WishList',{ employees});
});
module.exports = router;
