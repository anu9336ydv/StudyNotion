import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import { CTAButton } from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks'
import { TimelineSection } from '../components/core/HomePage/TimelineSection'
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection'
import { InstructorSection } from '../components/core/HomePage/InstructorSection'
import { ExploreMore } from '../components/core/HomePage/ExploreMore'
import { Footer } from '../components/common/Footer'
import { ReviewSlider } from '../components/common/ReviewSlider'


export const Home = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-center'>
            <Link to={"/signup"}>
            <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit hover:drop-shadow-none">
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
            </Link>
            <div className="font-semibold text-3xl md:text-4xl mt-12">
            Empower Your Future with 
            <HighlightText text={"Coding Skills"}/>
            
            </div>
            <div className=' mt-4 w-[100%] md:w-[60%] text-start md:text-center font-medium text-richblack-300 '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className=' flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"} >
                    Learn More
                </CTAButton>
                
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>
            {/* video  add eliptical gradient */}
            <div className=' mx-3 my-14  shadow-[10px_-5px_50px_-10px] shadow-blue-200  w-[90%] md:w-[70%] '>
                <video className='shadow-white md:shadow-[20px_20px_0_0] shadow-[10px_10px_0_0]'
                muted 
                loop
                autoPlay>
                        <source src={Banner} type='video/mp4'/>
                </video>
            </div>
            {/* code section 1 */}
            <div className=' md:w-[80%]'>
                <CodeBlocks 
                    position={"flex-col lg:flex-row"}
                    heading={
                        <div className=' text-3xl md:text-4xl font-semibold'>
                            Unlock Your <HighlightText text={"coding potential "}/>
                             with our online course
                        </div>
                   
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                    }
                    ctabtn1={{
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active:true,    
                    }}
                    ctabtn2={{
                        btnText:"Learn More",
                        linkto:"/login",
                        active:false,    
                }}

                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codeColor={"text-yellow-25"}
                backgroundGradient={<div className="codeblock1 absolute"></div>}

                />
            </div>

            {/* code section 2 */}
            <div className='lg:w-[80%]'>
                <CodeBlocks 
                    position={"flex-col lg:flex-row-reverse"}
                    heading={
                        <div className='w-[60%] text-3xl lg:text-4xl font-semibold lg:w-[70%]'>
                            Start <HighlightText text={"coding in seconds \n "}/>
                            
                             
                        </div>
                   
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={{
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true,    
                    }}
                    ctabtn2={{
                        btnText:"Learn More",
                        linkto:"/login",
                        active:false,    
                }}

                codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n \nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                codeColor={"text-white"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}

                />
            </div>

            <ExploreMore/>

        </div>

        {/* sectionn 2 */}

        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepagebg h-[333px]'>
                 <div className='  w-11/12 h-full max-w-maxContent flex flex-col items-center  justify-center gap-8 mx-auto'>
                    <div className=' flex flex-row text-white gap-3 lg:gap-7 lg:mt-8'>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className=' flex items-center gap-2'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                          
                        </CTAButton>
                        <CTAButton active={false} linkto={'./signup'}>
                        Learn More

                        </CTAButton>

                    </div>
                 </div>
            </div> 
            
            <div className=' mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
                <div className='  flex flex-col md:flex-row md:gap-20 gap-6 mb-10 mt-24'>
                    <div className='text-3xl lg:text-4xl font-semibold md:w-[45%]'>
                    Get the skills you need for a 
                    <HighlightText text={'job that is in demand.'}/>
                    </div>

                    <div className='flex flex-col gap-10 md:w-[40%] items-start '>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills
                        </div>
                        <CTAButton active={true} linkto={'./signup'}>
                        <div className=' flex items-center'>
                            Learn More
                        </div>
                           
                        </CTAButton>
                    </div>
                </div>

                <TimelineSection/>
                <LearningLanguageSection/>
                 

            </div>
        </div>

        {/* section 3 */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">

                <InstructorSection/>

                
            
        </div>
        <div className='w-11/12 mx-auto'>
        <h2 className='lg:text-center text-3xl lg:text-4xl font-semibold mt-10 text-richblack-50'>Reviews From Other Learner</h2>

            {/* Reviewslider */}
            <ReviewSlider/>


        </div>
        
        {/* footer */}
        <Footer/>

    </div>
  )
}

