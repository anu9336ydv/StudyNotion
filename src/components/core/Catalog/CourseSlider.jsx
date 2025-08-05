import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation}  from 'swiper/modules'
import { SellCourseCard } from './SellCourseCard';
import { Pagination } from 'swiper/modules';


export const CourseSlider = ({Courses}) => {
  return (
    <>
        {
          Courses.length? (
            <Swiper
            spaceBetween={50} slidesPerView={1}
            className="max-h-[30rem] mySwiper"
            navigation={true} 
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            modules={[Navigation,Pagination,Autoplay]}
            loop={true}
            breakpoints={{
              1024:{slidesPerView:3}
            }}
            >
              {
                Courses.map((course,index)=>(
                  <SwiperSlide key={index}>

                    <SellCourseCard course={course} height={'h-[250px]'}/>

                  </SwiperSlide>
                ))
              }
                
            </Swiper>
          ):(
            <p> No course Found</p>
          )
        }

    </>
  )
}
