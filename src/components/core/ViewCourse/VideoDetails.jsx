import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operation/CourseApi';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"
import { IconButton } from '../../common/IconButton';

export const VideoDetails = () => {

    const{courseId,sectionId,subSectionId} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const playerRef = useRef()
    const {token} = useSelector((state)=>state.auth)
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse)
    const[videoData,setVideoData]= useState([]);
    const[videoEnded,setVideoEnded]= useState(false)
    const[loading,setLoading]=useState(false)
    const location = useLocation()
    const [previewSource, setPreviewSource] = useState("")
   // console.log("courseSectionData",courseSectionData)

    useEffect(()=>{
        const setVideoSpecificDetails =()=>{
            //console.log("courseSectionDatain",courseSectionData)
            if(!courseSectionData.length)
                return;
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses")
                toast.error("No Data found relate to the course")
            }
            else{

                const filteredData = courseSectionData.filter(
                    (course)=>course._id===sectionId
                )
                const filterVideoData = filteredData?.[0].subSection.filter(
                    (data)=>data._id === subSectionId
                )
                setVideoData(filterVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail)
                setVideoEnded(false)
            }

        }
        setVideoSpecificDetails()
    },[courseSectionData,courseEntireData,location.pathname])

    const isFirstVideo=()=>{
        const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSectionIndex===0 && currentSubSectionIndex===0){
            return true
        }
        else{
            return false
        }

    }

    const isLastVideo=()=>{
        const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId)

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )

        if(currentSectionIndex===courseSectionData.length -1  && currentSubSectionIndex === noOfSubSections-1){
            return true
        }
        else{
            return false
        }

    }

    const goToNextVideo = ()=>{
        const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId)

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSubSectionIndex !== noOfSubSections -1){
            //same section ki next video mai ja na hai 
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex +1]._id

            navigate( `/view-course/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`)
        }
        else{
            //diff section ki 1st video
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
             const nextSubSectionId =
             courseSectionData[currentSectionIndex + 1].subSection[0]._id
            navigate(
            `/view-course/${courseId}/section/${nextSectionId}/subsection/${nextSubSectionId}`
            ) 
        }

    }

    const goToPrevVideo = ()=>{

        const currentSectionIndex = courseSectionData.findIndex((data)=>data._id === sectionId)

        
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data)=>data._id===subSectionId
        )
        if(currentSubSectionIndex !==0 ){
            //same section ki prev video mai ja na hai 
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex -1]._id

            navigate( `/view-course/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`)
        }
        else{
            //diff section ki last video
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
            const prevSubSectionLength = courseSectionData[currentSectionIndex -1].subSection.length;
             const prevSubSectionId =
             courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength-1]._id
            navigate(
            `/view-course/${courseId}/section/${prevSectionId}/subsection/${prevSubSectionId}`
            ) 
        }

    }
    const handleLectureCompletion = async()=>{

        setLoading(true);
        const res = await markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token)
        ///state update
        if(res){
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
  }


 
    
  return (
    <div className="flex flex-col gap-5 text-white">
        {
            !videoData? (<img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />):(
                <Player
                ref={playerRef}
                aspectRatio="16:9"
                playsInline
                onEnded={() => setVideoEnded(true)}
                 src={videoData?.videoUrl}>
                     
                     <BigPlayButton position='center'/>
                     {
                        videoEnded &&(
                            <div
                            style={{
                                backgroundImage:
                                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                              }}
                              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                              >
                                {
                                    !completedLectures.includes(subSectionId)&&(
                                        <IconButton
                                        disable={loading}
                                        onClick={()=>handleLectureCompletion()}
                                        text={!loading ?"Mark as Completed":"Loading..."}
                                        customClasses="text-xl max-w-max px-4 mx-auto"/>
                                    )


                                }
                                <IconButton
                                disable={loading}
                                onClick={()=>{
                                    if(playerRef?.current){
                                        playerRef?.current?.seek(0);
                                        setVideoEnded(false)
                                    }
                                }}
                                
                                text={'Rewatch'}
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"/>
                                <div className="mt-10 flex min-w-[250px] justify-around  text-xl">
                                    {
                                        !isFirstVideo()&&(
                                            <button
                                            disabled={loading}
                                            onClick={goToPrevVideo}
                                            className='blackButton'
                                            >
                                                Prev
                                            </button>
                                        )
                                    }
                                    {
                                        !isLastVideo()&&(
                                            <button
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            className='blackButton'
                                            >
                                                Next
                                            </button>

                                        )
                                    }
                                </div>

                            </div>
                        )
                     }


                </Player>
                
            )
        }

        <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
        <p className="pt-2 pb-6">{videoData?.description}</p>

    </div>
  )
}
