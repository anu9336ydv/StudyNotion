import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '../../../common/IconButton'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { changePassword } from '../../../../services/operation/settingApi'

export const UpdatePassword = () => {
  const {user} = useSelector((state)=>state.profile)
    const {token}= useSelector((state)=>state.auth)
    const[showPassword,setShowPassword]= useState(false)
    const [showNewPassword,setShowNewPassword]= useState(false)
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const {
      handleSubmit,
      reset,
      register,
      formState:{errors,isSubmitSuccessful}
    }=useForm()

    const submitHandler =async(data)=>{
        try{
          //console.log("password sent to update",data)
          dispatch(changePassword(token,data))

        }
        catch(error){
              console.log("there is an error at update password",error.message)
        }
    }
    useEffect(
      ()=>{
        if(isSubmitSuccessful){
          reset({
            oldPassword:"",
            newPassword:""
          })

        }
      },[reset,isSubmitSuccessful])


  return (
    <div>
      
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-5'>
        <div className=' bg-richblack-800 flex flex-col gap-4 py-7 px-4 sm:px-12 rounded-lg border border-richblack-700 mt-10'>
           <div className='text-richblack-5 text-lg font-semibold'> Change Password</div>

           <div className='grid sm:grid-cols-2 sm:grid-rows-1 gap-5 '>
            <label className='relative'>
              <p className='text-richblack-50 '>Old Password</p>
              <input 
              type={showPassword ? "text" : "password"}
              placeholder='Enter Old Password'
              id='oldPassword'
              name='oldPassword'
              {...register("oldPassword",{required:true})}
              className='form-style w-full mt-1'
               />
               <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
               {errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your old password.
                  </span>
                )}
            </label>

            <label className='relative'>
              <p className='text-richblack-50 '>New Password</p>
              <input 
              type={showNewPassword ? "text" : "password"}
              placeholder='Enter New Password'
              id='newPassword'
              name='newPassword'
              {...register("newPassword",{required:true})}
              className='form-style w-full mt-1'

               />
               <span
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showNewPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
               {errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your new password.
                  </span>
                )}
            </label>

           </div> 
        </div>
        
        <div className='flex  justify-end gap-4'>
          <button className='bg-richblack-600 cursor-pointer rounded-md text-richblack-50 sm:font-semibold px-2 sm:px-8 text-base' onClick={()=>{
            navigate('/dashboard/my-profile')
          }}>
              Cancel
          </button>

          <IconButton text='Update' type='submit' customClasses={"flex-row-reverse px-2 py-[2px] !sm:py-2 !sm:px-5 "}/>
        </div>
      </form>


    </div>
  )
}
