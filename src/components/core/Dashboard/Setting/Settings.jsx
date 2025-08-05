import React from 'react'
import { UpdatePicture } from './UpdatePicture'
import { EditProfile } from './EditProfile'
import { DeleteAccount } from './DeleteAccount'
import { UpdatePassword } from './UpdatePassword'

export const Settings = () => {
  return (
    <div className=''>
      <h1 className='text-richblack-5 text-2xl md:text-3xl font-medium'> Edit Profile</h1>
        {/* update profile picture  */}
        <UpdatePicture/>

        {/* edit profile */}
        <EditProfile/>

        {/* Update password */}
        <UpdatePassword/>
{/* 
        delete account */}
        <DeleteAccount/>
    </div>
  )
}
