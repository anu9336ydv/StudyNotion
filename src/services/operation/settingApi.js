import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingApi } from "../apis";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authApi";

const{
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    DELETE_ACCOUNT_API,
    CHANGE_PASSWORD_API
}=settingApi;




export function updateProfile(token,formData){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        //console.log(UPDATE_PROFILE_API)
        try{
            const response = await apiConnector("PUT",UPDATE_PROFILE_API,formData,{Authorization: `Bearer ${token}`})
          //  console.log("printing response of updateprofile call>>",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
         dispatch(
        setUser({ ...response.data.data, image: userImage })
        
         )

         toast.success(" profile updated ")
         localStorage.setItem("user", JSON.stringify(response.data.data))
        }
        catch(error){
            console.log("there is an error at update profile>>",error)
            toast.error("cannot update profile")
        }
        toast.dismiss(toastId)

            
        }
}

export function UpdateDisplayPicture(token,formData){
        return async(dispatch)=>{
            const toastId= toast.loading("Loading...")
           // console.log("printing form update display picture ")
            try{
              //  console.log("printing form update display picture 2")
                const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{
                    "Content-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                })
               // console.log("Update Display picture>>",response)
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                const userImage = response.data.data.image
                 ? response.data.data.image
                 : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
                toast.success("Display Picture Updated Successfully")

                
                toast.success("Picture Updated Successfully")
                  dispatch(setUser({...response?.data?.data,image:userImage}))
                  localStorage.setItem("user", JSON.stringify(response.data.data))

            }
            catch(error){
                console.log("there is an error at update Display picture>>", error)
                toast.error("Could Not Update Display Picture")

            }
            toast.dismiss(toastId)
            
        }
}

export function changePassword(token,formData){
        return async(dispatch)=>
            {
              //  console.log("pasword came to update",formData)
                const toastId= toast.loading("Loading...")
               // console.log("password sent in the try block")

                try{

                    const response = await apiConnector("POST",CHANGE_PASSWORD_API,formData,{
                       
                        Authorization:`Bearer ${token}`
                    })
                 //   console.log("Update password detail>>",response)
                    if(!response.data.success){
                        throw new Error(response.data.message)
                    }
                    toast.success("Password updated Successfully")
                      dispatch(setUser(response.data.data))
    
                }
                catch(error){
                    console.log("there is an error at updating password>>", error)
                    toast.error("Could Not Update password")
    
                }
                toast.dismiss(toastId)
                
            }
}
export function deleteAccount(token, navigate){
    return async (dispatch)=>{
        const toastId= toast.loading("Loading...")
       // console.log("printing form delete account")

        try{
           // console.log("printing from try block")
            const response = await apiConnector("DELETE",DELETE_ACCOUNT_API,null,{
                Authorization:`Bearer ${token}`
            })
           // console.log("account delete detail>>",response)
            if(!response.data.success){

                throw new Error(response.data.message)
            }
            toast.success("Account deleted Successfully")
               // console.log("printing  after success toast")
              dispatch(logout(navigate))
             // console.log("printing  after success dispatch logout")

        }
        catch(error){
            console.log("there is an error at  deleting account>>", error)
            toast.error("Could Not  Delete Account")

        }
        toast.dismiss(toastId)

    }
}