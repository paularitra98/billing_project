const express=require('express');
const router=express.Router();
const Category=require('../model/CategoryModel.js');
const Product=require('../model/ProductModel.js');
const slugify = require('slugify');

router.get('/demop',(req,res)=>{
    res.send("welcome to demo product routes");

});

router.get('/add_prod', async (req,res)=>{


    var result=await Category.find({parent_id:'0'});
	
	var cat=[];
	for(var i=0;i<result.length;i++){
		x=[]
		var ch=await Category.find({parent_id:result[i]._id});
		if(ch.length>0){
			x=ch;
		}
		obj={
            parent:result[i].category,
			id:result[i]._id,
			category:x
		};
		cat.push(obj);
	}
	// res.render('addProduct',{category:cat});
    res.json(cat);
})


router.post('/ins_prod',async (req,res)=>{

	
	var slug=slugify(req.body.name, {
		replacement: '-',  // replace spaces with replacement character, defaults to `-`
		remove: undefined, // remove characters that match regex, defaults to `undefined`
		lower: true,      // convert to lower case, defaults to `false`
		strict: false,     // strip special characters except replacement, defaults to `false`
		locale: 'vi',       // language code of the locale to use
		trim: true         // trim leading and trailing replacement chars, defaults to `true`
	  });


	var img=req.files.pimg;
	var fn=Math.floor(Math.random() * 100000)+img.name;
	img.mv("./public/product_image/"+fn,
		async (err)=>{
			if(err){
				throw err;
			}
			else{

				
				// console.log(img.name);
				// console.log(req.body);


				var insobj={
					category:req.body.category,
					name:req.body.name,
					price:req.body.price,
					quantity:req.body.quantity,
					description:req.body.description,
					picture:fn,
					slug:slug


				}
          await Product.create(insobj);

				//dbobj.ins_user(insobj,res);
			}
		});
	
	var obj={
	msg:"form submitted"
};
	res.json(obj);
});

router.get("/list_prod", async (req,res)=>{
    var result=await Product.find();
    var arr=[];
     
	for(var i=0;i<result.length;i++){

		var par=await Category.findOne({_id:result[i].category});
        var cat=par.category;

		var sub={
            id:result[i]._id,
            category:cat,
			name:result[i].name,
			price:result[i].price,
			quantity:result[i].quantity,
			description:result[i].description,
			pimg:result[i].picture
            
        }
		arr.push(sub);
		

	}
    res.json(arr);
})


module.exports=router;
