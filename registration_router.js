const express=require("express")
const router=express.Router();
const {Registrationcontroller,createRegistration}=require("../controller/registration_controller")

router.get("/registration",Registrationcontroller)
router.post("/registration",createRegistration)

module.exports=router;