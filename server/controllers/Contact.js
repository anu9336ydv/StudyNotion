//hw
const mailSender= require("../utils/mailSender")

exports.contactUs = async (req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            countryCode,
            contactNumber,
            message,
            
        }=req.body;
        
        await mailSender(email,"Query Submitted -reg", `This email is to inform that your message hav been successfully submitted`);
        await mailSender(process.env.MAIL_USER,`Query from student ${firstName} ${lastName} ` ,` student details:
            name= ${firstName} ${lastName}
            Email= ${email}
            constactnummber=${countryCode} ${contactNumber}
            message=${message}
            `)

            return res.status(200).json({
                success:true,
                message:"email send successfully"
            })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "there is an error in sending email"
        })

    }
   
}