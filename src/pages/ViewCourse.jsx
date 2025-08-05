import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operation/CourseApi';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { VideoSidebar } from '../components/core/ViewCourse/VideoSidebar';
import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal';
import { IoMenuOutline } from "react-icons/io5";
export const ViewCourse = () => {
    const [reviewModal,setReviewModal]= useState(false)
    const {courseId}=useParams();

    //console.log("courseId",courseId)
    
    const{token}=useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const[open,setOpen] = useState(false)
    

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            // dispatch(setCourseSectionData([]))
            // dispatch(setEntireCourseData([]))
            // dispatch(setCompletedLectures([]))
            // dispatch(setTotalNoOfLectures(0))
            const courseData= await getFullDetailsOfCourse(courseId,token)
           // console.log("courseData",courseData)
            if(courseData){
                dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
                dispatch(setEntireCourseData(courseData.courseDetails))
                dispatch(setCompletedLectures(courseData.completedVideos))
    
                let lectures=0;
                courseData.courseDetails.courseContent.forEach((sec)=>{
                   // console.log("sec.subSection.length",sec.subSection.length)
                    lectures+=sec.subSection.length
                })
                dispatch(setTotalNoOfLectures(lectures))

            }
            // else{
            //      dispatch(setCourseSectionData([]))
            // dispatch(setEntireCourseData([]))
            // dispatch(setCompletedLectures([]))
            // dispatch(setTotalNoOfLectures(0))
            // }
           
        }
        setCourseSpecificDetails()

    },[dispatch,token,courseId])
   

  return (
    <div>
         <div className='text-white bg-yellow-400 w-6  sm:w-14  sm:p-4'><IoMenuOutline className='text-2xl' onClick={()=>setOpen(!open)}/></div>
        <div  className="relative flex min-h-[calc(100vh-3.5rem)]">
       
            <VideoSidebar open={open} setReviewModal={setReviewModal}/>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                 <div className="mx-6 mt-3">
                     <Outlet />
                  </div>

            </div>
        </div>
         {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>} 
    </div>
  )
}
