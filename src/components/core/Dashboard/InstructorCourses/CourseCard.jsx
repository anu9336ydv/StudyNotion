import React, { useEffect, useState } from 'react'
import { getIntructorCourses } from '../../../../services/operation/CourseApi'
import { useSelector } from 'react-redux'
import { coursesEndpoint } from '../../../../services/apis'
import { formatDate } from "../../../../services/formatData"
import {COURSE_STATUS} from "../../../../utils/constants"
import{HiClock} from 'react-icons/hi'
import {FaCheck} from 'react-icons/fa'

// export const CourseCard = () => {
//     const {token}= useSelector((state)=>state.auth)
//     const[courses,setCourses] = useState(null)
//     const instructorCourses=async()=>{

//         try{
//             const response = await getIntructorCourses(token)
//             console.log("response is",response)
//             setCourses(response)
//         }
//         catch(error){
//             console.log("unable to fetch Courses",error)
//         }
//     }
//     useEffect(()=>{
//         instructorCourses()
//     },[])
//   return (
//     <div>
//         <div>
//             <div>
//                 <p>COURSES</p>
//             </div>
//             <p>DURATION</p>
//             <p>PRICE</p>
//             <p>ACTIONS</p>
//         </div>

//         <div>
//             {
//                 !courses ?(
//                     <div className='loader'></div>
//                 ):(
//                     courses.length ? (<div>You Have Created No Courses </div>):(
//                         <div>
//                             {
//                                 courses.map((course,index)=>{

//                                     <div key={index}>
//                                             <div>
//                                                 <img src={course.thumbnail} alt="" />
//                                                 <div>
//                                                     <p>{course.courseName}</p>
//                                                     <p>{course.courseDescription.split(" ").length >
//                                                             30
//                                                          ? course.courseDescription
//                                                                     .split(" ")
//                                                                     .slice(0, 30)
//                                                                     .join(" ") + "..."
//                                                         : course.courseDescription}
//                                                     </p>
//                                                     <p> Created:{formatDate(course.createdAt)}</p>
//                                                         {course.status === COURSE_STATUS.DRAFT ? (
//                                                             <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
//                                                              <HiClock size={14} />
//                                                                 Drafted
//                                                             </p>
//                                                              ) : (
//                                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
//                                                                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
//                                                                           <FaCheck size={8} />
//                                                                     </div>
//                                                                     Published
//                                                             </p>
//                     )}
//                                                 </div>


//                                             </div>

//                                             <div>

//                                             </div>
//                                     </div>

//                                 })
//                             }
//                         </div>
//                     )
//                 )
//             }
//         </div>
//     </div>
//   )
// }
import { useDispatch } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"


import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { FiEdit2 } from "react-icons/fi"

import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"


import {
  deleteCourse,
} from "../../../../services/operation/CourseApi"

import {ConfirmationModal} from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 10

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await getIntructorCourses(token)
    //console.log("result",result)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800  px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase  text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[240px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </div>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {course.timeDuration}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1text: !loading ?"Delete" : "Loading...  ",
                        btn2text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}