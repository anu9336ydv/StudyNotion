import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../services/operation/settingApi'
import { useForm } from 'react-hook-form'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { IconButton } from '../../../common/IconButton'

const Gender=["Male", "Female","Other" ]
export const EditProfile = () => {
  const {user} = useSelector((state)=>state.profile)
    const {token}= useSelector((state)=>state.auth)
    
    const navigate=useNavigate()
    const dispatch= useDispatch()
    const {
      handleSubmit,
      register,
      formState:{errors}
    }=useForm()

    const submitProfileForm=async(data)=>{
      try{
        dispatch( updateProfile(token,data))
      }
      catch(error){
        console.log("error message at submit form",error.message)

      }
        
    }
  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit(submitProfileForm)}>
      
      <div className=' bg-richblack-800 flex flex-col gap-4 py-7 px-4 sm:px-12 rounded-lg border border-richblack-700 mt-10'>
        <div>
            <h1 className='text-richblack-5 text-xl font-semibold'>Profile Information</h1>
        </div>
        <div className='grid sm:grid-cols-2 sm:grid-rows-3 gap-5'>
          
              <label>
                <p className='text-richblack-5'>Firstname</p>
                <input
                  type='text'
                  name="firstName"
                  id='firstName'
                  placeholder='Enter Your FirstName'
                  defaultValue={user.firstName}
                  {...register("firstName",{required:true})}
                  className='form-style w-full mt-1'
                />{errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your first name.
                  </span>
                )}

              </label>
              <label>
                <p className='text-richblack-5'>Lastname</p>
                <input
                  type='text'
                  name="lastName"
                  id='lastName'
                  placeholder='Enter Your LastName'
                  defaultValue={user.lastName}
                  {...register("lastName",{required:true})}
                  className='form-style w-full mt-1'
                />
                {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}

              </label>
              <label>
                <p className='text-richblack-5'>Date of Birth</p>
                <input
                  type='date'
                  name="dateOfBirth"
                  placeholder='Enter Your Date Of Birth'
                  id='dateOfBirth'
                  defaultValue={user.additionalDetails.dateOfBirth}
                  {...register("dateOfBirth",{required:true,max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },})}
                  className='form-style w-full mt-1'
                  
                />
                {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your date of birth.
                </span>
              )}

              </label>
              
              <label>
                <p className='text-richblack-5'>Gender</p>
                <div>
                  <select name="gender" id="gender"
                 defaultValue={user.additionalDetails.gender}
                 {...register("gender",{required:true})}
                 className='form-style w-full mt-1'>
                 {
                    Gender.map((ele,index)=>{
                        return(
                          <option key={index} value={ele}>{ele}</option>
                        )
                    })
                 }
                    
                  </select>
                  {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select Your Gender.
                </span>
              )}
                </div>
              </label>
              <label>
                <p className='text-richblack-5'>Contact Number</p>
                <input
                  type='text'
                  name="contactNumber"
                  placeholder='Enter Your Contact Number'
                  id='contactNumber'
                  defaultValue={user.additionalDetails.contactNumber}
                  {...register("contactNumber",{required:{value:true,message:"please enter Phone No"},
                    maxLength:{value:10,message:"Invalid PhoneNo"},
                    minLength:{value:8,message:"invalid phone No"}})}
                  className='form-style w-full mt-1'
                />
                {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your  contact number.
                </span>
              )}

              </label>
              <label>
                <p className='text-richblack-5'>About</p>
                <input
                  type='text'
                  name="about"
                  placeholder='Write about something about yourself'
                  id='about'
                  defaultValue={user.additionalDetails.about}
                  {...register("about",{required:true})}
                  className='form-style w-full mt-1'
                />
                {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your about.
                </span>
              )}

              </label>
        </div>
      </div>
      <div className='flex  justify-end gap-4'>
                 <button onClick={()=>{
                  navigate('/dashboard/my-profile')
                  }}
                  className='bg-richblack-600 cursor-pointer rounded-md text-richblack-50 sm:font-semibold px-2 sm:px-8 '>
                    Cancel
                 </button>
                 <IconButton text='Save' type='submit' customClasses={"flex-row-reverse px-2 py-[2px] !sm:py-2 !sm:px-5  "}/>
      </div>
    
               
    </form>
    </>
    
  )
}
