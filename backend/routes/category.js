const express=require('express');
const router=express.Router();
const Category=require('../model/CategoryModel.js');
const slugify = require('slugify');

router.get('/demo',(req,res)=>{
    res.send("welcome to demo category routes");
});

router.post('/ins',async (req,res)=>{
  var slug=slugify(req.body.category, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',       // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  });
    var obj={
        category:req.body.category,
        parent_id:req.body.parent_id,
        slug:slug
    }

    await Category.create(obj);


   console.log(req.body);
   res.json({msg:"form submitted"});

});

router.get("/selp",async (req,res)=>{
    var result=await Category.find({parent_id:"0"});
    res.json(result);
})

router.get("/list_cat", async (req,res)=>{
    var result=await Category.find();
    var arr=[];
     
    for(var i=0;i<result.length;i++){

        if(result[i].parent_id!='0'){
            var par=await Category.findOne({_id:result[i].parent_id});
             var cat=par.category;

        }
        else{
            var cat="";

        }
        var sub={
            id:result[i]._id,
            category:result[i].category,
            parent:cat
            
        }
       arr.push(sub);
    }
    res.json(arr)
    
})


module.exports=router;