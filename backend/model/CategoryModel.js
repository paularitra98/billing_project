const mongoose=require('mongoose');

var categorySchema=new mongoose.Schema({
	parent_id:String,
    category:String,
    slug:String
});

module.exports=mongoose.model("Category",categorySchema);