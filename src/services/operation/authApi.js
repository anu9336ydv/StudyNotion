import { setLoading, setToken } from "../../slices/authSlice"
import { useDispatch } from "react-redux"
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const{
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
    SENDOTP_API,
    LOGIN_API,
}=endpoints


export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})

            //console.log( "RESET TOKEN",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email sent");
            setEmailSent(true)
        }

        catch(error){
                console.log("Reset password token error")
                toast.error("falied to send email")

        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API, {password, confirmPassword, token})
           // console.log('response',response)
            if(!response.data.success){
                throw new Error(response.data.message)
             }
            toast.success("Password reset Successfully")
            navigate('/login')
            
        }
        catch(error){
            console.log("unable to Reset password",error)
                toast.error("unable to Reset password")

        }
        dispatch(setLoading(false))
    }
}

export  function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate)
    {
        return async(dispatch)=>{
            dispatch(setLoading(true))
            const toastId = toast.loading("Loading...")
            try{
                const response= await apiConnector("POST",SIGNUP_API,{
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp})
                    //console.log('response is ',response)
                    if(!response.data.success){
                       // console.log("error message")
                        throw new Error(response.data.message)
                     
                    }
                    toast.success(" signup successfully")
                    navigate("/login")
            }
            catch(error){
                    console.log("error in sign up",error)
                    toast.error(error.response.data.message)
                    navigate("/signup")
            }
            dispatch(setLoading(false))
            
            toast.dismiss(toastId)
        }
        
    }

export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SENDOTP_API,{email})
           // console.log("response of otp is",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("otpSent successfully")

            navigate('/verify-email')

        }
        catch(error){
            console.log("error is ",error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }
}
export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",LOGIN_API,{email,password})
            //console.log("RESPONSE OF LOGIN >>>",response)
            
            if(!response.data.success){
                console.log("message is  is",response.data.message)
                throw new Error(response.data.message)
            } 
            toast.success("Login successfull")
            dispatch(setToken(response.data.token))
            const userImage=response.data?.user?.image
            ?response.data.user.image
            :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user,image:userImage}))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            // console.log(ls)
            navigate('/dashboard/my-profile')
        }
        catch(error){
            console.log("error is ",error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        
    }

}
export function logout(navigate) {
  return (dispatch) => {
   // console.log("printing from log out")
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
  //  console.log("printing after success toast in logout function")
    navigate("/")
   // console.log("after navigate in logout")
  }
}