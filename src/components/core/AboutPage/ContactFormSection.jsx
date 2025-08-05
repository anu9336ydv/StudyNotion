import React, { useState } from 'react'
import { ContactUsForm } from '../../common/ContactUsForm'

export const ContactFormSection = () => {
    // const [formData,setFormData]= useState({firstName:"",lastName:"",email:"",countryCode:"",contactNumber:"", message:""})

    // const changeHandler=(e)=>{
    //     e.preventDefault()
    //     setFormData((prevData)=>({
    //         ...prevData,
    //         [e.target.name]:e.target.value
    //     }
           
    //     ))
    // }
  return (
    <div className=' flex flex-col items-center justiy-center pb-20 bg-richblack-900'>
        {/* <form >
        <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={changeHandler}
                        placeholder="Enter first name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={changeHandler}
                        placeholder="Enter last name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                    </div>
                    <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    </label>
                    <div className="flex gap-x-4">

                    <label className="w-full flex flex-row">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Phone Number <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={changeHandler}
                        placeholder="+91"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[10%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    <input
                        required
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={changeHandler}
                        placeholder="Enter your Mobile No"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    </label>
                    <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        message <sup className="text-pink-200">*</sup>
                    </p>
                    

                    </label>

                        
                        
                    </div>
                    <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                    Create Account
                    </button>
        </form> */}
        <div>
            <h1 className='text-center text-4xl font-semibold mb-4'>
                Get in Touch
            </h1>
            <p  className='text-center text-sm text-richblack-200'>We'd love to here for you, Please fill out this form</p>
        </div>
        <div className=''>
        <ContactUsForm/>
        </div>
        

    </div>
  )
}
