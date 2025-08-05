import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteAllCourse, getIntructorCourses } from "../../../services/operation/CourseApi"
import {IconButton} from "../../common/IconButton"
import CoursesTable from "./InstructorCourses/CourseCard"
import { MdDeleteOutline } from "react-icons/md"

export const MyCourses=()=> {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  
   useEffect(() => {
    const fetchCourses = async () => {
      const result = await getIntructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleDeleteAllCourse= async()=>{
      await deleteAllCourse (token)
      navigate('/dashboard/add-course')
     
  }
  

  return (
    <div>
      <div className="mb-14 flex flex-col md:flex-row md:items-center justify-between ">
        <h1 className="text-2xl md:text-3xl font-medium text-richblack-5">My Courses</h1>
        <div className="flex gap-3 md:justify-between items-center">
        <IconButton
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
          customClasses={'text-sm py-[3px] px-3'}
        >
          <VscAdd />
        </IconButton>
        <button
           className=" flex flex-row-reverse items-center justify-between cursor-pointer text-sm rounded-md bg-richblack-200 py-[3px] sm:py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={()=>{
              handleDeleteAllCourse()
             }} >
                <MdDeleteOutline className="text-lg"/>
                  Delete All Courses
        </button>
        </div>
        
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}