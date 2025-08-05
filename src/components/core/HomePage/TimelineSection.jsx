import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline =[
    {
        Logo:Logo1,
        Heading:"Leadership",
        Description:"Fully comitted to the success of company",
    },

    {
        Logo:Logo2,
        Heading:"Leadership",
        Description:"Fully comitted to the success of company",
    },

    {
        Logo:Logo3,
        Heading:"Leadership",
        Description:"Fully comitted to the success of company",
    },

    {
        Logo:Logo4,
        Heading:"Leadership",
        Description:"Fully comitted to the success of company",
    },
]

export const TimelineSection = () => {
  return (
    <div>
        <div className=' flex flex-col lg:flex-row  gap-20 items-center justify-between'>
            <div className='flex flex-col gap-5'>
                {
                    timeline.map((element,index) =>{
                        return(
                            <div className='flex flex-row gap-6' key={index}>
                                <div>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]'>
                                        <img src={element.Logo} alt=' '/>
                                        
                                    </div>
                                    <div
                                        className={`hidden ${
                                            timeline.length - 1 === index ? "hidden" : "lg:block"
                                        }  h-10 border-dashed border-r border-richblack-100 bg-richblack-400/0 w-[26px] mt-5`}
                                    ></div>
                                </div>
                                
                                
                                

                                <div>
                                    <h2 className='font-semibold text-[18px]'>
                                        {element.Heading}
                                    </h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                                


                            </div>
                        )
                    })
                }
                
            </div>


            <div className='relative w-fit h-fit  '>
                 <div className='timeline '></div>
                 {/* shadow-blue-200 shadow-[0px_5px_50px_-3px] */}
                 <img src={timelineImage} alt=''
                className='lg:drop-shadow-[20px_20px_0_rgba(255,255,255,1)] drop-shadow-[10px_10px_0_rgba(255,255,255,1)]'/>
                
                <div className='absolute  green bg-caribbeangreen-700 flex flex-row text-white uppercase py-3 lg:py-7  left-[13%] translate-y-[-50%] translate-x-[-10%]   lg:translate-x-[0%] '>
                <div className='flex flex-row gap-5 items-center justify-center border-r border-caribbeangreen-300  lg:px-7'>
                        <p className='lg:text-3xl  text-2xl font-bold'>10</p>
                        <p className="text-caribbeangreen-300 lg:text-sm text-xs w-[50%]">Year of experience</p>
                        
                    </div>

                    <div className='gap-5 flex items-center lg:px-7 justify-center'>
                        <p className='lg:text-3xl  text-2xl font-bold'>250</p>
                        <p className="text-caribbeangreen-300 lg:text-sm text-xs w-[50%]">type of course</p>

                    </div>


                </div>
               
            </div>
        </div>
       
    </div>
  )
}
