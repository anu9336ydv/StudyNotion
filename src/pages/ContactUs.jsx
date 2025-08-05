import React from 'react'
import { Footer } from '../components/common/Footer'
import { IoIosChatboxes } from 'react-icons/io'
import { ContactWithUS } from '../components/core/Contact/ContactWithUS'
import { IoCallOutline, IoEarthSharp } from 'react-icons/io5'
import { ReviewSlider } from '../components/common/ReviewSlider'

export const ContactUs = () => {
  return (
    <div>
        {/* main */}
        <div>
            
            <div className='xl:flex  xl:flex-row    xl:justify-around my-10'>
                {/* left */}
                <div className=' mx-auto  flex flex-col gap-6 p-5 h-[400px] sm:h-[300px] items-start w-7/12 xl:w-3/12 bg-richblack-800 rounded-xl'>
                    <div className='flex gap-2 flex-row '>
                        <IoIosChatboxes className='text-richblack-200 w-6 h-6 mt-1'/>
                        <div className='flex  flex-col'>
                            <h1 className=' text-richblack-200 text-lg font-semibold'>Chat on us</h1>
                            <p className='text-richblack-300 text-sm'>Our friendly team is hear to help</p>
                            <p  className='text-richblack-300 text-sm'>@mail address</p>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-row '>
                        <IoEarthSharp className='text-richblack-200 w-6 h-6 mt-1'/>
                        <div className='flex  flex-col'>
                            <h1 className=' text-richblack-200 text-lg font-semibold'>Visit us</h1>
                            <p className='text-richblack-300 text-sm'>Come and say hello at our office HQ</p>
                            <p  className='text-richblack-300 text-sm'>Here is the location/ address</p>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-row '>
                        <IoCallOutline className='text-richblack-200 w-6 h-6 mt-1'/>
                        <div className='flex  flex-col'>
                            <h1 className=' text-richblack-200 text-lg font-semibold'>Call us</h1>
                            <p className='text-richblack-300 text-sm'>Mon - Fri from 8am to 5pm</p>
                            <p  className='text-richblack-300 text-sm'>+91 1234567890</p>
                        </div>
                    </div>
                   

                </div>
                {/* right */}
                <div>
                    <ContactWithUS/>
                </div>


            </div>

            <div className='w-11/12 mx-auto mt-20'>
           <h2 className='lg:text-center text-3xl lg:text-4xl font-semibold mt-10 text-richblack-50'>Reviews From Other Learner</h2>

            {/* Reviewslider */}
            <ReviewSlider/>


        </div>

            <Footer/>
        </div>
    </div>
  )
}
