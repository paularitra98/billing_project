const express=require('express');
const router=express.Router();
const Login=require('../model/LoginModel.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// router.get('/login_ins', async (req,res)=>{
//     const salt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('12345', salt);

//     var obj={
//         name:'admin',
//         email:'admin@gmail.com',
//         password:pass
//     }

//     await Login.create(obj);
//     res.send("hffhhfdhdf");



// });

router.post('/login_check', async (req,res)=>{
    var result=await Login.find({email:req.body.email});
    if(result.length>0){
        bcrypt.compare(req.body.password,result[0].password,(err,resl)=>{
            if(err){
                throw err;
            }
            else{
                if(resl==true){
                    var obju={
                        name:result[0].name,
                        email:result[0].email,
                        id:result[0]._id
                    }

                   var utoken=jwt.sign(obju,"aritra");
                   res.json({jwttoken:utoken});

                    // res.json(obju);

                }
                else{
                    res.json({msg:"invalid login"});
                }

            }
        })
    }
    else{
		res.json({msg:"invalid login"});
	}

});
router.get("/userdata",authm,(req,res)=>{

    jwt.verify(req.token,"aritra",(err,udata)=>{
        if(err){
            res.json({msg:"access denied"});
        }
        else{
            res.send(udata);
        }
    })

});

function authm(req,res,next){
    var ft=req.headers.authorization;
    if(typeof ft != undefined){
        var token = ft.split(" ")[1];
        req.token=token;
        next();
    }
    else{
        res.json({msg:"access defined"});
    }
}




module.exports=router;
