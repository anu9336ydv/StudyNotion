const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require("bcrypt");
const crypto = require("crypto");


exports.resetPasswordToken = async(req, res)=>{

    try{

            // fetch email
    const email = req.body.email;

    // check user // email validation
    const existingUser = await User.findOne({email})

    if(!existingUser){
        return res.status(400).json({
            success:false,
            message:"user do not exitst please register your self",
        })
    }

    //generate token
    const token = crypto.randomUUID();
    
    //update user adding token and expiration time 
    const updateDetails = await User.findOneAndUpdate(
                {email: email},
            {
                token:token,
                resetPasswordExpires: Date.now()+5*60*1000,
            },
            {new:true});
    //create url
    const url = `https://studynotion-frontend-sourav.vercel.app/update-password/${token}`;
    //send email containing the url
    await mailSender(email,"Password Reset Link",`Password reset link ${url}`);
    // return response
    return res.status(200).json({
        success:true,
        message:"reset link sent "
    })


    

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error during sending email"
        })

    }

}

//reset password handler

exports.resetPassword = async (req,res)=>{


    try{
        //data fetch
        const {
            password,
            confirmPassword,
            token,
        } = req.body;
        //validation
      
        if(confirmPassword !== password ){
            return res.json({
                success:false,
                message:" confirm password and password donot match",
                
            })
        }
        //get user details
        const userDetails = await User.findOne({token: token})
        //if no entry - no token 
        if(!userDetails){
            return res.json({
                success:false,
                message:"token is invalid"
            })
        }
        //token expiry 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"token is expire"
            })
        }
        //hash password
        const hashedPassword =await bcrypt.hash(password,10)
        //update password
        const updateUserDetails = await User.findOneAndUpdate({token: token},
        {
            password:hashedPassword
        },
        {new:true})
        //response return
        return res.status(200).json({
            success:true,
            message:"password changed successfully"
        })

    }
    catch(error){

        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error occur during changing password"
        })

    }
    
}