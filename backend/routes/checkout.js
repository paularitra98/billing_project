const express=require('express');
// const CheckoutModel = require('../model/CheckoutModel.js');
const router=express.Router();
const Checkout=require('../model/CheckoutModel.js');

router.post('/inst',async (req,res)=>{

    const resl=await Checkout.find().sort({order_id:-1});
    if(resl.length>0){
      var oid=Number(resl[0].order_id)+1;
    }else{
        var oid=1;
    }

    var obj={
        customerid:req.body.cid,
        billing_name:req.body.billing_name,
        billing_email:req.body.billing_email,
        billing_address:req.body.billing_address,
        billing_phone:req.body.billing_phone,
        shipping_name:req.body.shipping_name,
        shipping_email:req.body.shipping_email,
        shipping_phone:req.body.shipping_phone,
        shipping_address:req.body.shipping_address,
        order_id:oid
        
            }
            await Checkout.create(obj);


            console.log(req.body);
            res.json({msg:"form submitted"});

})


router.post('/list_ship', async (req,res)=>{
    var result=await Checkout.findOne({customerid:req.body.urid});
 
    res.json(result);


});


module.exports=router;