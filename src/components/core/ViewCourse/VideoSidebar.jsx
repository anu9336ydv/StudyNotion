import React, { useEffect, useState } from 'react'
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '../../common/IconButton';
import { IoIosArrowDown } from 'react-icons/io';


export const VideoSidebar = ({setReviewModal,open}) => {
    const[activeStatus,setActiveStatus] = useState("")
    const[videobarActive, SetVideobarActive] = useState("");
    const navigate = useNavigate()
    const { sectionId,subSectionId}  = useParams()
    const location = useLocation()
    

    const{
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures,
      } = useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        ;(
             ()=>{
                if(!courseSectionData.length){
                    return
                }
                const currentSectionIndex = courseSectionData.findIndex(
                    (data)=> data._id === sectionId
                )
                const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id===subSectionId)
                const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

                setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
                SetVideobarActive(activeSubSectionId)



             }
    )()

    },[courseSectionData,courseEntireData,location.pathname])
    
  return (
    <div>
        
        {
            open &&(
                <div className=" absolute z-[1000] flex h-[calc(100vh-3.5rem)] w-[280px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
                {/* button / heading */}
                   <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                       {/* button */}
                       <div className="flex w-full items-center justify-between ">
                           <div
                             onClick={()=>{navigate('/dashboard/enrolled-courses')}}
                             className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                                title="back">
                               <RiArrowGoBackFill size={30} />
                           </div>
       
                           <div>
                               <IconButton text={"Add Review"}
                               customClasses="ml-auto py-2 px-5"
                               onClick={()=>setReviewModal(true)}/>
                           </div>
       
                       </div>
                       {/* heading */}
                       <div className="flex flex-col">
                           <p>{courseEntireData.courseName}</p>
                           <p  className="text-sm font-semibold text-richblack-500">{completedLectures.length}/{totalNoOfLectures}</p>
                       </div>
                   </div>
                   {/* for section and subsecction  */}
                   <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                           {
                               courseSectionData.map((section,index)=>(
                                   <div
                                    className="mt-2 cursor-pointer text-sm text-richblack-5"
                                   onClick={()=>setActiveStatus(section._id)}
                                   key={index}>
                                       {/* section */}
                                       <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                           <div className="font-semibold flex justify-between w-full">
                                               {
                                                   section.sectionName
                                               }
                                               
                                               <IoIosArrowDown  className={`${activeStatus === section._id ? " rotate-180":" rotate-0"} `}/>
                                           </div>
       
                                       </div>
       
                                       {/* subsection */}
                                       <div>
                                           {
                                               activeStatus=== section._id &&(
                                                   <div className="transition-[height] duration-500 ease-in-out">
                                                       {
                                                           section.subSection.map((topic,index)=>(
                                                               <div
                                                               className={`flex gap-3 px-5 py-2 ${videobarActive === topic._id ? "bg-yellow-200 font-semibold text-richblack-900" :" hover:bg-richblack-900 "}`}
                                                               key={index}
                                                               onClick={()=>{
                                                                   navigate(`/view-course/${courseEntireData._id}/section/${section._id}/subsection/${topic._id}`)
                                                                   SetVideobarActive(topic._id)
                                                               }}>
                                                                   <input
                                                                   type='checkBox'
                                                                   checked={completedLectures.includes(topic._id)}
                                                                   onChange={()=>{}} />
       
                                                                   <span>{topic.title}</span>
                                                               </div>
                                                           ))
                                                       }
                                                   </div>
                                               )
                                           }
                                       </div>
                                   
       
                                   </div>
                               ))
                           }
       
                   </div>
                  
       
               </div>

            )
        }
        

    </div>
  )
}
