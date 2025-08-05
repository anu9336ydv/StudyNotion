const {convertSecondsToDuration}= require('../utils/secToDuration.jsx')
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const cloudinary = require("cloudinary").v2
const Category = require("../models/Category")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")


require('dotenv').config();
//create course
exports.createCourse = async(req,res)=>{

    try{
        //get data
        let{
            courseName, 
            courseDescription, whatYouWillLearn, price,category,tag,status,instructions
        }=req.body
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation

        if(!courseDescription || !courseName || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:'all fields are required',
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}

        //get instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId,{accountType:"Instructor"});

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor Details are not found"
            })
        }
        //check category valid or not 

        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'category details not found'
            });
        }

        //upload image to cloudinary
        async function uploadFileToCloudinary(file,folder,quality){
            const options = {folder};
            if(quality){
                options.quality = quality;
            }
        
            options.resource_type = "auto";
           return await cloudinary.uploader.upload(file.tempFilePath,options);
        }

        const thumbnailImage = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME); 

        //create an entry for new post

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag: tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
            instructions:instructions

        })
        // add course in instructor schema

        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true}
        );

        //update category schema hw

        const CategoriesDeatil2 =await Category.findByIdAndUpdate({_id: category},
        { 
            $push:{
                course:newCourse._id
            }
        },
        {new:true})
        console.log("Categoriesdeatil2",CategoriesDeatil2)

        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse,
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to create new cousre",
            error:error.message
        })

    }
    
}
//get all courses
exports.getAllCourses = async(req,res)=>{
    try{
        const allCourse = await Course.find({status:"Published"},
            {
                courseName:true,
                thumbnail:true,
                ratingAndReviews:true,
                instructor:true,
                price:true,
                studentsEnrolled:true,
            }
        ).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            data: allCourse,
        })


    }
    catch(error){
        console.log(error)
        return res.status(404).json({
          success: false,
          message: `Can't Fetch Course Data`,
          error: error.message,
        })
    

    }
}
//get course details
exports.getCourseDetails = async(req,res)=>{
    try{
        const {courseId}= req.body;
         
        const courseDetail =await Course.findById(
         courseId
        )
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        }).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        if (!courseDetail) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            })
          }
          if( courseDetail[0]===' '){
            return res.status(404).json({
                message : "no dta"
            })
          }
          let totalDurationInSeconds = 0
          courseDetail.courseContent.forEach((content) => {
           content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
           totalDurationInSeconds += timeDurationInSeconds
            })
          })

          const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
          console.log("courseDetail",courseDetail)
          return res.status(200).json({
            success:true,
            message:"course found successfully",
            
            data:{
              courseDetail,
              totalDuration
            },

          })

    }
    catch(error){
        console.log(error)
        return res.status(404).json({
          success: false,
          message: `Can't Fetch Course Data`,
          error: error.message,
        })
    }
}
//edit course
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
//getfull course detail
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category").populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//get instructor detail

exports.getInstructorCourses = async (req, res) => {
  
    try {
      // Get the instructor ID 
      const instructorId = req.user.id
  
      // Find all courses 
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({createdAt:-1}).populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      ).exec()



     // console.log("course",instructorCourses)

      instructorCourses.forEach(course => {
        let totalDuration = 0;
        if (Array.isArray(course.courseContent)) {
          course.courseContent.forEach(content => {
            if (Array.isArray(content.subSection)) {
              content.subSection.forEach(subSection => {
                totalDuration = totalDuration + subSection.timeDuration || 0; // Sum up the time durations
              });
            }
          });
        }
        //console.log("totalDuration",totalDuration)
        course.timeDuration = convertSecondsToDuration(totalDuration);
        //console.log("timeDuration",course.timeDuration)
      });
      

      
    
      
  
      
      res.status(200).json({
        success: true,
        data:instructorCourses 
        
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

//delete course

exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json(
          { message: "Course not found" })
      }
      //update category
      await Category.findByIdAndUpdate(course.category,
        {
          $pull:{
              course: courseId
          }
        }
      )
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }

      await User.findByIdAndUpdate(course.instructor,
        {
          $pull:{
              courses:courseId
          }
        }
      )
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }

  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }

exports.deleteAllCourse= async (req,res) =>{

  try{
    const instructor = req.user.id;

      const courses = await Course.find({
        instructor: instructor,
      }).populate({
          path: "courseContent", 
        },
      ).exec()
      const courseDeletionPromises = courses.map(async (course) => {
        const courseSections = course.courseContent
          for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
       }
       await Category.findByIdAndUpdate(course.category,
        {
          $pull:{
              course: course._id
          }
        }
      )
        // const enrolledStudent = course.studentsEnrolled
        // enrolledStudent.map(async(studentId)=>(
        //   await User.findByIdAndUpdate((studentId),{
        //     $pull:{
        //       courses:course._id
        //     }
        //   })
        // ))


       await User.findByIdAndUpdate(course.instructor,
        {
          $pull:{
              courses:course._id
          }
        }
       )
       await Course.findByIdAndDelete(course._id)
       }
      );

      return res.status(200).json({
        success:true,
        message: "all courses deleted successfullt"
      })

  }
  catch(error){
    console.error(error)
      return res.status(500).json({
        success: false,
        message: "unable to delete courses ",
        error: error.message,
      })

  }
      
     

      


}