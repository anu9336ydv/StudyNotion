import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import {HighlightText} from './HighlightText'
import {CourseCard} from './CourseCard'

const tabName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

export const ExploreMore = () => {
    const [currentTab ,setCurrentTab] = useState(tabName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const[currentCard, setCurrentCard ]= useState(HomePageExplore[0].courses[0].heading) 

    const setMyCard = (value)=>{
      setCurrentTab(value);
      const result = HomePageExplore.filter((course)=> course.tag === value)
      setCourses(result[0].courses)
      setCurrentCard(result[0].courses[0].heading)

    }
  return (
    <div className=''>
        <div className=' px-3 lg:px-0 text-3xl lg:text-4xl lg:text-center font-semibold my-10'>
          Unlock the 
          <HighlightText text={"Power of Code"}/>
        </div>

        <div className='text-richblack-300  px-3 lg:px-0 lg:text-center font-medium text-sm mt-3 '>
        Learn to Build Anything You Can Imagine
        </div>

        <div className=' hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
          {
            tabName.map((element,index)=>{
              return(
                <div className={`text-[16px] flex flex-row item-center gap-2 ${ currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium  ":"text-richblack-300"} rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 px-5 mx-1 py-2`} key={index} onClick={()=>setMyCard(element)}>
                  {element}
                </div>
              )
            })
          }

        </div>

        <div className="hidden lg:block lg:h-[300px]"></div>


        <div className=' lg:absolute gap-10 justify-center mt-4 lg:gap-0 flex flex-col lg:flex-row lg:justify-between  w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[30%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
          {
            courses.map((element,index)=>{
              return(
                <CourseCard
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
                />
              )
            })
          }
        </div>

    </div>
  )
}
