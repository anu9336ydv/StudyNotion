import React from 'react'

const Stats=[
    {
        count:'5k',
        lable:"Active Students"

    },
    {
        count:'10k',
        lable:"Mentors"
        
    },
    {
        count:'200+',
        lable:"Courses"
        
    },
    {
        count:'50+',
        lable:"Awards"
        
    }
]
export const StatsComponent = () => {
  return (
    <section className='bg-richblack-800 py-20 '>
        <div>
            <div className='flex flex-row gap-10 sm:gap-20 items-center   justify-evenly  '>
                {
                    Stats.map((data,index)=>{
                        return(
                                <div key={index} className='flex flex-col items-center gap-6 text-center '>
                                    <h1 className=' lg:text-3xl text-2xl'>{data.count}</h1>
                                    <h2 className='text-base text-center text text-richblack-300 '>{data.lable}</h2>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}
