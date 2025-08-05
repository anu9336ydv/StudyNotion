import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector'
import { contactusEndpoint } from '../../services/apis'
import CountryCode from "../../data/countrycode.json"
import { useDispatch } from 'react-redux'

export const ContactUsForm = () => {
    const [loading,setLoading]= useState(false)
    
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    }= useForm()

    const submitContactForm= async(data)=>{
        //console.log("form data",data)
        try{
            setLoading(true);
            const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)

            //console.log(response)

            setLoading(false)

        }
        catch(error){
                //console.log("Error-",error)
                setLoading(false)
        }
    }

    useEffect(
        ()=>{
            if(isSubmitSuccessful){
                reset({
                    email:"",
                    firstname:"",
                    lastname:"",
                    message:"",
                    phoneNo:"",

                })
            }
        },[reset,isSubmitSuccessful]
    )
  return (
    <div className='grid place-items-center mt-10'>
        {
            loading ? (
                 <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
                    <div className='loader '></div>
                 </div>):(
                <form onSubmit={handleSubmit(submitContactForm)}  className="flex flex-col   gap-y-4 w-[80%]" >

                {/* first name and lastname */}
        
                <div className='flex sm:flex-row flex-col gap-5 w-[%]'>
        
                     {/* firstName */}
        
                     <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                First Name <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Enter first name"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10"
                                {
                                    ...register("firstname",{required:true})
                                }
                                />
                                {
                                    errors.firstname&&(
                                        <span className="-mt-1 text-[12px] text-yellow-25">
                                            please enter your name
                                        </span>
                                    )
                                }
                               
                      </label>
        
                     {/* lastName */}
        
                      <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                Last Name 
                                </p>
                                <input
                                
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Enter last name"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10"
                                {
                                    ...register("lastname")
                                }
                                />
                                {
                                    errors.lastname&&(
                                        <span>
                                            please enter your name
                                        </span>
                                    )
                                }   
                      </label>
                </div>
        
                 {/* email */}
        
                 <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                 Email <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                
                                type="eamil"
                                name="email"
                                id="email"
                                placeholder="Enter email"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10"
                                {
                                    ...register("email",{required:true})
                                }
                                />
                                {
                                    errors.email&&(
                                        <span className="-mt-1 text-[12px] text-yellow-25">
                                            please enter your email
                                        </span>
                                    )
                                }   
                 </label>

                 {/* phoneNo */}
                <div className='flex flex-col gap-2'>
                <label className='flex flex-col gap-2'>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                 Phone Number <sup className="text-pink-200">*</sup>
                                </p>
                                {/* ddropdown */}
                                <div className=' flex gap-2'>
                                <select
                                name='dropdown'
                                id='dropdown'
                                {
                                    ...register("countrycode" ,{required:true})
                                }
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-lg bg-richblack-800  text-[16px] leading-[24px] text-richblack-100 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-[40%] sm:w-[12%] "
                                >
                                    {
                                        CountryCode.map((ele,index)=>(
                                            <option key={index} value={ele.code}>
                                                {ele.code}-{ele.country}
                                            </option>
                                        ))
                                    }

                                </select>
                                <input
                                type="tel"
                                name="phoneno"
                                id="phoneno"
                                
        
                                placeholder="Enter your phone number"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10 "
                                {
                                    ...register("contactnumber",{
                                        required:{value:true,message:"please enter Phone No"},
                                        maxLength:{value:10,message:"Invalid PhoneNo"},
                                        minLength:{value:8,message:"invalid phone No"}

                                    })
                                }
                                />
                                {
                                    errors.phoneno&&(
                                        <span className="-mt-1 text-[12px] text-yellow-25">
                                            please enter your Phone No.
                                        </span>
                                    )
                                }  
                                </div>
                                
                                
                 </label>

                </div>

                        
                 {/* message */}
        
                 <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                 Message <sup className="text-pink-200">*</sup>
                                </p>
                                <textarea
                                
                                type="message"
                                name="message"
                                id="message"
                                cols="30"
                                rows="7"
        
                                placeholder="Enter your message"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-lg bg-richblack-800 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pr-10"
                                {
                                    ...register("message",{required:true})
                                }
                                />
                                {
                                    errors.email&&(
                                        <span className="-mt-1 text-[12px] text-yellow-25">
                                            please enter your message
                                        </span>
                                    )
                                }   
                 </label>
                        
                {/* submit button */}
        
                <button type='submit'
                      className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                    Send Message
                </button>
        
                   
            </form>
            )
        }
    </div>
    

  )
}
