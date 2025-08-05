const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews"
        }
    ],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:"Category"
    },
    tag:{
        type:[String],
        require:true
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
    instructions: {
		type: [String],
	},
    timeDuration:{
        type:String
    }



});
module.exports = mongoose.model("Course",CourseSchema);
