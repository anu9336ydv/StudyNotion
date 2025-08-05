import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operation/profileApi'
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from 'react-router-dom'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../../slices/viewCourseSlice'

export const EnrolledCourses = () => {
  const{token}= useSelector((state)=>state.auth);
 // console.log("this is token",token)
  const[enrolledCourses,setEnrolledCourses] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const getEnrolledCourses = async()=>{
    try{
        const response = await getUserEnrolledCourses(token)
       // console.log("response",response)
        setEnrolledCourses(response)
    }
    catch(error){
          console.log("could not fetch enrolled courses")
    }
  }

  useEffect(()=>{
    getEnrolledCourses()
  },[])
  useEffect(()=>{
     dispatch(setCourseSectionData([]))
            dispatch(setEntireCourseData([]))
            dispatch(setCompletedLectures([]))
            dispatch(setTotalNoOfLectures(0))
  })

  return (
    <div className='text-richblack-50 '>
        <div className="text-2xl md:text-3xl font-medium text-richblack-50">
          Enrolled Courses
        </div>
        {
          !enrolledCourses?(
            <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
            <div className='loader '></div>
        </div>) 
          : !enrolledCourses.length ?(
          <p className="grid h-[50vh] w-full place-content-center text-3xl   text-richblack-400">You have no enrolled courses</p>)
          :(
            <div className="my-8 text-richblack-5">
                  <div className="flex rounded-t-lg bg-richblack-500 ">
                    <p className="w-[45%] px-5 py-3">Course Name</p>
                    <p className="w-1/4 px-2 py-3">Durations</p>
                    <p className="flex-1 px-2 py-3">Progress</p>
                  </div>
                  {/* cards */}
                  {
                    enrolledCourses.map((course,index,arr)=>(
                      <div key={index} 
                      className={`flex items-center border border-richblack-700 ${
                        index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                      }`}>
                        <div
                             className="flex flex-col sm:flex-row w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                             onClick={() => {
                               navigate(
                                 `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/subsection/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                               )
                             }}
                        >
                          <img src={course.thumbnail} alt=""
                          className="h-14 w-14 rounded-lg object-cover" />
                          <div className="flex max-w-xs flex-col gap-2">
                            <p className="font-semibold">{course.courseName}</p>
                            <p className="text-xs hidden sm:flex  text-richblack-300">{course.courseDescription.length > 50
                                        ? `${course.courseDescription.slice(0, 50)}...`
                                         : course.courseDescription}</p>
                          </div>

                        </div>

                        <div className="w-1/4 px-2 py-3">
                          {course.totalDuration}
                        </div>

                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                            <p>Progress :{course.progressPercentage||0}%</p>
                            <ProgressBar completed={course.progressPercentage||0}
                            height='8px'
                            isLabelVisible={false}/>
                        </div>


                      </div>
                    ))
                  }

            </div>
          )
        }
        
    </div>
  )
}
