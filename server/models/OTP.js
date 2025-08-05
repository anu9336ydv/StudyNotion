const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        requied:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60*1000,
    }

});

// a fn to send email

async function sendVerificationEmail(email, otp){
    try{ 
        const mailResponse = await mailSender(email,"verification email from study notion", otp)

        console.log ("email response ", mailResponse)

    }
    catch(error){
        console.log("error  in sending email" ,error)
        throw error;
    }
}
// pre middleware
     OTPSchema.pre("save",async function(next){
    //+
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    
    next();
})

module.exports = mongoose.model("OTP",OTPSchema)