const express=require('express');
const router=express.Router();
const Product=require('../model/ProductModel.js');
const suborder=require('../model/SubOrderModel');
const Cart=require('../model/CartModel.js');
const Checkout=require('../model/CheckoutModel.js');

router.post('/inst',async (req,res)=>{


    const rest=await Checkout.find().sort({order_id:-1});
   
      var oid=rest[0].order_id;   

            var resl=await Cart.find({userid:req.body.cid});
            for(var i=0;i<resl.length;i++){
                var obj={
                    main_order_id:oid,
                    customer_id:req.body.cid,
                    product_id:resl[i].product_id,
                    qaunity:resl[i].qaunity,
                    price:resl[i].price,
                    total:resl[i].total
                }
                await suborder.create(obj);
                await Cart.findByIdAndDelete(resl[i]._id);
            }
            
            var sub={
                msg:"form submitted"
            };
                res.json(sub);  
});

router.post('/selo', async (req,res)=>{
   
var res2=await suborder.find({customer_id:req.body.uid});
console.log(res2);
var arr=[];
for(var i=0;i<res2.length;i++){
    var item=await Product.findById(res2[i].product_id);
    var itemp={
        id:res2[i]._id,
        orderid:res2[i].main_order_id,
        pname:item.name,
        pimg:item.picture,
        pprice:res2[i].price,
        qty:res2[i].qaunity,
        total:res2[i].total

    }
    arr.push(itemp);
   

}
res.json(arr);



})


module.exports=router;
