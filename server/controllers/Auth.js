const User =  require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
require("dotenv").config()

// send otp
exports.sendOTP = async (req,res)=>{

    try{
        const {email}= req.body;

    //check if user exist 
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'user already exist'
            })

        }

        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        //console.log("OTP generated ", otp);

        //check unique otp or not 
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
         result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};
        //create  an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log("otpbody",otpBody);

        //return respose sucessful
        res.status(200).json({
            success:true,
            message:"otp sent successfully",
            otp,
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
    
}
//signup
exports.signup = async(req,res) =>{
    //fetch data 
    try{
        const {
            accountType, 
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp
        } = req.body;
        //validate
        if(!firstName || !lastName || !email || !password ||!confirmPassword  || !otp){
            return res.status(403).json({
                success:false,
                message:"all fields are required"
            })
        }
    
        //password match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'password and confirm pass do not match'
            })
        }
        // user exist
    
        const existingUser = await User.findOne({email})
    
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'user is already  registered'
            })
        }
    
        //find most resent otp
    
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp)
    
        //validate otp
        if(recentOtp.length === 0 ){
            //otp not found
            return res.status(400).json({
                success:false,
                message:'otp not found'
            })
        }
        //###### check ######## array
        else if (otp !== recentOtp[0].otp){
            //invalid otp
            return res.status(400).json({
                success:false,
                message:'invalid otp'
            })
    
        }
        //hash password
       const hashedPassword = await bcrypt.hash(password, 10)
    
       //entry created

       let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)
    
       const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
    
       })
    
       const user = await User.create({
        firstName,
        lastName,
        email,
        
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,ffd5dc,ffdfbf,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear&backgroundRotation=0,360,-350,-340,-330,-320&fontFamily=Arial&fontWeight=600`
       })

       return res.status(200).json({
        success:true,
        message:"user registered successfully",
        user,
       })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "server issue try again later "
        })

    }
}

//login

exports.login = async (req,res)=>{

    try{
        //fetch data 
        const {
            email,
            password,
        }= req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"all field required"
            })
        }
        const user = await User.findOne({email}).populate("additionalDetails")

        if(!user){
            return res.status(401).json({
                success:false,
                message:"user don't exist"
            })
        }
        //generate token
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id: user._id,
                accountType:user.accountType, 
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"24h"
            });
            user.token = token;
            user.password = undefined;

             //create cookie

            const options= {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'logged in successfully'
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:'password is incorrect'
            })
        }

       


    }
    catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:'server error login fail'
        })

    }

}

//change password hw

exports.changePassword = async(req,res)=>{

    try{
        const {
            oldPassword,
            newPassword,
            
        } = req.body;
    
        const userDetails =  await User.findById(req.user.id)
       //validate
        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"enter correct password"
            })
        }

        
        //update password

        const newHashedPassword = await bcrypt.hash(newPassword,10)

        const updateUserDetails = await User.findByIdAndUpdate(req.user.id ,
        {password:newHashedPassword},
        {new:true}
         )
         updateUserDetails.password=undefined

         try{
            const emailResponse = await mailSender(updateUserDetails.email,"Studynotion password change notification",`dear ${updateUserDetails.firstName} ${updateUserDetails.lastName} your password have been changed successfully`)
         }
         catch(error){
            return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
         }
         return res.status(200).json({
            success:true,
            message:"password changed successfully",
            data: updateUserDetails
         })

    }
    catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:"unable to change password"
        })
        

    }
     
}

//get all course

exports.showAllCourse = async (req,res)=>{
    try{
        const allCourse = await Course.find({},{
            courseName:true,
            price:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }).populate("insturctor").exec();
        return res.stauts(200).json({
            success:true,
            message:'data of all courses fetched',
            data:allCourse
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'cannot fetch course details',
            error:error.message,
        })
    }
}