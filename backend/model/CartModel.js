const mongoose=require('mongoose');

var cartSchema=new mongoose.Schema({
	userid:String,
    qaunity:String,
    product_id:String,
    price:String,
    total:String
});

module.exports=mongoose.model("Cart_table",cartSchema);