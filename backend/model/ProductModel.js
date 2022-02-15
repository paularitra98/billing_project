const mongoose=require('mongoose');

var productSchema=new mongoose.Schema({
	category:String,
    name:String,
    price:String,
    quantity:String,
    description:String,
    picture:String,
    slug:String
});

module.exports=mongoose.model("Product",productSchema);