const express = require("express")
const router = express.Router()
const {
    login,
    signup,
    sendOTP,
    changePassword,
} = require("../controllers/Auth")

const {auth}= require("../middlewares/auth")

const {resetPasswordToken, resetPassword}=require("../controllers/ResetPassword");

//route for login 

router.post("/login",login);
//route for singup
router.post("/signup",signup)

//route to send otp
router.post("/sendotp",sendOTP)

//route to change password
router.post("/changepassword",auth,changePassword)

//route to reset password

//route to generate password token
router.post("/reset-password-token",resetPasswordToken)
//route to reset password
router.post("/reset-password",resetPassword)

module.exports =router
