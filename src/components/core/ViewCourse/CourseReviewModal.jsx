import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import RatingStars from '../../common/RatingStars'
import ReactStars from "react-rating-stars-component";
import { IconButton } from '../../common/IconButton'
import { createRating } from '../../../services/operation/CourseApi'



export const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const {courseEntireData} = useSelector((state)=>state.viewCourse)

    const{
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm();

    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0)
    },[])

    const ratingChange=(newRating)=>{
            setValue("courseRating",newRating)
    }

    const onSubmit= async(data)=>{
        await createRating({
            courseId:courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        },
    token)
    setReviewModal(false)
    }

  return (
    <div className="fixed inset-0 z-[10000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div  className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                <p className="text-xl font-semibold text-richblack-5">Add Review</p>
                <button onClick={()=>setReviewModal(false)}>
                    <RxCross2  className="text-2xl text-richblack-5"/>
                </button>
            </div>

            {/* body */}
            <div  className="p-6">
                <div className="flex items-center justify-center gap-x-4">
                    <img src={user.image} alt="user" className='aspect-square w-[50px] rounded-full object-cover' />
                    <div>
                        <p className="font-semibold text-richblack-5">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-richblack-5">Posting Publicly</p>
                    </div>
                </div>

                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-4 flex flex-col itmes-center justify-center'>
                    
                    <div className='grid place-content-center'>
                    <p className="text-sm text-richblack-5 ml-2">Select Rating <span className="text-pink-200">*</span></p>
                    <ReactStars
                   count={5}
                   onChange={ratingChange}
                   size={24}
                   activeColor='#ffd700'/>

                    </div>
                  
                   <div  className="flex w-11/12 mx-auto flex-col justify-center space-y-2">
                      <label htmlFor='courseExperience'
                       className="text-sm text-richblack-5">
                        Add Your Experience <span className="text-pink-200">*</span>
                      </label>
                      <textarea
                      id='courseExperience'
                      placeholder='Add Your Experience here'
                      {...register("courseExperience",{required:true})}
                      
                      className="form-style resize-x-none min-h-[130px] w-full"/>
                      {
                        errors.courseExperience && (
                        <span  className="ml-2 text-xs tracking-wide text-pink-200">
                            Please add your Experience
                        </span>)
                      }
                   </div>

                    <div  className="mt-6 flex w-11/12 mx-auto justify-end gap-x-2">
                        <button  className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        onClick={()=>setReviewModal(false)}>
                            Cancel
                        </button>
                        <IconButton
                        type={'submit'}
                        text={'save'}
                        customClasses={'px-4'}/>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}
