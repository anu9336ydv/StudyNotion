import React from 'react'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import { Quote } from '../components/core/AboutPage/Quote'
import Founding from '../assets/Images/FoundingStory.png'
import { StatsComponent } from '../components/core/AboutPage/StatsComponent'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { ContactFormSection } from '../components/core/AboutPage/ContactFormSection'
import { Footer } from '../components/common/Footer'
import { ReviewSlider } from '../components/common/ReviewSlider'
export const AboutPage = () => {
  return (
    <div className='relative pt-[100px]   text-white bg-richblack-700 '>
        {/* section1 */}
        <section className='flex flex-col items-center'>
            <div className=' mx-auto relative  flex flex-col items-center justify-center gap-7 '>
                <p className='text-sm text-richblack-100'>About us</p>
                <h1 className='text-white text-4xl lg:w-[50%] text-center'>
                    Driving Innovation in Online Eduction for a 
                    <HighlightText text={'Brighter Fututre'}/>
                </h1>
                <p className='w-[53%] text-center text-base text-richblack-200'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
                <div className="sm:h-[70px] xl:h-[250px]"></div>
                <div className='xl:absolute xl:bottom-0 xl:left-[50%] flex flex-wrap flex-row  justify-evenly w-[100%] xl:translate-x-[-50%] xl:translate-y-[30%] gap-3 mb-9 lg:gap-5
                '
                
                >
                    <img src={BannerImage1} alt="" className='hidden md:block'/>
                    <img src={BannerImage2} alt=""   />
                    <img src={BannerImage3} alt=""  className='hidden md:block'  />
                </div>

            </div>
        </section>
        {/* section2 */}
        <section className='bg-richblack-900  mx-auto w-[]'>
            <div className='bg-richblack-900 '>
                <Quote/>
            </div>
        </section >

        {/* section3 */}
        <section className='bg-richblack-900 pb-20 '>
            <div className='flex flex-col gap-10 mx-auto w-[80%] '>
                {/* Founding story */}
                <div  className='flex flex-col xl:flex-row gap-10'>
                    <div className='flex flex-col mx-auto xl:mx-0 xl:w-[40%] '>
                        <h1 className='font-bold  bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent z-[1000] bg-clip-text lg:text-4xl  text-3xl  '> Our Founding Story</h1>
                        <div className='mt-4 text-base font-medium text-richblack-300'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </div>
                        <div className='mt-4 text-base font-medium text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</div>
                    </div>

                    <div className=' xl:ml-32'>
                        <img src={Founding} alt="" />
                    </div>
                </div>
                {/* vision mission */}
                <div className=' flex flex-col lg:flex-row gap-9 '>
                        <div className='flex mx-auto flex-col  mr-9'>
                            <h1 className='font-bold  bg-gradient-to-b from-[#E65C00]  to-[#F9D423] text-transparent z-[1000] bg-clip-text lg:text-4xl  text-3xl '>Our Vision</h1>
                            <div className='mt-4 text-base font-medium text-richblack-300' >With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.

                            </div>
                        </div>

                        <div className=''>
                            <h1 className='font-bold  bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent z-[1000] bg-clip-text lg:text-4xl  text-3xl  '>
                                Our Mission
                            </h1>
                            <div className='mt-4 text-base font-medium text-richblack-300'>
                            our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </div>
                        </div>
                    </div>
            </div>
        </section>

        {/* section4 */}
        <StatsComponent  />

        {/* section5 */}
        <LearningGrid/>

        {/* section6 */}
        <ContactFormSection/>

        {/* section7 */}
        <div className='w-full mx-auto py-20 px-10 bg-richblack-900'>
        <h2 className='lg:text-center text-3xl lg:text-4xl font-semibold mt-10 text-richblack-50'>Reviews From Other Learner</h2>

            {/* Reviewslider */}
            <ReviewSlider/>


        </div>

        {/* section 8 */}
        <Footer/>
        

    </div>
  )
}
