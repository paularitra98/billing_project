const mongoose=require('mongoose');

var suborderSchema=new mongoose.Schema({
	main_order_id:Number,
    customer_id:String,
    qaunity:String,
    product_id:String,
    price:String,
    total:String
 
});

module.exports=mongoose.model("Sub_order",suborderSchema);