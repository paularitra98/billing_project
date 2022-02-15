const express=require ("express");
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const fileupload=require('express-fileupload');
const slugify = require('slugify');



const pro=require("./routes/product");
const cat=require("./routes/category");
const admin=require("./routes/admin");
const user=require("./routes/user");
const cart=require("./routes/cart");
const checkout=require("./routes/checkout");
const orderabcd=require("./routes/order");




const app=express();
const port=2600;


mongoose.connect('mongodb+srv://aritra:a123456@cluster0.r8cvt.mongodb.net/mern_biling?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log("database connected");
});

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(fileupload());
app.use(cors());

app.use(express.static('public'));//convert public folder to static folder

app.get("/",(req,res)=>{
    res.send("welcome to express");
});


app.use("/product",pro);
app.use("/category",cat);
app.use("/admin",admin);
app.use("/user",user);
app.use("/cart",cart);
app.use("/checkout",checkout);
app.use("/order",orderabcd);
app.listen(port);