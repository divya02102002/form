const express=require("express")
const router=express.Router();
const {dashboardController,dashcontroller}=require("../controller/dashboard_controller")
const authentication=require("../middlewere/Authentication")

router.get("/dashboard",authentication,dashboardController)
router.post("/dashboard",dashcontroller)

module.exports=router;