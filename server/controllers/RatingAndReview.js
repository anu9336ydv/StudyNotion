const RatingAndReviews = require("../models/RatingAndReview")
const Course = require("../models/Course");

const User = require("../models/User");
const mongoose  = require("mongoose");

//createRating
exports.createRating = async(req,res)=>{
    try{
       //get user id
        const userId = req.user.id;
        console.log("userId",userId)
        //fetch data 
        const{rating, review, courseId}=req.body;
        //check if user is enrolled
        console.log( " rating",rating)
        console.log("review",review)
        console.log("courseId",courseId)
        const courseDetail = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}}
        });
        if(!courseDetail){
            return res.status(404).json({
                success:false,
                message:"student not enrolled "
            })
        }
        //check user havent  reviewed all ready
        const alreadyReviewed = await RatingAndReviews.findOne({
            user:userId,
            course:courseId,
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"course is already reviewed by the user"
            })
        }


        //create rating review

        const ratingReview = await RatingAndReviews.create({
            rating, review ,course:courseId,
            user:userId,
        })
        //update course
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReviews:ratingReview._id,
            }
           
        },{new:true})
        console.log(updatedCourseDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:"rating created successfully",
            ratingReview
        })
    }

    
    catch(error){
            return res.status(500).json({
                success:false,
                message:"could not create the review",
               error:error.message
            })
    }
    

}

//getAllRatingand reviwes not on the basis of courseid
exports.getAllRating = async(req,res)=>
    {
        console.log("inside")
        try{
             const allReviews = await RatingAndReviews.find({}).sort({rating: "desc"}).populate({
                path:"user",
                //these field are required
                select:"firstName lastName email image"
             }).populate({
                path:"course",
                select:"courseName",
             }).exec();
             console.log("allReviews",allReviews)


             return res.status(200).json({
                success:true,
                message:"all reviews fetched",
                data: allReviews
             })
        }
        catch(error){

            return res.status(500).json({
                success:false,
                message:"unable to find rating "
            })

        }
    }


//getAverage Rating

exports.getAverageRating = async (req,res)=>{
        try{
            //get course id
            const courseId= req.body.courseId;
            //calculate avg rating
            const result = await RatingAndReviews.aggregate([{
                $match:{
                    course: new mongoose.Types.ObjectId({courseId})
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg:"rating"},
                }

            }
        ])

            //return rating
            if(result.length>0){
                return res.status(200).json({
                    success:true,
                    averageRating:result[0].averageRating,
                })
            }
            //if no rating exist
            return result.status(200).json({
                message:"average rating is 0, no rating is given",
                averageRating:0,
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
}
//get all rating course specific

exports.getOnesRating = async(req,res)=>
    {
        try{
             const courseId = req.body.courseId;
              const ratingAndReviews = await RatingAndReviews.find({course: courseId}).sort({rating: "desc"}).populate({
                path:"User",
                select:"firstName,lastName,email,image"
              }).exec()
              return res.status(200).json({
                success:true,
                ratingAndReviews
              })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"unable to find rating "
            })
        }
    }