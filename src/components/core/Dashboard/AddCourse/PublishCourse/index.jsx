import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdArrowDropleft } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { IconButton } from '../../../../common/IconButton'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../services/operation/CourseApi'

export const PublishCourse = () => {
    const {register,handleSubmit ,setValue,getValues} = useForm()
    const dispatch = useDispatch()
    const [loading,setLoading]=useState(false)
    const {course}= useSelector((state)=>state.course)
    const {token} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(course.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    })
    const navigate = useNavigate()

    const goToCourse =()=>{
        dispatch(resetCourseState())
        navigate('/dashboard/my-courses')
    }

    const goBack = ()=>{
        dispatch(setStep(2))
        // dispatch(setEditCourse(true))
    }
    const handleCoursePublish = async ()=>{
        if((course.status === COURSE_STATUS.PUBLISHED && getValues("public")===true) ||
            (course.status === COURSE_STATUS.DRAFT && getValues("public")===false)){
                //no update

                goToCourse();
                return
        }

        //form update 
        const formData = new FormData()

        formData.append("courseId", course._id)
        const courseStatus = getValues ("public") ? COURSE_STATUS.PUBLISHED: COURSE_STATUS.DRAFT;
        formData.append ("status",courseStatus);
        setLoading(true);
        const result = await editCourseDetails(formData,token)
       // console.log("result",result)
        if(result){
            goToCourse()
        }

        setLoading(false)
    }
    const onSubmit=()=>{
        handleCoursePublish()
    }
  return (
    <div  className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Publish Course</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='public' className="inline-flex items-center text-lg">
                    <input
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className="border-gray-700 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:outline-none accent-yellow-100"
                    />
                     <span className="ml-2 text-richblack-400">
                        Make this course as public
                     </span>
                </label>
                
            </div>
            <div className="ml-auto flex max-w-max items-center gap-x-4" >
                <button
                disabled={loading}
                type='button'
                onClick={goBack}
                className="flex cursor-pointer text-center items-center justify-center gap-x- rounded-md bg-richblack-300 py-[8px] px-[10px] font-semibold text-richblack-900"
                >
                <IoMdArrowDropleft className='text-lg mr-1'/>
                    Back
                </button>

                <IconButton disabled={loading} text='Save Changes'/>
            </div>
        </form>
    </div>
  )
}
