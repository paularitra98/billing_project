const mongoose=require('mongoose');

var checkoutSchema=new mongoose.Schema({
	customerid:String,
    billing_name:String,
    billing_address:String,
    billing_phone:String,
    billing_email:String,
    shipping_name:String,
    shipping_address:String,
    shipping_phone:String,
    shipping_email:String,
    order_id:Number
});

module.exports=mongoose.model("Main_order",checkoutSchema);