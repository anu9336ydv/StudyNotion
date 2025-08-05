import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '../../common/IconButton'
import { LiaUserEditSolid } from 'react-icons/lia'

export const MyProfile = () => {
     const{user}=useSelector((state)=>state.profile)
     const navigate=useNavigate()
  return (
    <div className=''>
        <h1 className='text-richblack-5 font-medium text-2xl md:text-3xl mb-6 '>
            My Profile
        </h1>
        {/* section1 */}
        <div className='  bg-richblack-800 flex justify-between items-center  h-full border border-richblack-700 rounded-lg py-8 px-6  '>
            <div className='flex relative items-center  sm:flex-row  justify-around gap-5  '>
                <img src={user.image} alt={`profile-${user.firstname} `} 
                className='aspect-square w-[4rem] rounded-full object-cover'/>

                <div className='text-richblack-300 relative'>
                    <p className='text-lg font-semibold text-richblack-5'>{user.firstName + " "+user.lastName} </p>
                    <p className='text-sm'>{user.email}</p>
                </div>

            </div>
            <IconButton text={"Edit"} customClasses={"flex-row-reverse hidden sm:flex"}
            onClick={()=>navigate("/dashboard/settings")}>
                <LiaUserEditSolid className='text-xl'/>
            </IconButton>
        </div>

        {/* section2 */}
        <div className=' bg-richblack-800 flex flex-col justify-between border border-richblack-700 rounded-lg  py-8 px-6  mt-12'>
            <div className='flex  justify-between gap-5  '>
                <p className='text-lg font-semibold text-richblack-5'>About</p>
                <IconButton text="Edit"  customClasses={"flex-row-reverse  hidden sm:flex"}
                onClick={()=>{navigate("/dashboard/setting")}}>
                    <LiaUserEditSolid className='text-xl'/>
                </IconButton>

            </div>

            <p className='text-sm text-richblack-300 mt-5'>
                {
                    user.additionalDetails.about!==null ?(user.additionalDetails.about):("write about your self")
                }
            </p>
        </div>

        {/* section 3 */}

        <div className='bg-richblack-800 flex flex-col justify-between border border-richblack-700 rounded-lg  py-8 px-6  mt-12'>
            <div className='flex  justify-between gap-5  '>
                <p className='text-lg font-semibold text-richblack-5'>Personal details</p>
                <IconButton text={"Edit"} customClasses={"flex-row-reverse  hidden sm:flex"}
            onClick={()=>navigate("/dashboard/settings")}>
                <LiaUserEditSolid className='text-xl'/>
            </IconButton>
            </div>
            <div className='grid sm:gird-row-3 sm:grid-cols-2  text-white gap-4'>
                <div>
                    <p className='text-sm text-richblack-600 font-normal'>First Name</p>
                    <p  className='text-sm font-medium text-richblack-5'>{user.firstName}</p>
                </div>
                
                <div>
                    <p className='text-sm text-richblack-600 font-normal'>Last Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.lastName}</p>
                </div>
                <div>
                    <p className='text-sm text-richblack-600 font-normal'>Email</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.email}</p>
                </div>
                <div>
                    <p className='text-sm text-richblack-600 font-normal'>Phone no.</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.additionalDetails.contactNumber ??" add phone no"}</p>
                </div>
                <div>
                    <p className='text-sm text-richblack-600 font-normal'>Gender</p>
                    <p className='text-sm font-medium text-richblack-5'>{user.additionalDetails.gender ??"add gender"}</p>
                </div>
                <div>
                    <p className='text-sm text-richblack-600 font-normal'>date of birth</p>
                    <p  className='text-sm font-medium text-richblack-5'>{user.additionalDetails.dateOfBirth ?? "Add date of birth"}</p>
                </div>
            </div>
        </div>

    </div>
  )
}
