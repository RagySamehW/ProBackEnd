const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const objectId = require("mongoose").ob;
const path = require("path");
const Employees = require("./models/employees");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { assert } = require("console");
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

let x = 1;
const products = [
  {
    id: "11",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "12",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "13",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "14",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "15",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "16",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "17",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
  {
    id: "18",
    name: "American Eagle " + x++,
    decription: "AE SUPER SOFT ICON V-NECK",
  },
];
const custemors = [
  { id: "1", name: " Ragy" },
  { id: "2", name: "Sameh" },
  { id: "3", name: "Mariam" },
  { id: "4", name: "Maggie" },
];

require("dotenv/config");

const api = process.env.API_V1;

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
  res.render("ProductsPage", {
    products,
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/Item", (req, res) => {
  res.render("Item", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
});

app.get("/Cart", (req, res) => {
  res.render("Cart", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
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

app.get("/Admin_Products_List", (req, res) => {
  console.log("type" + req.session.user.Type);
  if (req.session.user !== undefined && req.session.user.Type === "admin") {
    Employees.find()
      .then((result) => {
        res.render("Admin_Products_List", {
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

app.get("/Add_product", (req, res) => {
  res.render("Add_Product", {
    user: req.session.user === undefined ? "" : req.session.user,
  });
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

// Assuming you have an array of items
let g = 1;
const items = [
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  "Item " + g++,
  // ...
];
// 404 page
app.use((req, res) => {
   res.status(404).render('404',{ user: (req.session.user === undefined ? "" : req.session.user) });
});
