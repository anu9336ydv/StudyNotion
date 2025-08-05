const Profile = require("../models/Profile")
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress')
const Course = require('../models/Course')
const {convertSecondsToDuration}= require('../utils/secToDuration.jsx')
const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
require("dotenv").config();
exports.updateProfile= async(req,res)=>{
   //changes required
    try{
        const{
            firstName="",
            lastName="",
            contactNumber="",
            gender,
            about="",
            dateOfBirth="",

        }=req.body
        const id = req.user.id;

        
        const userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)
        const user = await User.findByIdAndUpdate(id,{
          firstName,
          lastName,
        })
        await user.save()
        //uppdate profile'
        profileDetails.dateOfBirth=dateOfBirth,
        profileDetails.gender=gender,
        profileDetails.about=about,
        profileDetails.contactNumber=contactNumber,

        await profileDetails.save();

        const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()
      updatedUserDetails.password=undefined


        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            data:updatedUserDetails
        })




    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        })

    }
        
}
//hw find a bussiness logic to shedule the user request 

//delete account

exports.deleteAccount = async(req,res)=>{
    try{
        const userId = req.user.id;
        

        const userDetails = await User.findById(userId)
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        const profileId = userDetails.additionalDetails
        //hw unenroo user frol all enroled cources
        const deleteProfile = await Profile.findByIdAndDelete({_id:profileId})
        for (const courseId of userDetails.courses) {
          await Course.findByIdAndUpdate(
            courseId,
            { $pull: { studentsEnrolled: userId } },
            { new: true }
          )
        }
        const deleteUser = await User.findByIdAndDelete({_id:userId})

        return res.status(200).json({
            success:true,
            message:"user account deleted successfully"
        })

        

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:" unable to delete  account]  "
        })

    }
    
    
}
//get user details
exports.getAllUserDetails = async(req,res)=>{
        try{
            const id =req.user.id;
            const userDetails = await User.findById(id).populate("additionalDetails").exec();
            userDetails.password=undefined
            return res.status(200).json({
                success:true,
                message:"user Data fetched successfully",
                data:userDetails
            })


        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:" unable to get  profile details"
            })
    
        }
        
}

//update display picture
exports.updateDisplayPicture = async (req, res) => {
  console.log("frombackend call")
    try {
      const displayPicture = req.files.displayPicture
      console.log( "from backend",displayPicture)
      const userId = req.user.id
      const user = await User.findById(userId);
      if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
    console.log("image  hai")
      if (!displayPicture) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
    async function uploadFileToCloudinary(file,folder,height,quality){
        const options = {folder};
        if(height) {
          options.height = height;
      }
        if(quality){
            options.quality = quality;
        }
    
        options.resource_type = "auto";
       return await cloudinary.uploader.upload(file.tempFilePath,options);
    }
    console.log("image upload hone ja ri hai")
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
        
      )
      console.log("image upload ho gai")
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      ).populate("additionalDetails")
      updatedProfile.password=undefined
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data:updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

//get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
      console.log("user")
      const userId = req.user.id
      console.log("userid",userId)
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
        console.log("user details",userDetails)
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  //instructor dashboard
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}