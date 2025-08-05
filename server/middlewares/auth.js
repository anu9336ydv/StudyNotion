const jwt = require("jsonwebtoken")
const User =  require("../models/User")
require('dotenv').config()

//auth
exports.auth = async(req,res,next)=>{
    try{
        //extract the token
        const  token = req.cookies.token || req.body.token|| req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(400).json({
                success:false,
                message:'token is missing'
            })
        }

        //verify the  token
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode);
            req.user = decode;

        }
       catch(err){
            return res.status(400).json({
                success:false,
                message:" token is in valid"
            });
           
       }
       next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"some thing went wrong while token validation"
        })

    }
}

//isStudent
exports.isStudent = async (req,res,next) =>{
        try{
            const userDetails = await User.findOne({email: req.user.email})
             if(userDetails.accountType !=="Student"){
                return res.status(401).json({
                    success:false,
                    message:"This Route is protected for Student"
                })
             }
             next()
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'user role cannot be accessed'
            })
               
            
        }
}

//is Instructor

exports.isInstructor = async (req,res,next) =>{
    try{
        const userDetails = await User.findOne({email: req.user.email})
         if(userDetails.accountType !=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This Route is protected for Instructor"
            })
         }
         next()
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user role cannot be accessed'
        })
           
        
    }
}

//isadmin

exports.isAdmin = async (req,res,next) =>{
    try{
        const userDetails = await User.findOne({ email: req.user.email });

         if(userDetails.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This Route is protected for Admin"
            })
         }
         next()
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user role cannot be accessed'
        })
           
        
    }
}