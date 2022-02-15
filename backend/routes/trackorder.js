const express=require('express');
const router=express.Router();
const Suborder=require('../model/SubOrderModel');
const User=require('../model/userRegisterModel.js');
const Product=require('../model/ProductModel.js');
const MainOrder=require('../model/CheckoutModel.js');


router.get('/selpo', async (req,res)=>{
    var result=Suborder.findById(req.body.id);
})