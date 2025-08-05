import React from 'react'
import { HighlightText } from './HighlightText'

import Know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import Compare_with_other from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'

import { CTAButton } from './Button'

export const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
        <div className='flex flex-col items-center justify-center gap-5'>
              
                  <div className=' text-3xl lg:text-4xl font-semibold lg:text-center'>
                  Your swiss knife for 
                  <HighlightText text={"learning any language"}/>
                  </div>

                  <div className='lg:text-center text-richblack-600 mx-auto text-base lg:w-[70%] -mt-1 font-medium'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                  </div>

                  <div className='flex flex-col lg:flex-row items-center lg:justify-center lg:mt-5 lg:ml-7 '>
                    <img src={Know_your_progress} alt='' className='object-contain  lg:-mr-32'/>
                    <img src={Compare_with_other} alt='' className='object-contain -mt-14 lg:-mt-0 '/>

                    <img src={plan_your_lessons} alt='' className='object-contain -mt-20 lg:-mt-0 lg:-ml-36'/>
                  </div>

                  <div className='text-center w-fit mb-16 '>
                    <CTAButton active={true} linkto={'/signup'}>
                    Learn More
                    </CTAButton>
                  </div>

        </div>

    </div>
  )
}
