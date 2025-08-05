import React from 'react'
import { HighlightText } from '../HomePage/HighlightText';
import { CTAButton } from '../HomePage/Button';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];


export const LearningGrid = () => {
  return (
    <section className='bg-richblack-900'>
      <div className='grid mx-auto grid-cols-1 lg:grid-cols-4  w-[80%] bg-richblack-900  pb-10 pt-10'>   
        {
            LearningGridArray.map((card,index)=>(
                <div
                key={index}
                className={`${index===0 &&"lg:col-span-2 bg-richblack-900"}
                ${card.order%2===1 ?"bg-richblack-700":"bg-richblack-800" }
                ${card.order===3 && "lg:col-start-2"} lg:h-[300px] `}>
                    {
                        card.order<0 ?(
                            <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                <div className='lg:text-4xl text-3xl font-semibold'>
                                    {card.heading}
                                    <HighlightText text={`${card.highlightText}`}/>
                                </div>
                                <p className='font-medium text-richblack-100 mt-2'>{card.description}</p>
                                <div className='w-fit mt-10'>
                                    <CTAButton active={true} linkto={card.BtnLink}>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                                
                            </div>
                        ) :( <div className=' w-[60%] flex flex-col gap-2 mx-12 my-8'>
                               <div>
                               <h1 className=' xl:text-lg font-semibold h-[52px]'>{card.heading}</h1>
                               </div>
                               <div className='mt-8'>
                               <p className='text-richblack-100 text-sm'>{card.description}</p>
                               </div>
                                    
                                  
                             </div>

                        ) 
                    }

                </div>
            ))
        }


    </div>
    </section>
    
  )
}
