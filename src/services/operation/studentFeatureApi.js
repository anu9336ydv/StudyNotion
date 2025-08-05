//script load kro 

import toast from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const { studentEndpoints } = require("../apis");


const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
}=studentEndpoints

function loadScript (src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src;

        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)

    })
}


export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading('please Wait')
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
            toast.error('razorpay SDK faild to load')
            return;
        }

        //initiate the order

        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
            Authorization: `Bearer ${token}`
        })
        //console.log("orderResponse",orderResponse)
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        const options=
        {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"studyNotion",
            description:"Thanks you for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstname}`,
                email:`${userDetails.email}`
            },
            handler: function(response){
                //send sucess full email

                sendPaymentSuccessEmail(response,orderResponse.data.data.amount, token)


                //verify payment
                verifyPayment({...response,courses},token,navigate,dispatch)
            }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed ",function(response){
            toast.error("opps Payment Failed");
            console.log(response.error)
        })



    }
    catch(error){

        console.log("Payment api error>>",error)
        toast.error(error.response.data.message)

    }
    toast.dismiss(toastId);
   
} 
async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },
    {
        Authorization: `Bearer ${token}`
    })

    }
    catch(error){
            console.log("successpayment email error")
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
        const toastId = toast.loading("verifying Payment")

        dispatch(setPaymentLoading(true));
        try{
            const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Payment Done, you are added to the course")
            navigate("/dashboard/enrolled-courses")
            dispatch(resetCart())

        }
        catch(error){

            console.log("payment verify error")
            toast.error("Could not verify payment")

        }
        toast.dismiss(toastId)
        dispatch(setPaymentLoading(false))
    }