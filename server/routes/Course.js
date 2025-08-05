const express = require("express")
const router = express.Router()

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getInstructorCourses,
    deleteCourse,
    getFullCourseDetails,
    editCourse,
    deleteAllCourse
  } = require("../controllers/Course")

const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")

const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
  } = require("../controllers/SubSection")

const {
    createRating,
    getAverageRating,
    getAllRating,
  } = require("../controllers/RatingAndReview")

  const {
    updateCourseProgress
  } = require("../controllers/courseProgress");

  const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

  //route for rating
  router.post("/createRating", auth, isStudent, createRating)
  router.get("/getAverageRating", getAverageRating)
  router.get("/getReviews", getAllRating)
  //route for catagory

  router.post("/createCategory", auth, isAdmin, createCategory)
  router.get("/showAllCategories", showAllCategories)
  router.post("/getCategoryPageDetails", categoryPageDetails)
  //route for courses

  // Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
//get instructor course detail
router.get('/getinstructorcourses',auth,isInstructor,getInstructorCourses)
router.delete('/deleteCourse',deleteCourse)
router.delete('/deleteAllCourse',auth,deleteAllCourse)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
module.exports = router
  