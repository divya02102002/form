const express=require("express")
const router=express.Router();
const {loginController,postloginController}=require("../controller/loginController")
router.get("/login",loginController)
router.post("/login",postloginController)
module.exports=router;