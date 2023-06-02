const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const objectId = require("mongoose").ob;
const path = require("path");

const Coupon = require("./models/coupon");
const morgan = require("morgan");
const { assert } = require("console");
const fs = require("fs");
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
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(express.static("Public"));
//app.use('/Images',express.static('Public/Images'));

app.set("Views", "./Views");
app.set("view engine", "ejs");

app.use(session({ secret: "Your_Secret_Key" }));

require("dotenv/config");

const api = process.env.API_V1;

const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

app.use("/", homeRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// 404 page
app.use((req, res) => {
  res
    .status(404)
    .render("404", {
      user: req.session.user === undefined ? "" : req.session.user,
    });
});