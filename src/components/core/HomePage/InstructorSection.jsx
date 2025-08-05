import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import { HighlightText } from './HighlightText'
import { CTAButton } from './Button'
import { FaArrowRight } from 'react-icons/fa6'

export const InstructorSection = () => {
  return (
    <div className='lg:mt-20 mt-10 '>
        <div className='flex flex-col-reverse lg:flex-row items-center lg:gap-32 gap-10 '>
            <div className=' block lg:hidden w-fit gap-2 '>
                    <CTAButton active={true} linkto={'/signup'} >Start Teaching Today
                        <FaArrowRight/> </CTAButton>
                </div>
            <div className=' w-[] '> 
                    <img src={Instructor} alt="" className='shadow-white shadow-[-10px_-10px_0_0] lg:shadow-[-20px_-20px_0_0]  '/> 
            </div>

            

            <div className='flex flex-col   gap-4 lg:w-[50%] '>
                
                <div className=' text-3xl lg:text-4xl  font-semibold' >
                    <p>Become an</p>
                    <HighlightText text={"Instructor"}/>
                </div>
                <div className='font-medium text-[16px] lg:w-[75%] text-richblack-300 mr-1'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love
                </div>

                <div className=' hidden lg:block w-fit gap-2 mr-[15.50rem] mt-10'>
                    <CTAButton active={true} linkto={'/signup'} >Start Teaching Today
                        <FaArrowRight/> </CTAButton>
                </div>

            </div>

        </div>

    </div>
  )
}
