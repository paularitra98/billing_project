const mongoose=require('mongoose');

var userRegisterSchema=new mongoose.Schema({
	name:String,
    email:String,
    password:String
});

module.exports=mongoose.model("user_register",userRegisterSchema);