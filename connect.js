const mongoose=require("mongoose")
mongoose.connect(process.env.DATABASE)
.then(function(){
    console.log("connection successfully")
})
.catch(function(err){
    console.log(err)
})


