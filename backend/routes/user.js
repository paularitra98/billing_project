const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const Register=require('../model/userRegisterModel.js');


//user1: username:parnab@123  password: 1111
//user2: username:sayan@gmail.com  password: 2222

router.post('/signup',async (req,res)=>{
    const saltRound=10;
    var hashpwd=await bcrypt.hash(req.body.password,saltRound);
    var regobj={
        name:req.body.name,
        email:req.body.email,
        password:hashpwd
    }
    await Register.create(regobj);
    var obj={
        msg:"Successfully register"
    };
        res.json(obj);

});

router.post('/userlogin', async (req,res)=>{
    var result=await Register.find({email:req.body.email});
	if(result.length>0){
        console.log(result);
		bcrypt.compare(req.body.password,result[0].password,(err,resl)=>{
			if(err){
				throw err;
			}
			else{
				if(resl==true){

					var obju={
						name:result[0].name,
						email:result[0].email,
						id:result[0]._id,
						msg:"success"
					}

					var utoken=jwt.sign(obju,"aritra");
					res.json({jwttoken:utoken});


				}
				else{
					res.json({msg:"invalid logins"});
				}
			}
		})

	}else{
		res.json({msg:"invalid login"});
	}
});

router.get("/getuser",authmiddleware,(req,res)=>{

	jwt.verify(req.token,"aritra",(err,udata)=>{
		if(err){
			throw err;
			res.json({msg:"access denied"});

		}
		else{
			res.json(udata);
		}
	})

})

function authmiddleware(req,res,next){
	const ftoken=req.headers.authorization;
	if(typeof ftoken != 'undefined'){
		const tokenv=ftoken.split(' ')[1];
		req.token=tokenv;
		next();
	}
	else{
		res.json({msg:"Access denied"});
	}
}





module.exports=router;