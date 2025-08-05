import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconButton } from '../../../../common/IconButton';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropright,IoMdArrowDropleft } from "react-icons/io";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operation/CourseApi';
import { NestedView } from './NestedView';
export const CourseBuilderForm = () => {
    const {token}= useSelector((state)=>state.auth)
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    }= useForm();
    const {course} = useSelector((state)=>state.course)

    const[editSectionName,setEditSectionName]=useState(null)
    const dispatch = useDispatch()
    const[loading,setLoading]=useState(false)

    const cancelEdit =()=>{
        setEditSectionName(null);
        setValue("sectionName","")
    }

    const goBack = ()=>{
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }
    const goToNext = ()=>{
        //console.log("course lenght",course.courseContent.length)
        if(course.courseContent.length===0){
            toast.error("please add a section")
            return;
        }
        if(course.courseContent.some((section)=>section.subSection.length===0)){
            toast.error("Please add one lecture in each section ")
            return;
        }

        dispatch(setStep(3))

    }

    const onSubmit = async (data)=>{
        setLoading(true);
        let result;
        if(editSectionName){
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id
                },token
               
            )
        }
         else{
            result = await createSection({
                sectionName: data.sectionName,
                courseId : course._id,

            },token
        )
         }
        // console.log("result",result)
         // update value 
         if(result){
            dispatch(setCourse(result))
            //console.log("course",course)
            setEditSectionName(null);
            setValue("sectionNamen","")
         }
         //console.log("course1",course)

         setLoading(false)

    }
    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
          cancelEdit()
          return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
        //console.log("section id", sectionId)
      }

  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 mb-10'>
        <p className="text-2xl font-semibold text-richblack-5"> CourseBulider</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div  className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5"  htmlFor='sectionName'>Section Name <sup className="text-pink-200">*</sup></label>
                <input
                id='sectionName'
                placeholder='Add section name'
                disabled={loading}
                {...register("sectionName",{required:true})}
                    className=' form-style w-full '
                />
                {
                    errors.sectionName &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200"> Section name is required</span>
                    )
                }
            </div>
            <div className="flex items-end gap-x-4">
                <IconButton type={'submit'}
                text={editSectionName ? "Edit Section Name":" Create Section"}
                outline = {true}
                disabled={loading}
                customClasses={'text-yellow-50 '}
                >
                    <IoIosAddCircleOutline  className='text-lg' />

                </IconButton>
                {
                    editSectionName && (
                        <button
                        type='button'
                        onClick={cancelEdit}
                        className='text-sm text-richblack-300 underline ml-2'>
                            Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>

        {
            course.courseContent.length >0 &&(
                <NestedView  handleChangeEditSectionName={handleChangeEditSectionName}/>
                )
        }
        <div className='flex justify-end gap-x-3'>
                <button 
                onClick={goBack}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                    <IoMdArrowDropleft/>
                    Back

                </button>
                <IconButton disabled={loading} text={'Next'} onClick={goToNext}>
                    <IoMdArrowDropright/>

                </IconButton>
        </div>
        

    </div>
  )
}
