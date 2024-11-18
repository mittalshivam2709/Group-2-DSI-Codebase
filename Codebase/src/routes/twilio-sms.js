
const {sendOTP,verifyOTP}=require("../controller/twilio-sms");
const router=require("express").Router();
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);

module.exports=router;