import React, { useEffect, useState } from 'react'
import { getIntructorCourses } from '../../../../services/operation/CourseApi'
import { getInstructorData } from '../../../../services/operation/profileApi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CourseBuilderForm } from '../AddCourse/CourseBuilder/CourseBuilderForm'
import { InstructorChart } from './InstructorChart'

export const Instructor = () => {
    const[loading,setLoading]= useState(false)
    const [instructorData,setInstructorData] = useState(null)
    const [ courseData,setCourseData] = useState([])
    const{token} = useSelector((state)=>state.auth)
    const{user}= useSelector((state)=>state.profile)



    useEffect(()=>{
        setLoading(true)
        const getCourseDataWithStats  = async()=>{
            const InstructorApiData = await getInstructorData(token)
            const result = await getIntructorCourses(token)
            //console.log("InstructorApiData",InstructorApiData)

            if(InstructorApiData){
                setInstructorData(InstructorApiData)
            }
            if(result){
                setCourseData(result)
            }
            setLoading(false)
        }
        getCourseDataWithStats()
    },[])
    if(instructorData){

        var totalAmount = instructorData.reduce((acc,curr)=>
            acc+curr.totalAmountGenerated,0)
        //console.log("totalAmount",totalAmount)
      
        
         var totalStudents = instructorData.reduce((acc,curr)=> acc+curr.totalStudentsEnrolled,0)
         //console.log("totalStudents",totalStudents)
        
    }
    

  return (
    <div className='text-white '>
       <div className="space-y-2">
        <h1 className=" text-xl sm:text-2xl font-bold text-richblack-5">Hi {user.firstName} 👋</h1>
        <p className=" font-normal sm:font-medium text-richblack-200">Lets start some thing new</p>

       </div>

       {
        loading ? (
            <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
                    <div className='loader '></div>
                </div>

        ):courseData.length >0 ?
        ( <div className='  '>
             <div>
                 <div className="my-4 flex flex-col md:flex-row  md:h-[450px] md:space-x-4 mx-auto">
                        {totalAmount > 0 || totalStudents > 0 ? (
                            <InstructorChart courses={instructorData} />
                            ) : (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                        <p className="text-lg font-bold text-richblack-5">Visualize</p>
                        <p className="mt-4 text-xl font-medium text-richblack-50">
                            Not Enough Data To Visualize
                        </p>
                        </div>
                        )}

                        <div className=" flex-1 flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6 mt-7 md:mt-0 ">
                            <p className="text-lg font-bold text-richblack-5">Statistic</p>
                            <div>
                                <p className="text-lg text-richblack-200">Total Courses</p>
                                <p className="text-3xl font-semibold text-richblack-50">{courseData.length}</p>
                            </div>
                            <div >
                                <p className="text-lg text-richblack-200">Total Students</p>
                                <p  className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                            </div>
                            <div>
                                <p className="text-lg text-richblack-200">Total Income</p>
                                <p className="text-3xl font-semibold text-richblack-50">Rs. {totalAmount}</p>
                            </div>
                        </div>
                 </div>
             </div>
             <div className="rounded-md hidden md:flex flex-col bg-richblack-800 px-6 py-3 mb-3">
                    <div className="flex items-center justify-between">
                        <p  className="text-lg font-bold text-richblack-5">Your Course</p>
                        <Link to='/dashboard/my-courses'>
                        <p  className="text-xs font-semibold text-yellow-50">View all</p></Link>
                    </div>
                    <div className="my-4 flex items-start space-x-6">
                        {
                            courseData.slice(0,3).map((course)=>{
                                return(
                                    <div  key={course._id} className="w-1/3">
                                        <img src={course.thumbnail} alt={course.courseName}
                                        className="h-[201px] w-full rounded-md object-cover" />
                                        <div className="mt-3 w-full">
                                            <p className="text-sm font-medium text-richblack-50">{course.courseName}</p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <p className="text-xs font-medium text-richblack-300">Students {course.studentsEnrolled.length}</p>
                                                <p className="text-xs font-medium text-richblack-300"> | </p>
                                                <p className="text-xs font-medium text-richblack-300">Rs {course.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
             </div>
         </div>
        ):(<div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not created any courses yet
            </p>
            <Link to="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a course
              </p>
            </Link>
          </div>)
       }
       

    </div>
  )
}
