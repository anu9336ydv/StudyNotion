const express = require("express")
const router = express.Router()

const {
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail
} = require("../controllers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

//route to caputre payment
router.post("/capturepayment" ,auth,isStudent,capturePayment)

//route to verify signature
router.post("/verifyPayment",auth,isStudent,verifyPayment)

router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router