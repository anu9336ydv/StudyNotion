import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { SubSectionModal } from './SubSectionModal';
import { ConfirmationModal } from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operation/CourseApi';
import { setCourse } from '../../../../../slices/courseSlice';

export const NestedView = ({handleChangeEditSectionName}) => {

    const dispatch = useDispatch()
    const {course}= useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)
    const[addSubSection,setAddSubSection]= useState(null)
    const[viewSubSection,setViewSubSection]= useState(null)
    const[editSubSection,setEditSubSection]= useState(null)
    const [confirmationModal,setConfirmationModal]= useState(null)
    const handleDeleteSection=  async(sectionId)=>{
        const result = await deleteSection({
            sectionId,
            courseId:course._id,
            token,
        })
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)

    }

    const handleDeleteSubSection= async(subSectionId,sectionId)=>{
       // console.log("sectionId",sectionId)
       // console.log("subSectionId",subSectionId)
        const result = await deleteSubSection({subSectionId,sectionId,token})
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
              section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        setConfirmationModal(null)
        }


    }

  return (
    <div>
        <div className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer">
            {
                course.courseContent.map((section)=>(
                    <details key={section._id} open>

                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            <div  className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button 
                                onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                    <MdOutlineModeEdit className="text-xl text-richblack-300" />
                                </button>

                                <button
                                onClick={()=>{
                                    setConfirmationModal({
                                        text1: "Do you want to delete this Section?",
                                        text2:
                                          "All the lecture related to this section will be deleted",
                                        btn1text: "Delete" ,
                                        btn2text: "Cancel",
                                        btn1Handler: ()=> handleDeleteSection(section._id), 
                                        btn2Handler: ()=> setConfirmationModal(null)
                                      })
                                }}>
                                    <MdDeleteOutline className="text-xl text-richblack-300"/>
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <IoMdArrowDropdown className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>

                        <div  className="px-6 pb-4">
                            {
                                section.subSection.map((data)=>(
                                    <div key={data._id}
                                    
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                    >
                                         <div  className="flex items-center gap-x-3" onClick={()=>setViewSubSection(data)}>
                                          <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                          <p className="font-semibold text-richblack-50">{data.title}</p>
                                         </div>
                                         <div className='flex items-center gap-x-3'>
                                            <button
                                            onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                                 <MdOutlineModeEdit className="text-xl text-richblack-300"/>
                                            </button>
                                            <button onClick={()=>{
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this SubSection?",
                                                    text2:
                                                      "The lecture related to this subsection will be deleted",
                                                    btn1text: "Delete" ,
                                                    btn2text: "Cancel",
                                                    btn1Handler: ()=> handleDeleteSubSection(data._id,section._id), 
                                                    btn2Handler: ()=> setConfirmationModal(null)
                                                  })
                                            }}>
                                                 <MdDeleteOutline className="text-xl text-richblack-300"/>

                                            </button>
                                            
                                         </div>


                                    </div>
                                ))
                            }
                            {/* add lecture button */}
                            <button 
                            onClick={()=>setAddSubSection(section._id)}
                            className="mt-3 flex items-center gap-x-1 text-yellow-50">
                                <AiOutlineVideoCameraAdd className="text-lg" />
                                <p>Add lecture video</p>
                            </button>
                        </div>

                    </details>
                ))
            }

        </div>

        {addSubSection?(<SubSectionModal
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
        />)
        :viewSubSection ?(<SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
            />)
        :editSubSection ?(<SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}/>)
        :(<div></div>)}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
} 
