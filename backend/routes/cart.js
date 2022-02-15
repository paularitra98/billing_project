// const { route } = require('./product.js');
const express=require('express');
const router=express.Router();
const Cart=require('../model/CartModel.js');
const Category=require('../model/CategoryModel.js');
const Product=require('../model/ProductModel.js');


router.post('/ins',async (req,res)=>{

    var totalres = req.body.qty * req.body.price;
    var obj={
        userid:req.body.uid,
        qaunity:req.body.qty,
        product_id:req.body.pid,
        price:req.body.price,
        total:totalres
            }
    var resl=await Cart.find({userid:req.body.uid,product_id:req.body.pid});
    if(resl.length==0){
            await Cart.create(obj);
            res.json({msg:"Successfully added to cart"});
    }else{

        var qty=Number(resl[0].qaunity)+Number(req.body.qty);
        var total=Number(req.body.price)*qty;
        var uobj={
        
        qaunity:qty,
       
       
        total:total
        }

       await Cart.findByIdAndUpdate(resl[0]._id,uobj)
				res.json({msg:"updated cart table successfully"});
    }
//    console.log(req.body);       
});

router.post('/list_cart', async (req,res)=>{
    var result=await Cart.find({userid:req.body.urid});
    var arr=[];
    console.log(req.body.urid);
    for(var i=0;i<result.length;i++){

        var item=await Product.findById(result[i].product_id);
        var itemp={
            id:result[i]._id,
            pname:item.name,
            pimg:item.picture,
            pprice:result[i].price,
            qty:result[i].qaunity,
            total:result[i].total
        }
        
     arr.push(itemp);

    }
    res.json(arr);
});

router.post('/del',async (req,res)=>{

    await Cart.findByIdAndDelete(req.body.id);  
   res.json({msg:"deleted"});
});


router.post('/qtyupdate',async (req,res)=>{

    console.log(req.body);
var total=Number(req.body.qty)*Number(req.body.price);
 var obj={
    qaunity:req.body.qty,
     total:total

 };


    await Cart.findByIdAndUpdate(req.body.id,obj);
    res.json({msg:"qauntity updated"});

});

module.exports=router;

