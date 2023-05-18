const express= require('express');

//const session = require('session');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

//middleware/
app.use(bodyParser.json());
app.use(morgan('tiny')); 

app.use(express.static('Public'));
//app.use('/Images',express.static('Public/Images'));

app.set('Views','./Views');
app.set('view engine', 'ejs');

//app.use(session({ secret: 'Your_Secret_Key' }));

const products =[
    {"id":"11" , "name":"American Eagle 1","decription":"AE SUPER SOFT ICON V-NECK", "image":URL(Images/product5.jpg)},
    {"id":"12" , "name":"American Eagle 2","decription":"AE SUPER SOFT ICON V-NECK"},
    {"id":"13" , "name":"American Eagle 3","decription":"AE SUPER SOFT ICON V-NECK"},
    {"id":"14" , "name":"American Eagle 4","decription":"AE SUPER SOFT ICON V-NECK"},
    {"id":"15" , "name":"American Eagle 5","decription":"AE SUPER SOFT ICON V-NECK"},
    {"id":"16" , "name":"American Eagle 6","decription":"AE SUPER SOFT ICON V-NECK"},
    {"id":"17" , "name":"American Eagle 7","decription":"AE SUPER SOFT ICON V-NECK"},
    {"id":"18" , "name":"American Eagle 8","decription":"AE SUPER SOFT ICON V-NECK"},

]
const employees = [
    { "id": "1", "name": " Ragy"},
    { "id": "2", "name": "Sameh" },
    {"id":"3","name":"Mariam"},
    {"id":"4","name":"Maggie"}
];

require('dotenv/config');

const api = process.env.API_V1;

app.get('/Home', (req, res) =>{
    res.render('Home');
});
app.get('/Product', (req, res) =>{
    res.render('ProductsPage',{products});
});

app.get('/Item', (req, res) =>{
    res.render('Item');
});

app.get('/Cart', (req, res) =>{
    res.render('Cart');
});

app.get('/WishList', (req, res) =>{
    res.render('WishList',{ employees});
});

app.get('/Contact', (req, res) =>{
    res.render('Contact');
});

app.get('/AddminM', (req, res) =>{
    res.render('AddminM');
});

app.get('/Admin_Products_List', (req, res) =>{
    res.render('Admin_Products_List');
});

app.get('/Add_product', (req, res) =>{
    res.render('Add_Product');
});

app.get('/Addmin_Users', (req, res) =>{
    res.render('Addmin_Users');
});

app.get('/Edit_Users', (req, res) =>{
    res.render('Edit_Users');
});

app.get('/Login2', (req, res) =>{
    res.render('Login2');
});


app.listen(3000, ()=>{
    console.log("Running surver!!http://localhost:3000  ")
});

