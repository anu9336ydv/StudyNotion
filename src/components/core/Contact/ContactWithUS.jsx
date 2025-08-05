import React from 'react'
import { ContactUsForm } from '../../common/ContactUsForm'

export const ContactWithUS = () => {
  return (
    <div className='flex flex-col w-[80%] mx-auto xl:mt-0 mt-9 border border-richblack-300 rounded-lg'>
        <div className='flex flex-col  gap-4  p-4  my-9'>
            <h1 className='text-4xl text-richblack-5 w-[%] ml-14 font-semibold'>
                Got a idea? We've got the skiils. Let's team up
            </h1>
            <p className='text-sm text-richblack-500 ml-14'>Tell us more about yourself and what you're got in mind</p>

            
            <ContactUsForm/>
        </div>
        
    </div>
  )
}
