import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getPasswordResetToken } from '../services/operation/authApi';
import { BiArrowBack } from 'react-icons/bi';


export const ForgotPassword = () => {

    const [emailSent, SetEmailSent]= useState(false);
    const[email,SetEmail] = useState("")
    const{loading}= useSelector((state)=>state.auth)
    const dispatch = useDispatch();

    const submitHander = (e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,SetEmailSent))
    }
  return (
    <div className='text-richblack-25  flex justify-center items-center w-screen h-screen'>
        {
            loading ?(
                <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
                     <div className='loader '></div>
                 </div>
            ):(
                <div className='max-w-[500px] p-4 lg:p-8 flex flex-col' >
                    <h1 className='text-3xl font-semibold text-richblack-5'>
                        {
                            !emailSent ? "Reset your Password":"Check Your Email"
                        }
                    </h1>
                    <p className='text-base my-4 text-richblack-200'>
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            :`We have sent the reset email to ${email}`
                        }
                    </p>
                    <form  onSubmit={submitHander} className='flex flex-col mt-6 justify-center'>
                        {
                            !emailSent&&(
                                <label className='w-full' >
                                    <p className='text-sm text-richblack-5 mb-1'>Email Address<span className='ml-1 text-pink-200'>*</span></p>
                                    <input 
                                    type="email"
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(e)=>SetEmail(e.target.value)}
                                    placeholder='Enter your email'
                                    className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none '
                                    
                                    />
                                </label>
                            )
                        }

                        <button type='submit' className='bg-yellow-25 w-full py-3 mt-4 rounded-xl text-richblack-900 text-center text-base font-medium'>
                            {
                                !emailSent  ?"Reset Password":"Resend Email"
                            }
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
