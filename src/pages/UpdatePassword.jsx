import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operation/authApi'
import { BiArrowBack } from 'react-icons/bi'



export const UpdatePassword = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const {loading}=useSelector((state)=>state.auth)
    const [showPassword,setShowPassword] =useState(false)
    const [showConfirmPassword,setShowConfirmPassword] =useState(false)
    const [formData,setFormData]=useState({password:"",confirmPassword:""})
    const changeHandler =(event)=>{
        setFormData((prevData)=>({
            ...prevData,
            [event.target.name]:event.target.value
        }))
    }
    const submitHandler=(e)=>{
        e.preventDefault();
       
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(formData.password,formData.confirmPassword,token,navigate))
        

    }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
            loading ? (
                <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
                     <div className='loader '></div>
                </div>
            )
            :(
                <div className="max-w-[500px] p-4 lg:p-8" >
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new password</h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost Done Enter your new password and your are all set..</p>
                    <form onSubmit={submitHandler}>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup> </p>
                            <input 
                            type={showPassword ?"text":"password"}
                            required
                            name='password'
                            placeholder='Enter New Password'
                            value={formData.password}
                            onChange={changeHandler}
                                className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10"
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
                        </label>

                        <label className="relative mt-3 block">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"> Confirm New Password <sup className='text-pink-200'>*</sup> </p>
                            <input 
                            type={showConfirmPassword ?"text":"password"}
                            required
                            name='confirmPassword'
                            placeholder=' Confirm Password'
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                             className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10"

                             />
                              <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                        </label>
                        <button type='submit'
                         className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                            Reset password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                               <Link to={'/login'}>
                                    <p className="flex items-center gap-x-2 text-richblack-5"> <BiArrowBack /> back to login</p>
                               </Link>
                            </div>
                </div>
            )
        }

    </div>
  )
}
