const mongoose =require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const userschema = new mongoose.Schema({
    name:{
        type:String,
    },
    uname:{
        type:String,
    },
    email:{
        type:String,
    },
    number:{
        type:String,
    },
    password:{
        type:String,
    },
    confirm:{
        type:String,
    },
    gender:{
        type:String,
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

})

// json web token create
userschema.methods.GenrateToken=async function(next)
{
    try{
      const new_token=await jwt.sign({id:this._id},process.env.SECRETKEY)
      
    //   adddition of token field schema
       this.tokens=this.tokens.concat({token:new_token})
       console.log(new_token)
      return new_token;
    }
    catch(err){
        console.log(err)
    }
    next()
}
// middlewere use in bcypt method
userschema.pre("save",async function(next){
     if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10)
    this.confirm=await bcrypt.hash(this.confirm,10)
    // console.log(this.password)
     }
     next();
})

// 


// connect a instance of collection
const usermodel = mongoose.model("data",userschema);

module.exports=usermodel;