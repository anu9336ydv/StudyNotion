import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndPoint } from "../apis";

const{
    GET_USER_ENROLLED_COURSES_API,
    GET_USER_DETAIL_API,
    GET_INSTRUCTOR_DASHBOARD_API
}=profileEndPoint;

export async function getUserEnrolledCourses(token){

        //console.log("inside get enrolled courses call ",token)
        const toastId = toast.loading("Loading...")
        let result = []

        try{
                const response = await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,
                    {Authorization:`Bearer ${token}`}
                )
                if(!response.data.success){
                    throw new Error(response.data.message)
                }

                result=response.data.data
        }
        catch(error){

            console.log("error in getting enrolled courses >>> ",error)
            toast.error("Could Not Get Enrolled Courses")
        }
        toast.dismiss(toastId)
        return result
   
}

export async function getInstructorData(token){
    const toastId = toast.loading('Please Wait...')
    let result = [];
    try{
        const response = await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_API,null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        //console.log("instructor api result",response)
        result=response.data.courses

    }
    catch(error){
        console.log("Instructor stats error >>> ",error)
        toast.error("Could Not Get Instructor Stats")

    }
    toast.dismiss(toastId)
        return result

}