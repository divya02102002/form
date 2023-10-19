const usermodel=require("../db/schema")
const jwt=require("jsonwebtoken")

//every middlewere contain three parameter request response and next
// next process continue then use next

const authentication=async(req,res,next)=>{
    try{
       const login_token=await req.cookies.loginToken;
       console.log(login_token)
      //  ussi documnet ki id return karta hai
       const verifyuser=await jwt.verify(login_token,process.env.SECRETKEY)
       console.log(verifyuser)
       const user=await usermodel.findOne({_id:verifyuser.id})
       console.log(user);
       next();
    }
    catch(err)
    {
       console.log(err)
    }
}
module.exports=authentication





