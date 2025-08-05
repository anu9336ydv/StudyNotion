const express = require("express")
const router = express.Router()

const {auth,isInstructor}= require("../middlewares/auth")
const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    instructorDashboard,
    updateDisplayPicture,
    getEnrolledCourses,

} = require("../controllers/Profile")

//route to update profile

router.put("/updateprofile",auth,updateProfile)
//route to delete account
router.delete("/deleteaccount",auth,deleteAccount)

//route to get user detail
router.get("/getuserdetails",auth,getAllUserDetails)
//route to update profile picture
router.put("/updatedisplaypicture",auth,updateDisplayPicture)

//route to get instructor 
router.get("/instructordahboard",auth,isInstructor, instructorDashboard)

router.get("/getenrolledcourses",auth,getEnrolledCourses)

module.exports = router